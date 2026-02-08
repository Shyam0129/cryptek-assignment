import React from 'react';

const Footer = ({ isConnected, lastUpdated, error }) => {
    const formatTime = (date) => {
        if (!date) return '---';
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return (
        <footer style={{
            background: '#050510',
            borderTop: '1px solid rgba(0, 243, 255, 0.2)',
            padding: '0 24px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#8892b0',
            fontFamily: "'Share Tech Mono', monospace",
            textTransform: 'uppercase',
            letterSpacing: '1px',
            flexShrink: 0
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: isConnected ? '#00ff88' : '#ff003c' }}>
                        ●
                    </span>
                    <span>Gateway: {isConnected ? 'CONNECTED' : 'OFFLINE'}</span>
                </div>

                {lastUpdated && (
                    <div>
                        SYNC: <span style={{ color: '#00f3ff' }}>{formatTime(lastUpdated)}</span>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {error ? (
                    <div style={{ color: '#ff003c', animation: 'blink 1s infinite' }}>
                        ⚠ WARNING: API ERROR
                    </div>
                ) : (
                    <div>
                        Latency: <span style={{ color: '#00f3ff' }}>24ms</span>
                    </div>
                )}
                <div style={{ opacity: 0.5 }}>
                    CRYPTIK_API_V1
                </div>
            </div>

            <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0 }
        }
      `}</style>
        </footer>
    );
};

export default Footer;
