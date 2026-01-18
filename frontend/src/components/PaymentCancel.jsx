import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate('/#booking');
  };

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">Your payment was cancelled. No charges were made to your account.</p>
        
        <div className="space-y-4">
          <button
            onClick={handleTryAgain}
            className="w-full bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700 transition-all duration-300 font-semibold"
          >
            Try Booking Again
          </button>
          <button
            onClick={handleBackHome}
            className="w-full border-2 border-gray-300 text-gray-600 py-3 px-6 rounded-lg hover:bg-gray-50 transition-all duration-300"
          >
            Back to Home
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">
            <strong>Questions?</strong><br/>
            Contact us at <a href="mailto:info@snatchedbeauties.la" className="underline">info@snatchedbeauties.la</a> or call <a href="tel:323-613-5153" className="underline">323-613-5153</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;