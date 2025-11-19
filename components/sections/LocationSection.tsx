'use client';

import React from 'react';
import { Container, Heading, Section } from '../ui';

interface LocationSectionProps {
  title: string;
  description: string;
  embedUrl: string;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ title, description, embedUrl }) => {
  return (
    <Section background="gray" id="location">
      <Container>
        <Heading level={2} className="text-center mb-4">
          {title}
        </Heading>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {description}
        </p>

        {/* Google Maps Embed */}
        <div className="w-full h-[400px] md:h-[500px] border border-gray-200 overflow-hidden">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sportloods Oost Locatie"
          />
        </div>
      </Container>
    </Section>
  );
};
