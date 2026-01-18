import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Results from './components/Results';
import LeadCapture from './components/LeadCapture';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CouponModal from './components/CouponModal';
import LandingPage from './components/LandingPage';
import BookingSystem from './components/BookingSystem';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentCancel from './components/PaymentCancel';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
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

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Payment Success Page */}
          <Route path="/payment/success" element={<PaymentSuccess />} />
          
          {/* Payment Cancel Page */}
          <Route path="/payment/cancel" element={<PaymentCancel />} />
          
          {/* Landing Page */}
          <Route path="/offer" element={<LandingPage />} />
          
          {/* Main Website Homepage */}
          <Route path="/" element={
            <>
              <Header />
              <Hero />
              <Services />
              <LeadCapture 
                showModal={showModal}
                onCloseModal={handleCloseModal}
                isLoading={isLoading}
                onSubmitLead={handleSubmitLead}
                couponData={couponData}
              />
              <About />
              <Results />
              <BookingSystem />
              <Contact />
              <Footer />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
