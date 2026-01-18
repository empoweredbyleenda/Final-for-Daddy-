import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { businessInfo } from '../data/mock';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-zinc-900 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#E91E8C]/40 rounded-full" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-gray-500 rounded-full" />
        <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-[#E91E8C]/30 rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-gray-600 rounded-full" />
        <div className="absolute bottom-1/4 right-10 w-2 h-2 bg-[#E91E8C]/20 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src="/logo.png" 
              alt="Snatched Beauties" 
              className="h-40 sm:h-48 lg:h-56 w-auto"
            />
          </div>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 italic mb-4">
            Transform Your Body. Elevate Your Confidence.
          </p>

          {/* Description */}
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10">
            Premier non-invasive body sculpting delivering real results with zero downtime
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              asChild
              size="lg"
              className="bg-[#E91E8C] hover:bg-[#d11a7d] text-white px-8 py-6 rounded-full font-medium group"
            >
              <a href="#contact">
                Book Consultation
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[#E91E8C]/50 text-white hover:bg-[#E91E8C]/10 px-8 py-6 rounded-full font-medium"
            >
              <a href="#services">Explore Services</a>
            </Button>
          </div>

          {/* Stats Row */}
          <div className="border-t border-zinc-700 pt-12 mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
              <div className="text-center">
                <p className="text-4xl sm:text-5xl font-light text-white">5+</p>
                <p className="text-gray-400 text-sm mt-1">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-4xl sm:text-5xl font-light text-white">500+</p>
                <p className="text-gray-400 text-sm mt-1">Happy Clients</p>
              </div>
              <div className="text-center">
                <p className="text-4xl sm:text-5xl font-light text-white">5,000+</p>
                <p className="text-gray-400 text-sm mt-1">Treatments Done</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
