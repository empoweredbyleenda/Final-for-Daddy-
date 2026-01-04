import React from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import { businessInfo } from '../data/mock';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Snatched Beauties" 
              className="h-16 w-auto"
            />
          </a>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a href="#services" className="text-gray-400 hover:text-[#E91E8C] text-sm transition-colors">
              Services
            </a>
            <a href="#about" className="text-gray-400 hover:text-[#E91E8C] text-sm transition-colors">
              About
            </a>
            <a href="#results" className="text-gray-400 hover:text-[#E91E8C] text-sm transition-colors">
              Results
            </a>
            <a href="#contact" className="text-gray-400 hover:text-[#E91E8C] text-sm transition-colors">
              Contact
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={businessInfo.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-gray-400 hover:text-[#E91E8C] hover:bg-zinc-700 transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href={businessInfo.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-gray-400 hover:text-[#E91E8C] hover:bg-zinc-700 transition-colors"
            >
              <Facebook size={18} />
            </a>
            <a
              href={businessInfo.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-gray-400 hover:text-[#E91E8C] hover:bg-zinc-700 transition-colors"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Snatched Beauties. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            {businessInfo.address}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
