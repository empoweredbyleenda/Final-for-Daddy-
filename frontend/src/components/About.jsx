import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const About = () => {
  const expertise = [
    'Ultrasonic cavitation and fat reduction',
    'EMS body sculpting and muscle toning',
    'Vacuum therapy and BBL treatments',
    'Radio frequency skin tightening',
    'Lymphatic massage and detox',
    'Personalized weight loss programs'
  ];

  return (
    <section id="about" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <p className="text-[#E91E8C] text-sm font-medium tracking-widest uppercase mb-4">
          ABOUT US
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-12">
          About
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Text */}
          <div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Snatched Beauties is a premier body sculpting destination in Los Angeles, 
              known for delivering transformative results through non-invasive treatments 
              that require zero downtime.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              With a foundation rooted in client care, cutting-edge technology, and 
              personalized treatment plans, Snatched Beauties has earned a reputation 
              as a trusted partner in helping clients achieve their body goals safely 
              and effectively.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              Led by Leenda, our certified body sculptor practitioner, we combine 
              expertise with genuine care to ensure every client feels comfortable, 
              confident, and excited about their transformation journey.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We also offer <span className="text-[#E91E8C] font-medium">professional training courses</span> locally 
              and worldwide, having trained thousands of aspiring body sculpting practitioners. 
              No experience needed to start your journey.
            </p>
          </div>

          {/* Right Column - Expertise */}
          <div className="bg-zinc-900 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-white mb-8">
              Areas of Expertise
            </h3>
            <div className="space-y-4">
              {expertise.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#E91E8C] flex-shrink-0" size={20} />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-zinc-800">
              <div>
                <p className="text-3xl font-light text-white">5+</p>
                <p className="text-gray-500 text-xs">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-light text-white">5,000+</p>
                <p className="text-gray-500 text-xs">Treatments</p>
              </div>
              <div>
                <p className="text-3xl font-light text-white">1,000+</p>
                <p className="text-gray-500 text-xs">Trained Worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
