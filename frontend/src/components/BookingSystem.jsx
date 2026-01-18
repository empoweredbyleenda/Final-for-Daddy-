import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const stripePublishableKey = 'pk_test_51KUK9GDyQRmOKFPq1l2P6euvcfyWk3OLwe6D3Q9L9bInkbs6rRgzNzbez1PLoZ5fvdHOfo46RzXzr0ahTJRgk8dn002SANVDJM';

const BookingSystem = () => {
  const [services, setServices] = useState({});
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    preferredDate: '',
    preferredTime: '',
    specialRequests: '',
    units: 1
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [step, setStep] = useState(1); // 1: Service Selection, 2: Details, 3: Payment
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API}/services`);
      setServices(response.data.services);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return selectedService !== '';
      case 2:
        return formData.customerName && formData.customerEmail && formData.preferredDate && formData.preferredTime;
      default:
        return true;
    }
  };

  const handleBookingSubmit = async () => {
    if (!validateStep(2)) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    setLoading(true);
    try {
      const bookingData = {
        service_package: selectedService,
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime,
        customer_name: formData.customerName,
        customer_email: formData.customerEmail,
        customer_phone: formData.customerPhone,
        special_requests: formData.specialRequests
      };

      const response = await axios.post(`${API}/bookings`, bookingData);
      setBookingId(response.data.booking_id);
      setMessage({ type: 'success', text: response.data.message });
      setStep(3); // Move to payment step
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.detail || 'Booking failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!selectedService || !formData.customerEmail) {
      setMessage({ type: 'error', text: 'Missing required information for payment' });
      return;
    }

    setLoading(true);
    try {
      const service = services[selectedService];
      const paymentData = {
        service_package: selectedService,
        customer_email: formData.customerEmail,
        customer_name: formData.customerName,
        units: service?.unit_based ? formData.units : 1,
        success_url: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/payment/cancel`
      };

      const response = await axios.post(`${API}/payments/checkout`, paymentData);
      
      // Redirect to Stripe Checkout
      if (response.data.checkout_url) {
        window.location.href = response.data.checkout_url;
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.detail || 'Payment setup failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDirectCalendly = () => {
    window.open('https://calendly.com/info-o6c', '_blank');
  };

  const getSelectedServiceDetails = () => {
    return selectedService ? services[selectedService] : null;
  };

  const calculateTotal = () => {
    const service = getSelectedServiceDetails();
    if (!service) return 0;
    if (service.variable_pricing) return 'Consultation Required';
    if (service.price === 0) return 'Complimentary';
    return service.price;
  };

  return (
    <section id="booking" className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Book Your <span className="text-pink-600">Body Sculpting</span> Session
          </h2>
          <p className="text-xl text-gray-600">
            Choose your transformation service and let us help you achieve your body goals
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= stepNum 
                    ? 'bg-pink-600 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-12 h-1 ml-2 ${
                    step > stepNum ? 'bg-pink-600' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Select Your Service</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {Object.entries(services).map(([serviceId, service]) => (
                  <div
                    key={serviceId}
                    onClick={() => setSelectedService(serviceId)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedService === serviceId
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-pink-300 hover:bg-pink-25'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-800">{service.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                        <div className="mt-2">
                          <span className="text-pink-600 font-semibold">
                            ${service.unit_based ? `${service.price}/unit` : service.price}
                          </span>
                          <span className="text-gray-500 text-sm ml-2">• {service.duration} min</span>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 ${
                        selectedService === serviceId
                          ? 'border-pink-500 bg-pink-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedService === serviceId && (
                          <svg className="w-4 h-4 text-white ml-0.5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Unit selection for unit-based services */}
              {selectedService && getSelectedServiceDetails()?.unit_based && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Units
                  </label>
                  <input
                    type="number"
                    name="units"
                    min="1"
                    max="50"
                    value={formData.units}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Total: {typeof calculateTotal() === 'string' ? calculateTotal() : `$${calculateTotal()}`}
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => validateStep(1) && setStep(2)}
                  disabled={!validateStep(1)}
                  className="flex-1 bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Details
                </button>
                <button
                  onClick={handleDirectCalendly}
                  className="px-6 py-3 border-2 border-pink-500 text-pink-600 rounded-lg hover:bg-pink-50 transition-all duration-300 font-medium"
                >
                  Use Calendly Instead
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Customer Details */}
          {step === 2 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Details</h3>
              
              {/* Selected Service Summary */}
              <div className="bg-pink-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800">Selected Service:</h4>
                <p className="text-pink-600">
                  {getSelectedServiceDetails()?.name} - ${calculateTotal()} 
                  ({getSelectedServiceDetails()?.duration} minutes)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  required
                >
                  <option value="">Select a time</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests or Notes
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Any allergies, preferences, or special requests..."
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Back
                </button>
                <button
                  onClick={handleBookingSubmit}
                  disabled={loading || !validateStep(2)}
                  className="flex-1 bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Booking...' : 'Create Booking'}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Secure Payment</h3>
              
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-green-700 font-medium">Booking Created Successfully!</p>
                </div>
                <p className="text-green-600 text-sm mt-1">Booking ID: {bookingId}</p>
              </div>

              {/* Booking Summary */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-4">Booking Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span className="font-medium">{getSelectedServiceDetails()?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{getSelectedServiceDetails()?.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date & Time:</span>
                    <span>{formData.preferredDate} at {formData.preferredTime}</span>
                  </div>
                  {getSelectedServiceDetails()?.unit_based && (
                    <div className="flex justify-between">
                      <span>Units:</span>
                      <span>{formData.units}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span className="text-pink-600">
                        {typeof calculateTotal() === 'string' ? calculateTotal() : `$${calculateTotal()}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 text-center">
                  Complete your booking by making a secure payment through Stripe
                </p>
                
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-pink-600 text-white py-4 px-6 rounded-lg hover:bg-pink-700 transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                  ) : (
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                  {loading ? 'Setting up payment...' : `Pay $${calculateTotal()} Securely`}
                </button>

                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Secured by Stripe • SSL Protected</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  Back to Details
                </button>
                <button
                  onClick={() => {
                    setStep(1);
                    setSelectedService('');
                    setFormData({
                      customerName: '',
                      customerEmail: '',
                      customerPhone: '',
                      preferredDate: '',
                      preferredTime: '',
                      specialRequests: '',
                      units: 1
                    });
                    setBookingId(null);
                  }}
                  className="px-6 py-3 border-2 border-pink-500 text-pink-600 rounded-lg hover:bg-pink-50 transition-all duration-300"
                >
                  Book Another Service
                </button>
              </div>
            </div>
          )}

          {/* Message Display */}
          {message.text && (
            <div className={`mt-6 p-4 rounded-lg ${
              message.type === 'error' 
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-green-50 border border-green-200 text-green-700'
            }`}>
              <div className="flex items-center">
                <svg className={`w-5 h-5 mr-2 ${
                  message.type === 'error' ? 'text-red-500' : 'text-green-500'
                }`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d={message.type === 'error' 
                    ? "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    : "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  } clipRule="evenodd" />
                </svg>
                <p className="font-medium">{message.text}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingSystem;