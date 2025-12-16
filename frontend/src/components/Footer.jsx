import React from 'react';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { businessInfo } from '../data/mock';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-light tracking-wider">SNATCHED</span>
              <span className="text-2xl font-semibold tracking-wider text-[#E91E8C]">BEAUTIES</span>
            </a>
            <p className="text-gray-400 leading-relaxed mb-6">
              Non-invasive body sculpting that delivers real results. 
              Transform your body without surgery, downtime, or side effects.
            </p>
            <div className="flex gap-4">
              <a
                href={businessInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#E91E8C] transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href={businessInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#E91E8C] transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href={businessInfo.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#E91E8C] transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Results', 'Reviews', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-[#E91E8C] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                'Ultrasonic Cavitation',
                'EMS Body Sculpting',
                'Vacuum Therapy BBL',
                'Radio Frequency',
                'Lymphatic Massage',
                'Wood Therapy'
              ].map((service) => (
                <li key={service}>
                  <a
                    href={businessInfo.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#E91E8C] transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#E91E8C] mt-1 flex-shrink-0" />
                <span className="text-gray-400">{businessInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#E91E8C] flex-shrink-0" />
                <a href={`tel:${businessInfo.phone}`} className="text-gray-400 hover:text-[#E91E8C] transition-colors">
                  {businessInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#E91E8C] flex-shrink-0" />
                <a href={`mailto:${businessInfo.email}`} className="text-gray-400 hover:text-[#E91E8C] transition-colors">
                  {businessInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Snatched Beauties. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#E91E8C] transition-colors"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
