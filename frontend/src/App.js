import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Results from './components/Results';
import Testimonials from './components/Testimonials';
import WhyChooseUs from './components/WhyChooseUs';
import LeadCapture from './components/LeadCapture';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CouponModal from './components/CouponModal';
import LandingPage from './components/LandingPage';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Main Website Homepage
const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [couponData, setCouponData] = useState(null);

  // Show modal after 5 seconds if user hasn't seen it
  useEffect(() => {
    const hasSeenBefore = localStorage.getItem('snatchedBeautiesModalSeen');
    if (!hasSeenBefore) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setCouponData(null);
    localStorage.setItem('snatchedBeautiesModalSeen', 'true');
  };

  const handleSubmitLead = async ({ email, name }) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API}/leads`, {
        email,
        name: name || undefined,
      });
      setCouponData(response.data);
      localStorage.setItem('snatchedBeautiesModalSeen', 'true');
    } catch (error) {
      console.error('Error submitting lead:', error);
      const fallbackCode = 'SNATCHED15';
      setCouponData({
        couponCode: fallbackCode,
        discount: '15%',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadCaptureSubmit = async (data) => {
    await handleSubmitLead(data);
    setShowModal(true);
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <LeadCapture onSubmit={handleLeadCaptureSubmit} isLoading={isLoading} />
        <Results />
        <Testimonials />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />

      <CouponModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitLead}
        isLoading={isLoading}
        couponData={couponData}
      />
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
