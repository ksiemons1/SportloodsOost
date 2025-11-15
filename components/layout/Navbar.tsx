'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui';
import content from '@/data/content.json';

/**
 * Navbar Component
 * Responsive navigation with mobile hamburger menu
 * Implements smooth scrolling for anchor links
 * Content loaded from JSON
 */
export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { site, nav } = content;

  // Handle smooth scroll to anchor
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      
      // Close mobile menu first
      setMobileMenuOpen(false);
      
      // Wait for menu to close, then scroll
      setTimeout(() => {
        const targetId = href.slice(1);
        const element = document.getElementById(targetId);
        
        if (element && typeof window !== 'undefined') {
          const offset = 80; // Account for fixed navbar height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleAnchorClick(e, '#home')}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="text-2xl font-bold text-primary-700">
              {site.name}
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className="px-4 py-2 text-gray-700 hover:text-primary-600 hover:font-bold transition-all duration-200 font-medium cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Button href={nav.cta.href} variant="primary" size="md">
              {nav.cta.label}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-primary-600 focus:outline-none"
            aria-label={content.common.buttons.menu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {nav.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className="px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200 font-medium cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-2">
                <Button href={nav.cta.href} variant="primary" size="md" className="w-full">
                  {nav.cta.label}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
