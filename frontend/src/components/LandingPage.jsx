import React, { useState } from 'react';
import { Gift, Mail, ArrowRight, CheckCircle, Copy, Check, Shield, Clock, Award, Star, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [couponData, setCouponData] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post(`${API}/leads`, {
        email,
        name: name || undefined,
        phone: phone || undefined,
      });
      setCouponData(response.data);
    } catch (err) {
      console.error('Error:', err);
      // Fallback coupon
      setCouponData({
        couponCode: 'SNATCHED15',
        discount: '15%',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(couponData?.couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="py-4 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-light tracking-wider text-white">SNATCHED</span>
            <span className="text-xl font-semibold tracking-wider text-[#E91E8C]">BEAUTIES</span>
          </div>
          <a href="tel:323-613-5153" className="flex items-center gap-2 text-white hover:text-[#E91E8C] transition-colors">
            <Phone size={16} />
            <span className="hidden sm:inline">323-613-5153</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Value Proposition */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#E91E8C]/20 px-4 py-2 rounded-full mb-6">
                <Gift className="text-[#E91E8C]" size={18} />
                <span className="text-[#E91E8C] font-semibold text-sm">LIMITED TIME OFFER</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Get <span className="text-[#E91E8C]">15% OFF</span>
                <br />Your First
                <br />Treatment!
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
                Transform your body with non-invasive sculpting. 
                No surgery. No downtime. Real results.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#E91E8C]/20 flex items-center justify-center">
                    <Award className="text-[#E91E8C]" size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium text-sm">5+ Years</p>
                    <p className="text-gray-500 text-xs">Experience</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#E91E8C]/20 flex items-center justify-center">
                    <Shield className="text-[#E91E8C]" size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium text-sm">Licensed</p>
                    <p className="text-gray-500 text-xs">& Insured</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#E91E8C]/20 flex items-center justify-center">
                    <Clock className="text-[#E91E8C]" size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium text-sm">Zero</p>
                    <p className="text-gray-500 text-xs">Downtime</p>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-[#E91E8C] fill-[#E91E8C]" size={18} />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">50+ 5-Star Reviews</span>
              </div>
            </div>

            {/* Right Side - Form or Success */}
            <div className="flex justify-center lg:justify-end">
              {!couponData ? (
                // Lead Capture Form
                <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#E91E8C] rounded-full flex items-center justify-center">
                      <Gift className="text-white" size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Claim Your Discount</h2>
                    <p className="text-gray-500 mt-2">Enter your info to get your exclusive coupon</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-4 rounded-xl border-gray-200 focus:border-[#E91E8C] focus:ring-[#E91E8C] text-base"
                      />
                    </div>
                    <div>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          type="email"
                          placeholder="Your Email Address *"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full pl-12 pr-4 py-4 rounded-xl border-gray-200 focus:border-[#E91E8C] focus:ring-[#E91E8C] text-base"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          type="tel"
                          placeholder="Phone Number (optional)"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 rounded-xl border-gray-200 focus:border-[#E91E8C] focus:ring-[#E91E8C] text-base"
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#E91E8C] hover:bg-[#d11a7d] text-white py-6 rounded-xl font-semibold text-lg group"
                    >
                      {isLoading ? (
                        'Getting Your Coupon...'
                      ) : (
                        <>
                          Get My 15% OFF Coupon
                          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                        </>
                      )}
                    </Button>
                  </form>

                  <p className="text-xs text-gray-400 text-center mt-4">
                    We respect your privacy. No spam, ever.
                  </p>
                </div>
              ) : (
                // Success - Show Coupon
                <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-green-500" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">You're In!</h2>
                  <p className="text-gray-500 mb-6">Here's your exclusive discount code:</p>

                  {/* Coupon Display */}
                  <div className="bg-[#E91E8C]/5 border-2 border-dashed border-[#E91E8C] rounded-2xl p-6 mb-6">
                    <p className="text-sm text-[#E91E8C] font-medium mb-2">YOUR COUPON CODE</p>
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-3xl font-bold text-gray-900 tracking-wider">
                        {couponData.couponCode}
                      </span>
                      <button
                        onClick={handleCopy}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {copied ? (
                          <Check size={20} className="text-green-500" />
                        ) : (
                          <Copy size={20} className="text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-3xl font-bold text-[#E91E8C] mt-3">15% OFF</p>
                    <p className="text-sm text-gray-500 mt-1">Your First Treatment</p>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-[#E91E8C] hover:bg-[#d11a7d] text-white py-6 rounded-xl font-semibold text-lg"
                  >
                    <a href="https://www.snatchedbeauties.la/book-appointment/" target="_blank" rel="noopener noreferrer">
                      Book Your Appointment Now
                    </a>
                  </Button>

                  <p className="text-xs text-gray-400 mt-4">
                    Show this code at your appointment. Valid for 30 days.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Services Preview */}
        <div className="max-w-6xl mx-auto mt-20">
          <h3 className="text-center text-2xl font-bold text-white mb-8">Our Popular Treatments</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Ultrasonic Cavitation', desc: 'Fat reduction' },
              { name: 'Vacuum Therapy BBL', desc: 'Lift & shape' },
              { name: 'Radio Frequency', desc: 'Skin tightening' },
              { name: 'Lymphatic Massage', desc: 'Detox & recovery' },
            ].map((service, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl p-6 text-center hover:bg-gray-800 transition-colors">
                <p className="text-white font-medium mb-1">{service.name}</p>
                <p className="text-[#E91E8C] text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-[#E91E8C] fill-[#E91E8C]" size={20} />
            ))}
          </div>
          <p className="text-gray-300 text-lg italic mb-4">
            "Leenda is very professional and does a great job! I am starting to see 
            the difference in my back fat! Highly recommend!"
          </p>
          <p className="text-gray-500">- Amanda K., Verified Client</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm mb-4">
            5710 W. Manchester Ave, CA 90045 Suite 211
          </p>
          <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
            <span>Mon-Fri: 9AM-6PM</span>
            <span>|</span>
            <span>Sat: 10AM-6PM</span>
          </div>
          <p className="text-gray-600 text-xs mt-4">
            © {new Date().getFullYear()} Snatched Beauties. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
