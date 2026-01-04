import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Results from './components/Results';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';

// Main Website Homepage
const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Results />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Main website */}
          <Route path="/" element={<HomePage />} />
          
          {/* Dedicated Landing Page for ads/campaigns */}
          <Route path="/offer" element={<LandingPage />} />
          <Route path="/promo" element={<LandingPage />} />
          <Route path="/discount" element={<LandingPage />} />
          <Route path="/15off" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
