import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// Lazy load heavy components
const LazyBookingSystem = lazy(() => import('./BookingSystem'));
const LazyResults = lazy(() => import('./Results'));

// Performance optimized loading component
const LoadingSpinner = ({ text = "Loading..." }) => (
  <div className="flex items-center justify-center py-16">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
      <p className="text-gray-600">{text}</p>
    </div>
  </div>
);

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserver(ref.current);
      }
    };
  }, [ref, options]);
  
  return isIntersecting;
};

// Image optimization component
export const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  width, 
  height, 
  lazy = true,
  placeholder = "blur"
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        className={`transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

// Performance monitoring component
export const PerformanceMonitor = () => {
  React.useEffect(() => {
    // Web Vitals tracking
    if ('web-vital' in window && typeof window.webVitals === 'function') {
      window.webVitals({
        onCLS: (metric) => console.log('CLS:', metric),
        onFID: (metric) => console.log('FID:', metric),
        onFCP: (metric) => console.log('FCP:', metric),
        onLCP: (metric) => console.log('LCP:', metric),
        onTTFB: (metric) => console.log('TTFB:', metric),
      });
    }
    
    // Performance navigation timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          console.log('Page Load Performance:', {
            dns: perfData.domainLookupEnd - perfData.domainLookupStart,
            tcp: perfData.connectEnd - perfData.connectStart,
            ttfb: perfData.responseStart - perfData.requestStart,
            contentLoad: perfData.responseEnd - perfData.responseStart,
            domReady: perfData.domContentLoadedEventEnd - perfData.navigationStart,
            windowLoad: perfData.loadEventEnd - perfData.navigationStart
          });
        }
      }, 0);
    });
  }, []);
  
  return null;
};

// Lazy loaded components with Suspense
export const LazyBookingWithSuspense = () => (
  <Suspense fallback={<LoadingSpinner text="Loading booking system..." />}>
    <LazyBookingSystem />
  </Suspense>
);

export const LazyResultsWithSuspense = () => (
  <Suspense fallback={<LoadingSpinner text="Loading testimonials..." />}>
    <LazyResults />
  </Suspense>
);

// Animation variants for better performance
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default {
  LoadingSpinner,
  useIntersectionObserver,
  OptimizedImage,
  PerformanceMonitor,
  LazyBookingWithSuspense,
  LazyResultsWithSuspense,
  fadeInUp,
  staggerChildren
};