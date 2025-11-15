import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  className?: string;
}

/**
 * Reusable Badge component
 * Used for labels, tags, status indicators
 */
export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'primary',
  className = '' 
}) => {
  const variants = {
    primary: 'bg-primary-600 text-white',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-accent-100 text-accent-800',
    warning: 'bg-primary-100 text-primary-800',
  };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
