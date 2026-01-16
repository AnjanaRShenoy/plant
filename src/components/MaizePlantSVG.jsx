import React from 'react';

function MaizePlantSVG({ onPartClick, highlightedPartId }) {
  const handlePartClick = (partId, partName) => {
    // Find the part data
    const parts = {
      tassel: {
        id: 'tassel',
        name: 'Tassel',
        elementId: 'tassel',
        hasGeneInfo: true,
        geneTrait: 'tassel',
        description: 'The tassel is the male inflorescence of the maize plant, located at the top of the plant. It produces pollen for fertilization.',
        function: 'Male reproduction, pollen production'
      },
      leafAngle: {
        id: 'leafAngle',
        name: 'Leaf Angle',
        elementId: 'leafAngle',
        hasGeneInfo: true,
        geneTrait: 'leafAngle',
        description: 'Leaf angle refers to the angle at which leaves are attached to the stem. This trait affects light capture and canopy architecture.',
        function: 'Light capture optimization, canopy structure'
      },
      stemHeight: {
        id: 'stemHeight',
        name: 'Plant height',
        elementId: 'stemHeight',
        hasGeneInfo: true,
        geneTrait: 'stemHeight',
        description: 'Plant height is a critical agronomic trait that affects plant architecture, lodging resistance, and yield potential.',
        function: 'Structural support, resource allocation'
      }
    };
    
    if (parts[partId] && onPartClick) {
      onPartClick(parts[partId]);
    }
  };

  return (
    <svg
      viewBox="0 0 300 600"
      className="maize-plant-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Stem gradient */}
        <linearGradient id="stemGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1E7F3A" />
          <stop offset="50%" stopColor="#2E9E55" />
          <stop offset="100%" stopColor="#1E7F3A" />
        </linearGradient>
  
        {/* Leaf gradient */}
        <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="100%" stopColor="#2E7D32" />
        </linearGradient>
      </defs>
  
      {/* ================= ROOT SYSTEM ================= */}
      <g id="root" className="plant-part">
        <path
          d="
            M150 560
            C130 580, 120 600, 100 610
            M150 560
            C170 585, 185 600, 200 615
            M150 565
            C140 590, 135 610, 130 620
            M150 565
            C160 590, 165 610, 170 620
          "
          stroke="#6D4C41"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>
  
      {/* ================= STEM ================= */}
      <g
        id="stemHeight"
        className="plant-part clickable-part"
        onClick={() => handlePartClick("stemHeight", "Plant height")}
        style={{ cursor: "pointer" }}
      >
        <path
          d="
            M145 150
            C140 300, 140 450, 145 580
            L155 580
            C160 450, 160 300, 155 150
            Z
          "
          fill="url(#stemGrad)"
          stroke="#1B5E20"
          strokeWidth="2"
        />
      </g>
  
      {/* ================= LEAVES ================= */}
      <g
        id="leafAngle"
        className="plant-part clickable-part"
        onClick={() => handlePartClick("leafAngle", "Leaf Angle")}
        style={{ cursor: "pointer" }}
        fill="url(#leafGrad)"
        stroke="#1B5E20"
        strokeWidth="2"
      >
        {/* Left leaves */}
        <path d="M150 240 C80 260, 50 300, 40 340" />
        <path d="M150 320 C85 345, 55 390, 45 430" />
        <path d="M150 400 C95 430, 70 470, 65 510" />
  
        {/* Right leaves */}
        <path d="M150 270 C220 290, 255 330, 270 360" />
        <path d="M150 350 C225 380, 255 420, 265 460" />
        <path d="M150 430 C215 465, 235 500, 240 530" />
      </g>
  
      {/* ================= TASSEL ================= */}
      <g
        id="tassel"
        className="plant-part clickable-part"
        onClick={() => handlePartClick("tassel", "Tassel")}
        style={{ cursor: "pointer" }}
        stroke="#8D6E63"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        {/* Main stalk */}
        <line x1="150" y1="150" x2="150" y2="80" />
  
        {/* Branches */}
        <line x1="150" y1="95" x2="120" y2="60" />
        <line x1="150" y1="95" x2="180" y2="60" />
        <line x1="150" y1="110" x2="135" y2="65" />
        <line x1="150" y1="110" x2="165" y2="65" />
  
        {/* Spikelets */}
        <circle cx="120" cy="60" r="5" fill="#FBC02D" />
        <circle cx="180" cy="60" r="5" fill="#FBC02D" />
        <circle cx="135" cy="65" r="4" fill="#FDD835" />
        <circle cx="165" cy="65" r="4" fill="#FDD835" />
        <circle cx="150" cy="75" r="6" fill="#FBC02D" />
      </g>
  
      {/* ================= HIGHLIGHTS ================= */}
      {highlightedPartId === "tassel" && (
        <rect x="90" y="40" width="120" height="130" fill="rgba(255,215,0,0.18)" rx="6" />
      )}
  
      {highlightedPartId === "leafAngle" && (
        <rect x="30" y="220" width="240" height="330" fill="rgba(255,215,0,0.18)" rx="6" />
      )}
  
      {highlightedPartId === "stemHeight" && (
        <rect x="135" y="140" width="30" height="450" fill="rgba(255,215,0,0.18)" rx="6" />
      )}
    </svg>
  );
}

export default MaizePlantSVG;

