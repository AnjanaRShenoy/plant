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

  // Helper function to italicize gene symbols in text
  const italicizeGeneSymbols = (text, geneSymbol) => {
    if (!text || !geneSymbol) return text;
    
    // Escape special regex characters in the gene symbol
    const escapedSymbol = geneSymbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Create regex patterns to match the gene symbol in various forms
    // Match exact symbol, lowercase, and uppercase versions with word boundaries
    const patterns = [
      new RegExp(`\\b${escapedSymbol}\\b`, 'g'),
      new RegExp(`\\b${escapedSymbol.toLowerCase()}\\b`, 'g'),
      new RegExp(`\\b${escapedSymbol.toUpperCase()}\\b`, 'g'),
    ];
    
    let result = text;
    patterns.forEach(pattern => {
      result = result.replace(pattern, (match) => {
        // Check if already inside HTML tags (avoid double-wrapping)
        if (result.indexOf(`<em>${match}</em>`) !== -1) {
          return match;
        }
        return `<em>${match}</em>`;
      });
    });
    
    return result;
  };

  // Helper to render text with italicized gene symbols
  const renderTextWithGenes = (text, allGeneSymbols) => {
    if (!text) return text;
    
    let result = String(text);
    // Sort by length (longest first) to avoid partial matches
    const sortedSymbols = [...allGeneSymbols].sort((a, b) => b.length - a.length);
    
    // Italicize all gene symbols in the current trait
    sortedSymbols.forEach(symbol => {
      result = italicizeGeneSymbols(result, symbol);
    });
    
    // Return as JSX with dangerouslySetInnerHTML (safe here as we control the content)
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

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
  
  // Get all gene symbols for the current trait to italicize them in text
  const allGeneSymbols = currentTraitData?.genes?.map(gene => gene.symbol) || [];

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
                    <div className="gene-name-section">
                      <h4 className="gene-name">{gene.name}</h4>
                      <span className="gene-symbol"><em>{gene.symbol}</em></span>
                      {gene.maizeGDBId && (
                        <a 
                          href={`https://www.maizegdb.org/gene_center/gene/${gene.maizeGDBId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="maizegdb-link"
                          title="View in MaizeGDB"
                        >
                          MaizeGDB: <em>{gene.symbol}</em> (B73 v5: {gene.maizeGDBId})
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="gene-details">
                    <div className="gene-detail-section">
                      <h5 className="gene-detail-label">Function</h5>
                      <p className="gene-detail-text">{renderTextWithGenes(gene.function, allGeneSymbols)}</p>
                    </div>
                    
                    <div className="gene-detail-section">
                      <h5 className="gene-detail-label">Biological Pathway</h5>
                      <p className="gene-detail-text">{gene.pathway}</p>
                    </div>

                    {gene.mutations && gene.mutations.length > 0 && (
                      <div className="gene-detail-section">
                        <h5 className="gene-detail-label">Major Mutations Identified</h5>
                        <ul className="mutations-list">
                          {gene.mutations.map((mutation, mutIndex) => (
                            <li key={mutIndex} className="mutation-item">
                              {renderTextWithGenes(mutation, allGeneSymbols)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="gene-detail-section">
                      <h5 className="gene-detail-label">Research Findings</h5>
                      <p className="gene-detail-text">{renderTextWithGenes(gene.research, allGeneSymbols)}</p>
                    </div>

                    {gene.references && gene.references.length > 0 && (
                      <div className="gene-detail-section">
                        <h5 className="gene-detail-label">References</h5>
                        <ul className="references-list">
                          {gene.references.map((ref, refIndex) => (
                            <li key={refIndex} className="reference-item">
                              <a 
                                href={ref.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="reference-link"
                              >
                                {ref.text}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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

