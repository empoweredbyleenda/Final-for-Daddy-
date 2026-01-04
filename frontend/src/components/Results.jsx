import React from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '../data/mock';

const Results = () => {
  // Show first 4 testimonials
  const displayTestimonials = testimonials.slice(0, 4);

  return (
    <section id="results" className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <img 
            src="/logo.png" 
            alt="Snatched Beauties" 
            className="h-20 w-auto mx-auto mb-6"
          />
          <p className="text-[#E91E8C] text-sm font-medium tracking-widest uppercase mb-4">
            TESTIMONIALS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Client Results
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real stories from real clients who have experienced transformative results 
            with our body sculpting treatments.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {displayTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-[#E91E8C] fill-[#E91E8C]" size={18} />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-gray-600 leading-relaxed mb-6">
                "{testimonial.text}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E91E8C]/20 flex items-center justify-center">
                  <span className="text-[#E91E8C] font-medium">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <span className="text-gray-900 font-medium">{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
