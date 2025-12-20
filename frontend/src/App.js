import React, { useState, useEffect } from 'react';
import './App.css';
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
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [couponData, setCouponData] = useState(null);
  const [hasSeenModal, setHasSeenModal] = useState(false);

  // Show modal after 5 seconds if user hasn't seen it
  useEffect(() => {
    const hasSeenBefore = localStorage.getItem('snatchedBeautiesModalSeen');
    if (!hasSeenBefore) {
      const timer = setTimeout(() => {
        setShowModal(true);
        setHasSeenModal(true);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setHasSeenModal(true);
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
      // If there's an error, generate a local coupon as fallback
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
    <div className="App">
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

      {/* Coupon Modal */}
      <CouponModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitLead}
        isLoading={isLoading}
        couponData={couponData}
      />
    </div>
  );
}

export default App;
