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
          <h1 className="app-title">Breeding for Plant Architectural Traits in Maize</h1>
          <p className="app-address">Maize Genetics Unit, Division of Genetics, ICAR - Indian Agricultural Research Institute, New Delhi - 110012</p>
        </header>
        <div className="header-divider"></div>

        <section className="intro-section">
          <h2 className="intro-title">Enhancing Maize Productivity in India: Breeding for Ideal Plant Architecture and High Plant Density</h2>
          <p className="intro-text">
            Maize (Zea mays L.) is a cornerstone of global agri-food systems, indispensable for food, feed, and industrial applications. Despite its critical role, global production is heavily skewed. While the Americas achieve exceptional productivity (e.g., USA: 11,130 kg ha⁻¹) through high-input systems and advanced breeding, the Global South lags significantly. India, the world's fifth-largest producer, faces a severe productivity gap, with yields stagnating around 3,518 kg ha⁻¹—nearly 40% below the global average. This inefficiency has transformed India from a net exporter to a net importer by 2024-25, driven by surging demands from the poultry feed sector and the national E20 bioethanol blending policy.
            <br /><br />
            The primary constraint in tropical and subtropical maize systems, unlike their temperate counterparts, is the lack of adaptation to High Plant Density (HPD). Temperate maize success is built on decades of "ideotype breeding"—selecting for an Ideal Plant Architecture (IPA) characterized by upright leaves (narrow leaf angle), smaller tassels, and synchronized flowering (reduced anthesis-silking interval). These traits minimize shading, optimize light interception, and prevent lodging, allowing plant populations to soar from historical lows of 30,000 to over 100,000 plants ha⁻¹.
            <br /><br />
            In contrast, Indian hybrids remain tall with wide, drooping leaves, making them unsuitable for crowding. To secure future food and energy security, Indian breeding programs must pivot towards developing "smart-canopy" hybrids. Prioritizing architectural traits—specifically semi-dwarf stature, erect leaf orientation, and compact tassels—will allow for significantly higher planting densities without yield penalty. Bridging this "architectural gap" is not merely an agronomic refinement but a strategic necessity to double productivity, reduce land pressure, and restore India's self-sufficiency in maize. Here we discuss about the major plant architectural traits for HPD adaptation and the genes regulating these traits, enabling understanding about the molecular breeding targets for IPA.
          </p>
        </section>

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

        <footer className="app-footer">
          <p className="app-authorship">
            Developed by Govinda Rai Sarma, Rashmi Chhabra, Amitkumar D. Kyada, Amit Kumar, Gaurav Sharma, Rajkumar U. Zunjare, Vignesh Muthusamy and Firoz Hossain*.<div> *Corresponding Author: fh_gpb@yahoo.com.</div><div>Part of PhD Research programme.</div><div> © ICAR - Indian Agricultural Research Institute, New Delhi.</div>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default PlantView;
