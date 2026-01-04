import React, { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { businessInfo } from '../data/mock';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API}/leads`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <img 
            src="/logo.png" 
            alt="Snatched Beauties" 
            className="h-24 w-auto mx-auto mb-6"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Info */}
          <div>
            <p className="text-[#E91E8C] text-sm font-medium tracking-widest uppercase mb-4">
              GET IN TOUCH
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Let's Transform Together
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Ready to start your body transformation journey? Connect with Snatched Beauties 
              and book your free consultation today.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E91E8C]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-[#E91E8C]" size={20} />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Location</p>
                  <p className="text-gray-400">{businessInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E91E8C]/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-[#E91E8C]" size={20} />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Email</p>
                  <a href={`mailto:${businessInfo.email}`} className="text-gray-400 hover:text-[#E91E8C] transition-colors">
                    {businessInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E91E8C]/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="text-[#E91E8C]" size={20} />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Phone</p>
                  <a href={`tel:${businessInfo.phone}`} className="text-gray-400 hover:text-[#E91E8C] transition-colors">
                    {businessInfo.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-zinc-700/50 rounded-2xl p-8">
            {submitStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#E91E8C]/20 flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-[#E91E8C]" size={28} />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    required
                    className="w-full bg-zinc-600 border border-zinc-500 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#E91E8C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    required
                    className="w-full bg-zinc-600 border border-zinc-500 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#E91E8C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(323) 555-0123"
                    className="w-full bg-zinc-600 border border-zinc-500 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#E91E8C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">Message (Optional)</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your goals..."
                    rows={4}
                    className="w-full bg-zinc-600 border border-zinc-500 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#E91E8C] transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#E91E8C] hover:bg-[#d11a7d] text-white py-4 rounded-xl font-medium disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>

                {submitStatus === 'error' && (
                  <p className="text-red-400 text-sm text-center">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
