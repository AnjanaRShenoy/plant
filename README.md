# Maize Plant Anatomy with Gene Information

An interactive educational website focused on maize (corn) plant anatomy. Users can click on specific traits (Tassel, Leaf Angle, Stem Height) to navigate to detailed gene information pages showing the genes that control these traits.

## Features

- **Maize Plant Visualization**: Interactive image with clickable regions for three key traits
- **Gene Information Pages**: Detailed information about genes controlling each trait
- **Trait Navigation**: Click on Tassel, Leaf Angle, or Stem Height to view gene details
- **Scientific Presentation**: Research-style presentation of gene information including:
  - Gene names and symbols
  - Biological functions
  - Pathways
  - Research findings

## Technology Stack

- **React 18** - UI framework
- **React Router** - Navigation between plant view and gene pages
- **Vite** - Build tool and development server
- **CSS3** - Styling with animations and responsive design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service (GitHub Pages, Netlify, Vercel, etc.).

## Project Structure

```
plant/
├── src/
│   ├── components/
│   │   ├── PlantView.jsx         # Main plant view
│   │   ├── PlantDiagram.jsx       # Plant image with clickable regions
│   │   ├── GeneInfoPage.jsx       # Gene information page
│   │   └── PartDetails.jsx       # Modal for part details (if needed)
│   ├── data/
│   │   ├── plants.json           # Maize plant data
│   │   └── maizeGenes.json       # Gene information for traits
│   ├── App.jsx                   # Main app with routing
│   └── main.jsx                 # Entry point
├── package.json
└── vite.config.js
```

## How It Works

1. **Main View**: Displays the maize plant image with three clickable regions
2. **Click Interaction**: Clicking on Tassel, Leaf Angle, or Stem Height navigates to the gene information page
3. **Gene Information Page**: Shows detailed information about genes controlling the selected trait
4. **Tab Navigation**: Switch between different traits on the gene information page
5. **Back Navigation**: Return to the main plant view

## Traits and Genes

### Tassel Development
Genes controlling male inflorescence development and branching patterns.

### Leaf Angle
Genes affecting leaf architecture and light capture efficiency.

### Stem Total Height
Genes controlling plant height, including dwarfing genes and hormone pathways.

## License

MIT
