import React from 'react';
import './PartDetails.css';

function PartDetails({ part, onClose }) {
  if (!part) return null;

  return (
    <div className="part-details-overlay" onClick={onClose}>
      <div className="part-details-modal" onClick={(e) => e.stopPropagation()}>
        <button className="part-details-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="part-details-content">
          <h2 className="part-details-title">{part.name}</h2>
          <div className="part-details-section">
            <h3 className="part-details-subtitle">Description</h3>
            <p className="part-details-text">{part.description}</p>
          </div>
          <div className="part-details-section">
            <h3 className="part-details-subtitle">Function</h3>
            <p className="part-details-text">{part.function}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartDetails;

