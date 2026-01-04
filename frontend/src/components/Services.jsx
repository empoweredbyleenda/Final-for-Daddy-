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
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[#E91E8C] text-sm font-medium tracking-widest uppercase mb-4">
            WHAT WE DO
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Body Sculpting Services
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl">
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
                className="group bg-zinc-900 rounded-2xl p-8 hover:bg-zinc-800 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-zinc-800 group-hover:bg-zinc-700 flex items-center justify-center mb-6 transition-colors">
                  <Icon className="text-[#E91E8C]" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
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
