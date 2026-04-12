import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; // Move your current code here
import DataHub from './DataHub'; // Your new page
import "leaflet/dist/leaflet.css";

export default function App() {
  return (
    <Router basename='/agrabhi-website'>
      <Routes>
        {/* The main landing page */}
        <Route path="/" element={<Home />} />
        
        {/* The new page you want to create */}
        <Route path="/data-hub" element={<DataHub />} />
      </Routes>
    </Router>
  );
}