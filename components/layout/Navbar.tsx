'use client';

import React, { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const { site, nav } = content;

  // Handle scroll to change navbar color after USPs section
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const uspsSection = document.getElementById('about');
        if (uspsSection) {
          const uspsSectionBottom = uspsSection.offsetTop + uspsSection.offsetHeight;
          setIsScrolled(window.scrollY >= uspsSectionBottom);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Small delay to ensure DOM is ready
    setTimeout(handleScroll, 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scroll to anchor
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      // Check if we're on the home page
      const isHomePage = window.location.pathname === '/';
      
      if (!isHomePage) {
        // On other pages, navigate to home with anchor
        window.location.href = '/' + href;
        return;
      }
      
      // On home page, do smooth scroll
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
    <nav className={`shadow-md sticky top-0 z-50 transition-colors duration-500 ${isScrolled ? 'bg-primary-900' : 'bg-white'}`} aria-label="Hoofdnavigatie">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center h-20">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleAnchorClick(e, '#home')}
            className="flex items-center space-x-2 cursor-pointer"
            aria-label="Terug naar home"
          >
            <div className={`text-2xl font-bold transition-colors duration-500 ${isScrolled ? 'text-white' : 'text-primary-700'}`}>
              {site.name}
            </div>
          </a>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className={`px-4 py-2 transition-colors duration-200 font-medium cursor-pointer ${
                  isScrolled 
                    ? 'text-white hover:text-white' 
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          
          {/* CTA Button - Right */}
          <div className="hidden lg:block">
            <a
              href={nav.cta.href}
              onClick={(e) => handleAnchorClick(e, nav.cta.href)}
              className="inline-block"
            >
              <Button 
                variant="primary" 
                size="md"
                className={`transition-colors duration-500 ${
                  isScrolled 
                    ? '!bg-white !text-primary-900 hover:!bg-gray-100' 
                    : 'hover:!bg-primary-700'
                }`}
              >
                {nav.cta.label}
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 focus:outline-none ml-auto transition-colors duration-500 ${
              isScrolled 
                ? 'text-white hover:text-white' 
                : 'text-gray-600 hover:text-primary-600'
            }`}
            aria-label={mobileMenuOpen ? "Menu sluiten" : "Menu openen"}
            aria-expanded={mobileMenuOpen}
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
          <div className={`lg:hidden py-4 border-t transition-colors duration-500 ${
            isScrolled ? 'border-primary-700' : 'border-gray-200'
          }`}>
            <div className="flex flex-col space-y-2">
              {nav.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className={`px-4 py-3 rounded-lg transition-colors duration-200 font-medium cursor-pointer ${
                    isScrolled
                      ? 'text-white hover:text-white hover:bg-primary-800'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
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
