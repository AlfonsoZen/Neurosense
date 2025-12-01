import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { DetectionPage } from './components/DetectionPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/detect" element={<DetectionPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;