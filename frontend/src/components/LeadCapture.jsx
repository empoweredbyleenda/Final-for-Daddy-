import React, { useState } from 'react';
import { Gift, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const LeadCapture = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
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

  return (
    <section className="py-20 bg-zinc-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-[#E91E8C] rounded-full" />
        <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-[#E91E8C] rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 border border-[#E91E8C] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#E91E8C] rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left - Content */}
            <div>
              {/* Logo */}
              <img 
                src="/logo.png" 
                alt="Snatched Beauties" 
                className="h-24 w-auto mb-6"
              />
              
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
                <Gift className="text-white" size={18} />
                <span className="text-white font-semibold text-sm">EXCLUSIVE OFFER</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get <span className="text-black">15% OFF</span>
                <br />Your First Visit!
              </h2>
              
              <p className="text-white/90 mb-6">
                Join our VIP list and receive an exclusive discount code for your first body sculpting treatment. Plus, get beauty tips and special offers!
              </p>

              <div className="flex items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-white" />
                  <span>Instant delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-white" />
                  <span>No spam, ever</span>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="bg-white rounded-2xl p-6">
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
                      placeholder="Your Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-gray-200 focus:border-[#E91E8C] focus:ring-[#E91E8C] text-base"
                    />
                  </div>
                </div>
                
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black hover:bg-zinc-800 text-white py-6 rounded-xl font-semibold text-lg group"
                >
                  {isLoading ? (
                    'Getting Your Coupon...'
                  ) : (
                    <>
                      Claim My 15% Discount
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;
