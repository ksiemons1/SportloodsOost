import React from 'react';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Reusable Heading component
 * Ensures consistent typography across the site
 */
export const Heading: React.FC<HeadingProps> = ({ 
  level = 2, 
  children, 
  className = '',
  as
}) => {
  const Tag = as || (`h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6');
  
  const styles = {
    1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
    2: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    3: 'text-2xl md:text-3xl lg:text-4xl font-bold',
    4: 'text-xl md:text-2xl lg:text-3xl font-semibold',
    5: 'text-lg md:text-xl lg:text-2xl font-semibold',
    6: 'text-base md:text-lg lg:text-xl font-semibold',
  };
  
  return (
    <Tag className={`${styles[level]} text-gray-900 ${className}`}>
      {children}
    </Tag>
  );
};
