import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Instagram, Facebook, Youtube } from 'lucide-react';
import { Button } from './ui/button';
import { businessInfo } from '../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Results', href: '#results' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      {/* Top Bar - Hot Pink */}
      <div className={`transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto opacity-100'}`}>
        <div className="bg-[#E91E8C] text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <span className="text-white/90">{businessInfo.hours.weekday}</span>
            </div>
            <div className="flex items-center gap-4">
              <a href={businessInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
                <Instagram size={16} />
              </a>
              <a href={businessInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
                <Facebook size={16} />
              </a>
              <a href={businessInfo.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <span className={`text-2xl font-light tracking-wider transition-colors ${
              isScrolled ? 'text-black' : 'text-white'
            }`}>
              SNATCHED
            </span>
            <span className={`text-2xl font-semibold tracking-wider transition-colors ${
              isScrolled ? 'text-[#E91E8C]' : 'text-[#E91E8C]'
            }`}>
              BEAUTIES
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-[#E91E8C] ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${businessInfo.phone}`} className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}>
              <Phone size={16} />
              {businessInfo.phone}
            </a>
            <Button
              asChild
              className="bg-[#E91E8C] hover:bg-[#d11a7d] text-white px-6 rounded-full border-2 border-[#E91E8C] hover:border-[#d11a7d]"
            >
              <a href={businessInfo.bookingUrl} target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? 'text-black' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white rounded-2xl shadow-xl mt-2 p-6 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 font-medium py-2 hover:text-[#E91E8C] transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-gray-200" />
              <a href={`tel:${businessInfo.phone}`} className="flex items-center gap-2 text-gray-700">
                <Phone size={16} />
                {businessInfo.phone}
              </a>
              <Button
                asChild
                className="bg-[#E91E8C] hover:bg-[#d11a7d] text-white rounded-full w-full"
              >
                <a href={businessInfo.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
