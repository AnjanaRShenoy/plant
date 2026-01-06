import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlantView from './components/PlantView';
import GeneInfoPage from './components/GeneInfoPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlantView />} />
        <Route path="/maize/genes" element={<GeneInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;

