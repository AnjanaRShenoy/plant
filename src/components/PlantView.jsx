import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlantDiagram from './PlantDiagram';
import PartDetails from './PartDetails';
import plantsData from '../data/plants.json';

function PlantView() {
  const navigate = useNavigate();
  const [plants] = useState(plantsData);
  const [selectedPlant] = useState(plants.find((p) => p.id === 'maize') || plants[0]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [highlightedPartId, setHighlightedPartId] = useState(null);

  useEffect(() => {
    // Reset selected part when component mounts
    setSelectedPart(null);
    setHighlightedPartId(null);
  }, []);

  const handlePartClick = (part) => {
    // Check if this is a maize plant part with gene information
    if (part.hasGeneInfo && selectedPlant?.id === 'maize') {
      // Navigate to gene info page
      navigate('/maize/genes', { state: { trait: part.geneTrait } });
    } else {
      // Show regular part details modal
      setSelectedPart(part);
      setHighlightedPartId(part.elementId || part.id);
    }
  };

  const handleCloseDetails = () => {
    setSelectedPart(null);
    setHighlightedPartId(null);
  };

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">Maize Plant Anatomy</h1>
          <p className="app-subtitle">Click on Tassel, Leaf Angle, or Stem Height to learn about controlling genes!</p>
        </header>

        {selectedPlant && (
          <PlantDiagram
            key={selectedPlant.id}
            plant={selectedPlant}
            onPartClick={handlePartClick}
            highlightedPartId={highlightedPartId}
          />
        )}

        {selectedPart && (
          <PartDetails part={selectedPart} onClose={handleCloseDetails} />
        )}
      </div>
    </div>
  );
}

export default PlantView;
