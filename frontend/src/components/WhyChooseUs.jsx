import React from 'react';
import { MessageSquare, Award, ShieldCheck, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { businessInfo } from '../data/mock';

const reasons = [
  {
    icon: MessageSquare,
    title: "Free Consultation",
    description: "We discuss all your body goals and create a custom plan and package tailored specifically to you."
  },
  {
    icon: Award,
    title: "Expert Care",
    description: "Certified Body Sculptor Practitioners committed to delivering exceptional, transformative results."
  },
  {
    icon: ShieldCheck,
    title: "Safe & Clean",
    description: "Insured, licensed, and BBB-accredited spa with immaculate, welcoming facilities."
  },
  {
    icon: GraduationCap,
    title: "Training Courses",
    description: "Body sculpting training offered locally, virtually, and worldwide. No experience needed."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 text-[#E91E8C] mb-4">
              <span className="w-12 h-px bg-[#E91E8C]" />
              <span className="text-sm font-semibold tracking-wider uppercase">Why Choose Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6 leading-tight">
              Experience the
              <span className="block text-[#E91E8C] font-semibold">Snatched Difference</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              At Snatched Beauties, we don't just offer treatments—we craft personalized 
              journeys to help you achieve your dream body safely and effectively.
            </p>

            <div className="bg-[#E91E8C]/5 rounded-2xl p-6 border border-[#E91E8C]/20">
              <h3 className="font-semibold text-gray-900 mb-2">Before Your Treatment</h3>
              <p className="text-gray-600 text-sm">
                Please drink 24 ounces of water at least 2 hours before your appointment. 
                Come dressed comfortably for the best experience.
              </p>
            </div>
          </div>

          {/* Right - Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#E91E8C]/30"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E91E8C]/10 flex items-center justify-center mb-4 group-hover:bg-[#E91E8C] transition-colors">
                  <reason.icon className="text-[#E91E8C] group-hover:text-white transition-colors" size={22} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{reason.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-20 bg-black rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
              Ready to Start Your
              <span className="text-[#E91E8C] font-semibold"> Transformation?</span>
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Book your free consultation today and let us create a personalized plan 
              to help you achieve your body goals.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#E91E8C] hover:bg-[#d11a7d] text-white font-semibold px-8 py-6 rounded-full group"
            >
              <a href={businessInfo.bookingUrl} target="_blank" rel="noopener noreferrer">
                Book Your Free Consultation
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
