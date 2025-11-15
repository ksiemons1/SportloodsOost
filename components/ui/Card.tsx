import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

/**
 * Reusable Card component
 * Used for content sections, feature boxes, etc.
 */
export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false 
}) => {
  const hoverEffect = hover ? 'hover:bg-primary-50' : '';
  
  return (
    <div className={`bg-white border border-gray-200 p-6 ${hoverEffect} ${className}`}>
      {children}
    </div>
  );
};
