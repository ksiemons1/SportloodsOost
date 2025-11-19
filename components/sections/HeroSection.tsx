'use client';

import React from 'react';
import { Container, Button } from '../ui';

interface HeroSectionProps {
  title: string;
  description: string;
  image: string;
  cta: {
    primary: string;
    secondary: string;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title, description, image, cta }) => {
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-primary-900/90 from-0% via-primary-900/90 via-50% to-primary-900 to-100%" />

      <Container>
        <div className="relative z-30 py-32 md:py-40 lg:py-48">
          <div className="max-w-5xl">
            <h1 className="text-white mb-8 text-5xl md:text-7xl lg:text-8xl font-bold leading-tight whitespace-pre-line">
              {title}
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-3xl">
              {description}
            </p>

            <div className="flex flex-row gap-3 md:gap-4">
              <Button
                href="#tarieven"
                variant="primary"
                size="lg"
                className="text-sm md:text-lg px-4 md:px-8 py-3 md:py-4 flex-1"
              >
                {cta.primary}
              </Button>

              <Button
                href="#location"
                variant="secondary"
                size="lg"
                className="text-sm md:text-lg px-4 md:px-8 py-3 md:py-4 bg-white text-primary-600 flex-1"
              >
                {cta.secondary}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
