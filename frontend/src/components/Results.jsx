import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const beforeAfterImages = [
  { id: 1, title: "Body Contouring", area: "Abdomen" },
  { id: 2, title: "Fat Reduction", area: "Love Handles" },
  { id: 3, title: "Skin Tightening", area: "Arms" },
  { id: 4, title: "Cellulite Treatment", area: "Thighs" },
];

const Results = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % beforeAfterImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + beforeAfterImages.length) % beforeAfterImages.length);
  };

  return (
    <section id="results" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[#E91E8C] mb-4">
            <span className="w-12 h-px bg-[#E91E8C]" />
            <span className="text-sm font-semibold tracking-wider uppercase">Real Results</span>
            <span className="w-12 h-px bg-[#E91E8C]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">
            See the Transformation
            <span className="block text-[#E91E8C] font-semibold">Before & After</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Real clients, real results. See the incredible transformations achieved 
            through our non-invasive treatments.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {beforeAfterImages.map((item, index) => (
            <div
              key={item.id}
              className={`relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 ${
                index === currentSlide ? 'ring-2 ring-[#E91E8C]' : ''
              }`}
              onClick={() => setCurrentSlide(index)}
            >
              {/* Placeholder for before/after */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#E91E8C]/20 flex items-center justify-center">
                      <span className="text-[#E91E8C] text-2xl font-light">{index + 1}</span>
                    </div>
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-gray-400 text-sm">{item.area}</p>
                  </div>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-[#E91E8C]/0 group-hover:bg-[#E91E8C]/20 transition-colors" />
              
              {/* Before/After labels */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                  Before
                </span>
                <span className="bg-[#E91E8C]/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                  After
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="rounded-full border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white hover:border-[#E91E8C]"
          >
            <ChevronLeft size={20} />
          </Button>
          <div className="flex items-center gap-2">
            {beforeAfterImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'w-8 bg-[#E91E8C]'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="rounded-full border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white hover:border-[#E91E8C]"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Results;
