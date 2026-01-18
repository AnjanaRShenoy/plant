import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import maizeGenesData from '../data/maizeGenes.json';
import './GeneInfoPage.css';

function GeneInfoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the trait from location state or default to first trait
  const initialTrait = location.state?.trait || 'leafAngle';
  const [activeTrait, setActiveTrait] = useState(initialTrait);

  const traits = ['leafAngle', 'stemHeight', 'tassel'];
  const traitLabels = {
    tassel: 'Tassel Morphology',
    leafAngle: 'Leaf Angle',
    stemHeight: 'Plant Height'
  };

  const traitImages = {
    tassel: '/images/tassel.jpg',
    leafAngle: '/images/leafAngle.jpg',
    stemHeight: '/images/stemHeight.jpg'
  };

  const currentTraitData = maizeGenesData[activeTrait];

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="gene-info-page">
      <div className="gene-info-container">
        <header className="gene-info-header">
          <button className="back-button" onClick={handleBack}>
            ← Back to Plants
          </button>
          <h1 className="gene-info-title">Genes Regulating Major Plant Architectural Traits in Maize</h1>
          <p className="gene-info-subtitle">Genes controlling key agronomic traits in maize</p>
        </header>

        <div className="trait-tabs">
          {traits.map((trait) => (
            <button
              key={trait}
              className={`trait-tab ${activeTrait === trait ? 'active' : ''}`}
              onClick={() => setActiveTrait(trait)}
            >
              {traitLabels[trait]}
            </button>
          ))}
        </div>

        <div className="trait-content">
          <div className="trait-header">
            <div className="trait-image-container">
              <img
                src={traitImages[activeTrait]}
                alt={currentTraitData.trait}
                className="trait-image"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="600"%3E%3Crect width="400" height="600" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EPlant Image%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
            <h2 className="trait-name">{currentTraitData.trait}</h2>
            <p className="trait-description">{currentTraitData.description}</p>
          </div>

          <div className="genes-section">
            <h3 className="genes-section-title">
              Controlling Genes ({currentTraitData.genes.length})
            </h3>
            
            <div className="genes-list">
              {currentTraitData.genes.map((gene, index) => (
                <div key={index} className="gene-card">
                  <div className="gene-header">
                    <h4 className="gene-name">{gene.name}</h4>
                    <span className="gene-symbol">{gene.symbol}</span>
                  </div>
                  
                  <div className="gene-details">
                    <div className="gene-detail-section">
                      <h5 className="gene-detail-label">Function</h5>
                      <p className="gene-detail-text">{gene.function}</p>
                    </div>
                    
                    <div className="gene-detail-section">
                      <h5 className="gene-detail-label">Biological Pathway</h5>
                      <p className="gene-detail-text">{gene.pathway}</p>
                    </div>
                    
                    <div className="gene-detail-section">
                      <h5 className="gene-detail-label">Research Findings</h5>
                      <p className="gene-detail-text">{gene.research}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneInfoPage;

