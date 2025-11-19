'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Container, Heading } from '../ui';

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
}

interface TestimonialCarouselProps {
  title: string;
  testimonials: Testimonial[];
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ title, testimonials }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth auto-scroll with snap - Desktop only
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Check if desktop
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

    // Auto-scroll every 4 seconds
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % testimonials.length;
        
        // Scroll to the next card smoothly
        if (scrollContainer) {
          const cardWidth = 384; // w-96
          const gap = 24; // gap-6
          const itemWidth = cardWidth + gap;
          const scrollPosition = nextIndex * itemWidth;
          
          scrollContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
          });
        }
        
        return nextIndex;
      });
    }, 4000); // Change slide every 4 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [testimonials.length]);

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="py-16 md:py-24 bg-primary-600 overflow-hidden">
      <Container>
        <div className="text-center mb-12">
          <Heading level={2} className="text-white">{title}</Heading>
        </div>
      </Container>

      <div 
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory px-[calc(50vw-140px)] md:px-0"
        style={{ 
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {duplicatedTestimonials.map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${index}`}
            className="flex-shrink-0 w-[280px] md:w-96 bg-primary-700 rounded-lg p-6 md:p-8 shadow-sm border border-primary-400 snap-center"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-primary-200 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>

            <p className="text-white text-base mb-6 leading-relaxed">
              &ldquo;{testimonial.text}&rdquo;
            </p>

            <div className="border-t border-primary-400 pt-4">
              <p className="font-semibold text-white">{testimonial.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
