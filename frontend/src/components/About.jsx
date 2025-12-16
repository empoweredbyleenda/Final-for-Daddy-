import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { features } from '../data/mock';

const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image/Visual */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-pink-50 to-gray-100">
              {/* Placeholder visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#E91E8C] to-[#ff6bb3] flex items-center justify-center">
                    <Sparkles className="text-white" size={48} />
                  </div>
                  <h3 className="text-2xl font-light text-gray-700">Snatched Beauties</h3>
                  <p className="text-gray-500">Los Angeles, CA</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-6 left-6 w-20 h-20 border-2 border-[#E91E8C]/50 rounded-2xl" />
              <div className="absolute bottom-6 right-6 w-16 h-16 bg-[#E91E8C]/20 rounded-full" />
            </div>

            {/* Stats card */}
            <div className="absolute -bottom-8 -right-8 bg-white shadow-2xl rounded-2xl p-6 hidden md:block border border-[#E91E8C]/10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#E91E8C]/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#E91E8C]">5+</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Years of Excellence</p>
                  <p className="text-gray-500 text-sm">Licensed & Insured</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <div className="inline-flex items-center gap-2 text-[#E91E8C] mb-4">
              <span className="w-12 h-px bg-[#E91E8C]" />
              <span className="text-sm font-semibold tracking-wider uppercase">About Us</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6 leading-tight">
              Where Beauty Meets
              <span className="block text-[#E91E8C] font-semibold">Safety & Innovation</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              At Snatched Beauties, we redefine indulgence by ensuring you feel more 
              confident and beautiful without the concerns of downtime, infection, or risk.
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              As Body Sculptresses, we craft exquisite experiences that set us apart. 
              Our non-invasive aesthetics expertise and patient-centric approach means 
              your feedback shapes our commitment to excellence.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-[#E91E8C]/5 transition-colors"
                >
                  <CheckCircle2 className="text-[#E91E8C] flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">{feature.title}</p>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
