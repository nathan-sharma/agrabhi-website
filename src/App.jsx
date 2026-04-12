import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import DataHub from "./DataHub";
import "leaflet/dist/leaflet.css";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Main page */}
        <Route path="/" element={<Home />} />

        {/* DataHub page */}
        <Route path="/data-hub" element={<DataHub />} />
      </Routes>
    </HashRouter>
  );
}
