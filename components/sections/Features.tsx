import React from 'react';
import Image from 'next/image';
import { Card, Heading, Container } from '../ui';

interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
  image?: string;
  imageAlt?: string;
}

interface FeaturesProps {
  title: string;
  subtitle?: string;
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
}

/*
 * Features Component
 * Grid of feature cards with icons or images
 * Responsive grid layout
 */
export const Features: React.FC<FeaturesProps> = ({
  title,
  subtitle,
  items,
  columns = 3,
}) => {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="text-center mb-12">
          {subtitle && (
            <p className="text-primary-600 font-semibold mb-2 uppercase tracking-wide">
              {subtitle}
            </p>
          )}
          <Heading level={2}>{title}</Heading>
        </div>

        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
          {items.map((item, index) => (
            <Card key={index} hover className="text-center">
              {item.image && (
                <div className="mb-4 h-48 overflow-hidden rounded-lg relative">
                  <Image
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}
              {item.icon && !item.image && (
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-3xl">{getIconEmoji(item.icon)}</span>
                  </div>
                </div>
              )}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

// Helper function to map icon names to emojis
function getIconEmoji(icon: string): string {
  const icons: Record<string, string> = {
    certificate: '🎓',
    users: '👥',
    building: '🏗️',
    heart: '❤️',
    dumbbell: '🏋️',
    trophy: '🏆',
    fire: '🔥',
    star: '⭐',
  };
  return icons[icon] || '✨';
}
