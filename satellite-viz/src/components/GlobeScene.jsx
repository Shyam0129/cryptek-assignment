import React, { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';

const GlobeScene = ({ satellites, onSatelliteClick }) => {
    const globeRef = useRef(null);
    const globeContainerRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    // Initialize globe in a separate container that React doesn't manage
    useEffect(() => {
        if (globeRef.current) return; // Already initialized

        // Create a container for the globe that React won't touch
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.background = '#050510'; // Dark background

        if (globeContainerRef.current) {
            globeContainerRef.current.appendChild(container);
        }

        let animationId;

        const initGlobe = () => {
            const rect = globeContainerRef.current?.getBoundingClientRect();
            if (!rect || rect.width < 100 || rect.height < 100) {
                animationId = requestAnimationFrame(initGlobe);
                return;
            }

            console.log(`Creating globe with dimensions: ${rect.width}x${rect.height}`);

            try {
                const globe = Globe()(container);

                globe
                    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
                    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
                    .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
                    .width(rect.width)
                    .height(rect.height)
                    .atmosphereColor('#00aaff') // Cyan atmosphere
                    .atmosphereAltitude(0.25);

                const controls = globe.controls();
                controls.autoRotate = true;
                controls.autoRotateSpeed = 0.3;
                controls.enableZoom = true;

                globeRef.current = globe;
                setIsReady(true);
                console.log('Globe initialized!');
            } catch (err) {
                console.error('Globe error:', err);
            }
        };

        animationId = requestAnimationFrame(initGlobe);

        const handleResize = () => {
            if (globeRef.current && globeContainerRef.current) {
                const rect = globeContainerRef.current.getBoundingClientRect();
                globeRef.current.width(rect.width).height(rect.height);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            if (globeRef.current) {
                try { globeRef.current._destructor(); } catch (e) { }
                globeRef.current = null;
            }
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        };
    }, []);

    // Update satellites
    useEffect(() => {
        if (!globeRef.current || !satellites || satellites.length === 0) return;

        console.log(`Rendering ${satellites.length} satellites`);

        const getSatelliteColor = (name, risk) => {
            // Risk-based coloring (optional override)
            if (risk === 'high') return '#ff003c'; // Red

            const n = name.toLowerCase();
            if (n.includes('iss')) return '#00ff88'; // Neon Green
            if (n.includes('starlink')) return '#ffae00'; // Neon Amber
            if (n.includes('gps')) return '#00f3ff'; // Neon Cyan
            return '#ffffff'; // White default
        };

        const points = satellites.map(sat => ({
            lat: sat.lat,
            lng: sat.lon,
            alt: Math.max(0.01, sat.alt / 6371),
            size: 0.5, // Slightly larger for visibility
            color: getSatelliteColor(sat.name, sat.risk),
            label: sat.name,
            data: sat
        }));

        globeRef.current
            .pointsData(points)
            .pointAltitude('alt')
            .pointColor('color')
            .pointRadius('size')
            .pointLabel(d => `
        <div style="
          background: rgba(5, 5, 16, 0.9);
          color: #00f3ff;
          padding: 8px 12px;
          border-radius: 4px;
          font-family: 'Rajdhani', sans-serif;
          font-weight: bold;
          border: 1px solid rgba(0, 243, 255, 0.3);
          box-shadow: 0 0 10px rgba(0, 243, 255, 0.2);
        ">
          ${d.label}
          <div style="font-size: 10px; color: #8892b0; margin-top: 2px;">
            ALT: ${d.data.alt.toFixed(0)}km
          </div>
        </div>
      `)
            .onPointClick(point => {
                if (onSatelliteClick && point.data) {
                    onSatelliteClick(point.data);
                }
            });
    }, [satellites, onSatelliteClick]);

    return (
        <div style={{
            flex: 1,
            position: 'relative',
            minHeight: '400px',
            background: '#050510',
            overflow: 'hidden'
        }}>
            {/* Globe will be inserted here via DOM API */}
            <div ref={globeContainerRef} style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }} />

            {/* React-managed overlays - completely separate from globe container */}
            <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none', height: '100%' }}>

                {/* Satellite count HUD widget */}
                {isReady && satellites && satellites.length > 0 && (
                    <div style={{
                        position: 'absolute',
                        top: '24px',
                        left: '24px',
                        pointerEvents: 'auto',
                        background: 'rgba(5, 5, 16, 0.8)',
                        border: '1px solid rgba(0, 243, 255, 0.3)',
                        padding: '12px 20px',
                        clipPath: 'polygon(0 0, 100% 0, 100% 80%, 85% 100%, 0 100%)',
                    }}>
                        <div style={{ fontSize: '10px', color: '#00f3ff', letterSpacing: '2px', marginBottom: '4px' }}>ACTIVE TRACKING</div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', fontFamily: "'Share Tech Mono', monospace" }}>
                            {satellites.length} <span style={{ fontSize: '12px', color: '#8892b0' }}>UNITS</span>
                        </div>
                        {/* Animated bar */}
                        <div style={{
                            width: '100%',
                            height: '2px',
                            background: '#003366',
                            marginTop: '8px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '30%',
                                background: '#00f3ff',
                                animation: 'scan 2s linear infinite'
                            }}></div>
                        </div>
                        <style>{`@keyframes scan { 0% { left: -30%; } 100% { left: 100%; } }`}</style>
                    </div>
                )}

                {/* Legend */}
                {isReady && satellites && satellites.length > 0 && (
                    <div style={{
                        position: 'absolute',
                        bottom: '24px',
                        left: '24px',
                        background: 'rgba(5, 5, 16, 0.8)',
                        border: '1px solid rgba(0, 243, 255, 0.3)',
                        padding: '16px',
                        pointerEvents: 'auto',
                        backdropFilter: 'blur(4px)'
                    }}>
                        <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#8892b0', marginBottom: '12px', letterSpacing: '1px' }}>Identify Friend/Foe</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 5px #00ff88' }} />
                                <span style={{ fontSize: '12px', color: '#fff' }}>ISS (Manned)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffae00', boxShadow: '0 0 5px #ffae00' }} />
                                <span style={{ fontSize: '12px', color: '#fff' }}>Starlink Network</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00f3ff', boxShadow: '0 0 5px #00f3ff' }} />
                                <span style={{ fontSize: '12px', color: '#fff' }}>GPS Constellation</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff003c', boxShadow: '0 0 5px #ff003c' }} />
                                <span style={{ fontSize: '12px', color: '#fff' }}>High Risk / Debris</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading */}
                {!isReady && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(5, 5, 16, 0.95)',
                        zIndex: 50,
                        pointerEvents: 'auto'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                border: '2px solid rgba(0, 243, 255, 0.2)',
                                borderTop: '2px solid #00f3ff',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite',
                                margin: '0 auto 20px',
                                boxShadow: '0 0 15px rgba(0, 243, 255, 0.2)'
                            }} />
                            <div style={{ fontSize: '16px', color: '#fff', letterSpacing: '3px' }}>INITIALIZING SYSTEM</div>
                            <div style={{ fontSize: '12px', color: '#00f3ff', marginTop: '8px' }}>ESTABLISHING UPLINK...</div>
                            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GlobeScene;
