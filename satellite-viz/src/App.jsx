import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import GlobeScene from './components/GlobeScene';
import SatelliteInfoPanel from './components/SatelliteInfoPanel';
import { usePositions } from './hooks/usePositions';

function App() {
  const [selectedSatellite, setSelectedSatellite] = useState(null);
  const { satellites, loading, error, lastUpdated, isConnected } = usePositions();

  const handleSatelliteClick = (satellite) => {
    setSelectedSatellite(satellite);
  };

  const handleClosePanel = () => {
    setSelectedSatellite(null);
  };

  return (
    <div className="scanline" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      background: '#050510',
      color: '#e0e0ff',
      fontFamily: "'Rajdhani', sans-serif"
    }}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        minHeight: 0
      }}>
        {/* Globe */}
        <GlobeScene
          satellites={satellites}
          onSatelliteClick={handleSatelliteClick}
        />

        {/* Info Panel */}
        <SatelliteInfoPanel
          satellite={selectedSatellite}
          onClose={handleClosePanel}
        />
      </div>

      {/* Footer */}
      <Footer
        isConnected={isConnected}
        lastUpdated={lastUpdated}
        error={error}
      />
    </div>
  );
}

export default App;
