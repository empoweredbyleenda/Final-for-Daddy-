import React from 'react';
import { ArrowRight, Shield, Award, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { businessInfo } from '../data/mock';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl" />
        </div>
        {/* Subtle pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Shield size={16} className="text-amber-400" />
              <span className="text-sm font-medium">Licensed & BBB Accredited</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6">
              Transform Your Body
              <span className="block text-amber-400 font-semibold mt-2">
                Without Surgery
              </span>
            </h1>
            
            <p className="text-lg text-stone-300 mb-8 max-w-lg leading-relaxed">
              Experience non-invasive body sculpting that delivers real results. 
              No downtime, no surgery, no side effects—just the confident, 
              beautiful you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                asChild
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold px-8 py-6 rounded-full text-base group"
              >
                <a href={businessInfo.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book Free Consultation
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-full text-base"
              >
                <a href="#services">View Services</a>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Award className="text-amber-400" size={20} />
                </div>
                <div>
                  <p className="text-white font-medium">5+ Years</p>
                  <p className="text-stone-400 text-sm">Experience</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Clock className="text-amber-400" size={20} />
                </div>
                <div>
                  <p className="text-white font-medium">Zero</p>
                  <p className="text-stone-400 text-sm">Downtime</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Shield className="text-amber-400" size={20} />
                </div>
                <div>
                  <p className="text-white font-medium">100%</p>
                  <p className="text-stone-400 text-sm">Non-Invasive</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Decorative Elements */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main circle */}
              <div className="absolute inset-8 rounded-full border-2 border-amber-400/30 animate-pulse" />
              <div className="absolute inset-16 rounded-full border border-amber-400/20" />
              <div className="absolute inset-24 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 backdrop-blur-sm" />
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl font-light text-amber-400">SB</p>
                  <p className="text-stone-400 text-sm tracking-widest mt-2">LOS ANGELES</p>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 animate-float">
                <p className="text-amber-400 font-semibold">★★★★★</p>
                <p className="text-white text-sm">5-Star Reviews</p>
              </div>
              <div className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 animate-float-delayed">
                <p className="text-white text-2xl font-semibold">100+</p>
                <p className="text-stone-300 text-sm">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
