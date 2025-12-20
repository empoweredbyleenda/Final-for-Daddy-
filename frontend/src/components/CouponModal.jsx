import React, { useState } from 'react';
import { X, Gift, Mail, CheckCircle, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const CouponModal = ({ isOpen, onClose, onSubmit, isLoading, couponData }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    await onSubmit({ email, name });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(couponData?.couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X size={20} className="text-gray-500" />
        </button>

        {!couponData ? (
          // Email capture form
          <>
            {/* Header */}
            <div className="bg-[#E91E8C] p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <Gift className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Get 15% OFF
              </h2>
              <p className="text-white/90">
                Your First Treatment!
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8">
              <p className="text-gray-600 text-center mb-6">
                Enter your email to receive your exclusive discount code instantly.
              </p>

              <div className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-[#E91E8C] focus:ring-[#E91E8C]"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border-gray-200 focus:border-[#E91E8C] focus:ring-[#E91E8C]"
                  />
                </div>
                
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#E91E8C] hover:bg-[#d11a7d] text-white py-6 rounded-xl font-semibold text-lg"
                >
                  {isLoading ? 'Getting Your Coupon...' : 'Get My 15% OFF Coupon'}
                </Button>
              </div>

              <p className="text-xs text-gray-400 text-center mt-4">
                By signing up, you agree to receive promotional emails. Unsubscribe anytime.
              </p>
            </form>
          </>
        ) : (
          // Success - Show coupon
          <>
            <div className="bg-[#E91E8C] p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                You're In!
              </h2>
              <p className="text-white/90">
                Here's your exclusive discount
              </p>
            </div>

            <div className="p-8 text-center">
              <p className="text-gray-600 mb-4">
                Use this code at your appointment:
              </p>

              {/* Coupon Code Display */}
              <div className="bg-gray-50 border-2 border-dashed border-[#E91E8C] rounded-2xl p-6 mb-6">
                <p className="text-sm text-[#E91E8C] font-medium mb-2">YOUR COUPON CODE</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl font-bold text-gray-900 tracking-wider">
                    {couponData.couponCode}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {copied ? (
                      <Check size={20} className="text-green-500" />
                    ) : (
                      <Copy size={20} className="text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="text-2xl font-bold text-[#E91E8C] mt-3">15% OFF</p>
                <p className="text-sm text-gray-500 mt-1">Your First Treatment</p>
              </div>

              <Button
                asChild
                className="w-full bg-[#E91E8C] hover:bg-[#d11a7d] text-white py-6 rounded-xl font-semibold"
              >
                <a href="https://www.snatchedbeauties.la/book-appointment/" target="_blank" rel="noopener noreferrer">
                  Book Your Appointment Now
                </a>
              </Button>

              <p className="text-xs text-gray-400 mt-4">
                Show this code when you arrive. Valid for 30 days.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CouponModal;
