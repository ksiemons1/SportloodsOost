import React from 'react';
import { Button, Heading, Container } from '../ui';

interface CTASectionProps {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref?: string;
  note?: string;
  background?: 'primary' | 'accent' | 'dark';
}

/**
 * CTA Section Component
 * Call-to-action section with button
 */
export const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  buttonLabel,
  buttonHref = '/contact',
  note,
  background = 'primary',
}) => {
  const backgrounds = {
    primary: 'bg-gradient-to-br from-primary-700 to-primary-600',
    accent: 'bg-gradient-to-br from-accent-600 to-accent-700',
    dark: 'bg-gray-900',
  };

  return (
    <section className={`py-20 md:py-28 ${backgrounds[background]} text-white relative overflow-hidden`}>
      {/* Modern Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/2 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>
      
      <Container>
        <div className="max-w-3xl mx-auto text-center relative">
          <Heading level={2} className="text-white mb-6">
            {title}
          </Heading>
          <p className="text-xl md:text-2xl text-primary-50 mb-10 leading-relaxed font-light">
            {description}
          </p>
          <Button href={buttonHref} variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-primary-800 hover:text-white font-semibold">
            {buttonLabel}
          </Button>
          {note && (
            <p className="mt-6 text-sm text-primary-100 italic">{note}</p>
          )}
        </div>
      </Container>
    </section>
  );
};
