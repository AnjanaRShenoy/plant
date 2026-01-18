import React from 'react';
import './PlantDiagram.css';

function PlantDiagram({ plant, onPartClick, highlightedPartId }) {
  if (!plant) {
    return <div className="plant-diagram-placeholder">No plant data available</div>;
  }

  // For maize plant, show main image with clickable buttons
  if (plant.id === 'maize') {
    const handlePartClick = (part) => {
      onPartClick(part);
    };

    return (
      <div className="plant-diagram-container" key={plant.id}>
        <h2 className="plant-content-title">Maize Plant Architecture</h2>
        <div className="plant-diagram-wrapper">
          <div className="plant-image-container">
            <img
              src={plant.image}
              alt={plant.name}
              className="plant-image"
              key={`img-${plant.id}`}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="600"%3E%3Crect width="400" height="600" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EPlant Image%3C/text%3E%3C/svg%3E';
              }}
            />
            {plant.parts.map((part) => (
              <div
                key={`overlay-${plant.id}-${part.id || part.elementId}`}
                id={`${plant.id}-${part.elementId || part.id}`}
                className={`plant-part-overlay ${highlightedPartId === (part.elementId || part.id) ? 'part-highlighted' : ''}`}
                style={{
                  top: part.coords.top,
                  left: part.coords.left,
                  width: part.coords.width,
                  height: part.coords.height,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePartClick(part);
                }}
                title={part.name}
              />
            ))}
          </div>
        </div>
        <div className="plant-image-selector">
          {plant.parts.map((part) => (
            <button
              key={`btn-${part.id || part.elementId}`}
              className={`image-selector-btn ${highlightedPartId === (part.elementId || part.id) ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handlePartClick(part);
              }}
              title={part.name}
            >
              {part.name}
            </button>
          ))}
        </div>
        <p className="plant-diagram-hint">Click on Tassel, Leaf Angle, or Plant Height to learn about controlling genes!</p>
      </div>
    );
  }

  // Fallback for other plants (if any) using image
  const handlePartClick = (part) => {
    onPartClick(part);
  };

  return (
    <div className="plant-diagram-container" key={plant.id}>
      <div className="plant-diagram-wrapper">
        <div className="plant-image-container">
          <img
            src={plant.image}
            alt={plant.name}
            className="plant-image"
            key={`img-${plant.id}`}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="600"%3E%3Crect width="400" height="600" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EPlant Image%3C/text%3E%3C/svg%3E';
            }}
          />
          {plant.parts.map((part) => (
            <div
              key={`${plant.id}-${part.id || part.elementId}`}
              id={`${plant.id}-${part.elementId || part.id}`}
              className={`plant-part-overlay ${highlightedPartId === (part.elementId || part.id) ? 'part-highlighted' : ''}`}
              style={{
                top: part.coords.top,
                left: part.coords.left,
                width: part.coords.width,
                height: part.coords.height,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handlePartClick(part);
              }}
              title={part.name}
            />
          ))}
        </div>
      </div>
      <p className="plant-diagram-hint">Click on any part of the plant to learn more!</p>
    </div>
  );
}

export default PlantDiagram;
