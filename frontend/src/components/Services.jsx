import React from 'react';
import { Waves, Zap, TrendingUp, Sparkles, Heart, TreePine, Droplets, Scale } from 'lucide-react';
import { services } from '../data/mock';

const iconMap = {
  Waves,
  Zap,
  TrendingUp,
  Sparkles,
  Heart,
  TreeDeciduous: TreePine,
  Droplets,
  Scale
};

const Services = () => {
  // Display first 6 services in the grid
  const displayServices = services.slice(0, 6);

  return (
    <section id="services" className="py-24 bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <img 
            src="/logo.png" 
            alt="Snatched Beauties" 
            className="h-20 w-auto mx-auto mb-6"
          />
          <p className="text-[#E91E8C] text-sm font-medium tracking-widest uppercase mb-4">
            WHAT WE DO
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Body Sculpting Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive non-invasive treatments tailored to transform your body, 
            boost confidence, and deliver lasting results without surgery.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service) => {
            const Icon = iconMap[service.icon] || Sparkles;
            return (
              <div
                key={service.id}
                className="group bg-[#E91E8C] rounded-2xl p-8 hover:bg-[#d11a7d] transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
