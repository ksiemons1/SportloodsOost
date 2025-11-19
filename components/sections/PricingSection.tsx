'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Heading, Card, Badge } from '../ui';

interface Membership {
  name: string;
  pricePrefix?: string;
  price: string;
  features: string[];
  popular?: boolean;
}

interface PricingSectionProps {
  memberships: {
    items: Membership[];
    fullWidth: Membership;
  };
}

export const PricingSection: React.FC<PricingSectionProps> = ({ memberships }) => {
  const [currentMembershipSlide, setCurrentMembershipSlide] = useState(0);
  const membershipScrollRef = useRef<HTMLDivElement>(null);

  // Track membership carousel scroll position
  useEffect(() => {
    const container = membershipScrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = window.innerWidth < 768 ? 280 : 0; // Only track on mobile
      if (cardWidth > 0) {
        const gap = 32; // gap-8
        const slideIndex = Math.round(scrollLeft / (cardWidth + gap));
        setCurrentMembershipSlide(slideIndex);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="tarieven" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <Heading level={2} className="text-center">
          Tarieven
        </Heading>
      </div>
        
      {/* Memberships */}
      <div className="mb-16">
        <div 
          ref={membershipScrollRef}
          className="flex md:grid md:grid-cols-3 gap-8 max-w-5xl md:mx-auto overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 px-[calc(50vw-140px)] md:px-0 pt-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
            {memberships.items.map((membership, index) => (
              <Card
                key={index}
                className={`relative flex-shrink-0 w-[280px] md:w-auto snap-center ${membership.popular ? 'border-2 border-primary-600 bg-primary-50' : ''}`}
              >
                {membership.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge variant="primary" className="bg-primary-600 text-white px-3 py-1">Populair</Badge>
                  </div>
                )}
                <div className="text-center mb-8 relative">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    {membership.name}
                  </h4>
                  <div className="mt-6">
                    <span className="text-base text-gray-600 block mb-1" style={{ minHeight: '1.5rem' }}>
                      {membership.pricePrefix || '\u00A0'}
                    </span>
                    <span className="text-5xl font-bold text-primary-700 block">
                      {membership.price}
                    </span>
                  </div>
                </div>
                <ul className="space-y-4 mb-6">
                  {membership.features.map((feature, i) => (
                    <li key={i} className="text-base text-gray-700 flex items-start">
                      <span className="text-primary-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
            
            {/* Full-width membership - now part of carousel */}
            <Card className="relative flex-shrink-0 w-[280px] md:w-auto snap-center md:col-span-3">
              <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-24 pb-0 md:pb-8">
                <div className="text-center md:text-left md:min-w-[250px]">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    {memberships.fullWidth.name}
                  </h4>
                  <div>
                    <span className="text-base text-gray-600 block mb-1" style={{ minHeight: '1.5rem' }}>
                      {memberships.fullWidth.pricePrefix || '\u00A0'}
                    </span>
                    <span className="text-5xl font-bold text-primary-700 block">
                      {memberships.fullWidth.price}
                    </span>
                  </div>
                </div>
                <div className="flex-1 md:max-w-md">
                  <ul className="space-y-3">
                    {memberships.fullWidth.features.map((feature, i) => (
                      <li key={i} className="text-base text-gray-700 flex items-start">
                        <span className="text-primary-600 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Navigation Dots - Mobile only */}
          <div className="flex md:hidden justify-center gap-2 mt-6">
            {[...memberships.items, memberships.fullWidth].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (membershipScrollRef.current) {
                    const cardWidth = 280;
                    const gap = 32;
                    const scrollPosition = index * (cardWidth + gap);
                    membershipScrollRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
                  }
                }}
                className={`transition-all duration-300 ${
                  currentMembershipSlide === index 
                    ? 'w-8 h-3 bg-primary-600' 
                    : 'w-3 h-3 bg-gray-400 hover:bg-gray-500'
                } rounded-full`}
                aria-label={`Ga naar membership ${index + 1}`}
              />
            ))}
          </div>
        </div>
    </section>
  );
};
