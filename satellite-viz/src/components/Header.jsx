import React, { useState, useEffect } from 'react';

const Header = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header style={{
            background: 'rgba(5, 5, 16, 0.9)',
            borderBottom: '1px solid rgba(0, 243, 255, 0.3)',
            padding: '0 24px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
        }}>
            {/* Brand / Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #00f3ff 0%, #0066ff 100%)',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: '#000',
                    fontSize: '18px'
                }}>
                    C
                </div>
                <div>
                    <h1 style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        color: '#fff',
                        textShadow: '0 0 10px rgba(0, 243, 255, 0.5)',
                        margin: 0,
                        lineHeight: 1
                    }}>
                        CRYPTIK<span style={{ color: '#00f3ff' }}>.SAT</span>
                    </h1>
                    <div style={{
                        fontSize: '10px',
                        color: '#00f3ff',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        opacity: 0.8
                    }}>
                        Orbital Tracking System v1.0
                    </div>
                </div>
            </div>

            {/* System Status Indicators */}
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <div style={{ textAlign: 'right', borderRight: '1px solid rgba(255, 255, 255, 0.1)', paddingRight: '24px' }}>
                    <div style={{ fontSize: '10px', color: '#8892b0', textTransform: 'uppercase' }}>System Time</div>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", color: '#00f3ff', fontSize: '16px' }}>
                        {time.toLocaleTimeString()}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <div style={{ fontSize: '10px', color: '#8892b0', textTransform: 'uppercase' }}>STATUS</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '8px', height: '8px', background: '#00ff88', borderRadius: '50%', boxShadow: '0 0 8px #00ff88' }}></div>
                        <span style={{ color: '#00ff88', fontSize: '14px', fontWeight: '600' }}>ONLINE</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
