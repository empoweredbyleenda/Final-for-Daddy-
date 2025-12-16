import React from 'react';
import { Waves, Zap, TrendingUp, Sparkles, Heart, TreeDeciduous, Droplets, Scale, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { services, businessInfo } from '../data/mock';

const iconMap = {
  Waves,
  Zap,
  TrendingUp,
  Sparkles,
  Heart,
  TreeDeciduous,
  Droplets,
  Scale
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[#E91E8C] mb-4">
            <span className="w-12 h-px bg-[#E91E8C]" />
            <span className="text-sm font-semibold tracking-wider uppercase">Our Services</span>
            <span className="w-12 h-px bg-[#E91E8C]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
            Non-Invasive Body Sculpting
            <span className="block text-[#E91E8C] font-semibold">Treatments</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Discover the power of surgery-free, anesthesia-free treatments with zero downtime. 
            Your safety is our priority.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Sparkles;
            return (
              <div
                key={service.id}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-[#E91E8C]/30"
              >
                <div className="w-14 h-14 rounded-xl bg-[#E91E8C]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="text-[#E91E8C]" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-black hover:bg-gray-900 text-white px-8 py-6 rounded-full group"
          >
            <a href={businessInfo.bookingUrl} target="_blank" rel="noopener noreferrer">
              View All Services & Pricing
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
