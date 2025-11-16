'use client';

import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 0.5; // Pixels per frame
    const cardWidth = 384; // w-96 = 384px
    const gap = 24; // gap-6 = 24px
    const itemWidth = cardWidth + gap;

    const scroll = () => {
      if (!scrollContainer) return;

      scrollAmount += scrollStep;
      scrollContainer.scrollLeft = scrollAmount;

      // Reset when we've scrolled past the first set of items
      if (scrollAmount >= itemWidth * testimonials.length) {
        scrollAmount = 0;
        scrollContainer.scrollLeft = 0;
      }
    };

    const intervalId = setInterval(scroll, 16); // ~60fps

    return () => clearInterval(intervalId);
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
        className="flex gap-6 overflow-x-hidden"
        style={{ scrollBehavior: 'auto' }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${index}`}
            className="flex-shrink-0 w-96 bg-primary-700 rounded-lg p-8 shadow-sm border border-primary-400"
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
              "{testimonial.text}"
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
