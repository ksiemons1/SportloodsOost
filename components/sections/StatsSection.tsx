'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Value {
  number: string;
  description: string;
}

interface StatsSectionProps {
  values: Value[];
}

// Counter animation hook
const useCountUp = (end: number, duration: number = 2500, isVisible: boolean) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    setHasAnimated(true);
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for smooth animation (ease out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(end * easeOut);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [end, duration, isVisible, hasAnimated]);

  return count;
};

// StatCard component with counter animation
const StatCard: React.FC<{ 
  value: Value; 
  image: string; 
  isVisible: boolean 
}> = ({ value, image, isVisible }) => {
  const targetNumber = parseInt(value.number);
  const animatedCount = useCountUp(targetNumber, 2000, isVisible);

  return (
    <div className="relative h-64 md:h-[32rem] overflow-hidden group">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gray-900/70" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-8 text-white">
        <div className="flex items-center gap-2">
          <span className="text-7xl md:text-8xl lg:text-9xl font-bold leading-none">
            {animatedCount}
          </span>
          <div className="flex flex-col items-center justify-center">
            <span className="text-4xl md:text-5xl font-bold leading-none">+</span>
            <div className="text-xs md:text-sm uppercase tracking-widest font-semibold mt-1">
              JAAR
            </div>
          </div>
        </div>
        <p className="mt-6 text-base md:text-lg font-medium tracking-wide uppercase">
          {value.description}
        </p>
      </div>
    </div>
  );
};

export const StatsSection: React.FC<StatsSectionProps> = ({ values }) => {
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = statsRef.current;
    
    if (typeof window === 'undefined') return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const images = [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop'
  ];

  return (
    <div className="w-full" id="about" ref={statsRef}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {values.map((value, index) => (
          <StatCard 
            key={index} 
            value={value} 
            image={images[index]} 
            isVisible={isStatsVisible}
          />
        ))}
      </div>
    </div>
  );
};
