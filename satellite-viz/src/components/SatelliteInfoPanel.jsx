import React, { useState, useEffect } from 'react';

const SatelliteInfoPanel = ({ satellite, onClose }) => {
    const [pulse, setPulse] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setPulse(p => !p), 1000);
        return () => clearInterval(interval);
    }, []);

    const panelStyle = {
        width: '350px',
        minWidth: '350px',
        background: 'rgba(5, 5, 16, 0.85)',
        borderLeft: '1px solid rgba(0, 243, 255, 0.3)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        zIndex: 100
    };

    if (!satellite) {
        return (
            <div style={{ ...panelStyle, alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', color: 'rgba(0, 243, 255, 0.3)', padding: '24px' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        margin: '0 auto 16px',
                        border: '2px dashed rgba(0, 243, 255, 0.3)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            background: '#00f3ff',
                            borderRadius: '50%',
                            animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                        }}></div>
                    </div>
                    <p style={{ fontSize: '16px', fontWeight: '600', letterSpacing: '1px', color: '#00f3ff' }}>NO SIGNAL LOCKED</p>
                    <p style={{ fontSize: '12px', marginTop: '8px', fontFamily: "'Share Tech Mono', monospace" }}>AWAITING TARGET SELECTION...</p>

                    <style>{`
            @keyframes ping {
              75%, 100% {
                transform: scale(2);
                opacity: 0;
              }
            }
          `}</style>
                </div>
            </div>
        );
    }

    const getRiskColor = (risk) => {
        const r = (risk || '').toLowerCase();
        if (r.includes('nominal')) return '#00ff88'; // Safe/Green
        if (r.includes('low')) return '#00ff88';
        if (r.includes('medium')) return '#ffae00'; // Warning/Amber
        if (r.includes('high')) return '#ff003c'; // Danger/Red
        return '#00f3ff'; // Default Cyan
    };

    const riskColor = getRiskColor(satellite.risk);

    const sectionHeaderStyle = {
        fontSize: '10px',
        color: '#00f3ff',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        marginBottom: '8px',
        fontWeight: '700',
        borderBottom: '1px solid rgba(0, 243, 255, 0.2)',
        paddingBottom: '4px',
        display: 'flex',
        justifyContent: 'space-between'
    };

    const dataRowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '4px',
        fontSize: '13px',
        fontFamily: "'Share Tech Mono', monospace"
    };

    return (
        <div style={panelStyle}>
            {/* HUD Header */}
            <div style={{
                background: 'linear-gradient(to right, rgba(0, 243, 255, 0.1), transparent)',
                padding: '16px',
                borderBottom: '1px solid rgba(0, 243, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0
            }}>
                <div>
                    <div style={{ fontSize: '10px', color: '#00f3ff', letterSpacing: '1px' }}>TARGET LOCKED</div>
                    <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', margin: '4px 0 0 0', textShadow: '0 0 8px rgba(0, 243, 255, 0.5)' }}>
                        {satellite.name}
                    </h2>
                </div>
                <button
                    onClick={onClose}
                    style={{
                        background: 'transparent',
                        border: '1px solid rgba(255, 0, 60, 0.5)',
                        color: '#ff003c',
                        cursor: 'pointer',
                        padding: '6px 10px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                        transition: 'all 0.2s ease',
                        textTransform: 'uppercase'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 0, 60, 0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                    Close
                </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>

                {/* Risk Status Widget */}
                <div style={{
                    background: `linear-gradient(90deg, ${riskColor}22 0%, transparent 100%)`,
                    borderLeft: `3px solid ${riskColor}`,
                    padding: '12px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <div style={{ fontSize: '10px', color: '#8892b0', textTransform: 'uppercase' }}>THREAT LEVEL</div>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: riskColor, textTransform: 'uppercase' }}>
                            {satellite.risk || 'UNKNOWN'}
                        </div>
                    </div>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        border: `2px solid ${riskColor}`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px'
                    }}>
                        {satellite.risk === 'nominal' ? '✓' : '!'}
                    </div>
                </div>

                {/* Telemetry Data Grid */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={sectionHeaderStyle}>
                        <span>Orbital Telemetry</span>
                        <span>LIVE</span>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '8px',
                        marginTop: '12px'
                    }}>
                        {/* Coordinates Box */}
                        <div style={{ gridColumn: '1 / -1', background: 'rgba(0,0,0,0.3)', padding: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ fontSize: '10px', color: '#8892b0', marginBottom: '8px' }}>ECEF COORDINATES (KM)</div>
                            <div style={dataRowStyle}>
                                <span style={{ color: '#00f3ff' }}>X:</span>
                                <span style={{ color: '#fff' }}>{satellite.x ? satellite.x.toFixed(2) : '---'}</span>
                            </div>
                            <div style={dataRowStyle}>
                                <span style={{ color: '#00f3ff' }}>Y:</span>
                                <span style={{ color: '#fff' }}>{satellite.y ? satellite.y.toFixed(2) : '---'}</span>
                            </div>
                            <div style={dataRowStyle}>
                                <span style={{ color: '#00f3ff' }}>Z:</span>
                                <span style={{ color: '#fff' }}>{satellite.z ? satellite.z.toFixed(2) : '---'}</span>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ fontSize: '10px', color: '#8892b0', marginBottom: '4px' }}>LATITUDE</div>
                            <div style={{ fontFamily: "'Share Tech Mono', monospace", color: '#fff', fontSize: '14px' }}>
                                {satellite.lat.toFixed(4)}°
                            </div>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ fontSize: '10px', color: '#8892b0', marginBottom: '4px' }}>LONGITUDE</div>
                            <div style={{ fontFamily: "'Share Tech Mono', monospace", color: '#fff', fontSize: '14px' }}>
                                {satellite.lon.toFixed(4)}°
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div style={{ marginBottom: '24px' }}>
                    <div style={sectionHeaderStyle}>
                        <span>Spacecraft Identity</span>
                        <span>ID Check: PASS</span>
                    </div>
                    <div style={{ marginTop: '12px' }}>
                        <div style={dataRowStyle}>
                            <span style={{ color: '#8892b0' }}>DESIGNATION:</span>
                            <span style={{ color: '#fff' }}>{satellite.name}</span>
                        </div>
                        <div style={dataRowStyle}>
                            <span style={{ color: '#8892b0' }}>NORAD ID:</span>
                            <span style={{ color: '#00f3ff' }}>#{satellite.norad_id}</span>
                        </div>
                        <div style={dataRowStyle}>
                            <span style={{ color: '#8892b0' }}>ALTITUDE:</span>
                            <span style={{ color: '#ffae00' }}>{satellite.alt.toFixed(2)} km</span>
                        </div>
                        <div style={dataRowStyle}>
                            <span style={{ color: '#8892b0' }}>EPOCH:</span>
                            <span style={{ color: '#fff', fontSize: '10px' }}>{satellite.epoch}</span>
                        </div>
                    </div>
                </div>

                {/* Decorator Lines */}
                <div style={{
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, rgba(0, 243, 255, 0.5), transparent)',
                    marginTop: 'auto'
                }}></div>
                <div style={{
                    fontSize: '9px',
                    color: '#444',
                    textAlign: 'center',
                    marginTop: '8px',
                    fontFamily: "'Share Tech Mono', monospace",
                    letterSpacing: '2px'
                }}>
            // END TRANSMISSION //
                </div>
            </div>
        </div>
    );
};

export default SatelliteInfoPanel;
