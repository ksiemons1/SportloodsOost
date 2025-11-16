'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Container, Heading } from '../ui';

interface Program {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  suitable: string;
}

interface OfferingsSectionProps {
  programs: Program[];
}

export const OfferingsSection: React.FC<OfferingsSectionProps> = ({ programs }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll spy effect for desktop
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const detectionPoint = scrollY + 250; // Fixed offset from top
      
      let newActiveIndex = 0;
      let minDistance = Infinity;
      
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const elementTop = rect.top + scrollY;
          const distance = Math.abs(elementTop - detectionPoint);
          
          // Find the section closest to our detection point
          if (elementTop <= detectionPoint && distance < minDistance) {
            minDistance = distance;
            newActiveIndex = index;
          }
        }
      });

      setActiveIndex(newActiveIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check after mount
    const timer = setTimeout(handleScroll, 100);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [isMobile]);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="relative">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <Container>
          <div className="grid grid-cols-12 gap-12">
            {/* Sticky Sidebar */}
            <div className="col-span-3">
              <div className="sticky top-32">
                <nav className="space-y-0">
                  {programs.map((program, index) => (
                    <button
                      key={program.id}
                      onClick={() => scrollToSection(index)}
                      className={`w-full text-left py-6 border-l-4 transition-colors ${
                        activeIndex === index
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="pl-6 flex items-center gap-6">
                        <div className={`text-6xl font-bold leading-none ${
                          activeIndex === index ? 'text-primary-600' : 'text-gray-400'
                        }`}>
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className={`text-base font-semibold ${
                          activeIndex === index ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                          {program.title}
                        </div>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="col-span-9">
              <div className="space-y-24">
                {programs.map((program, index) => (
                  <div
                    key={program.id}
                    ref={(el) => {
                      sectionRefs.current[index] = el;
                    }}
                    className="min-h-[400px]"
                  >
                    <div className="mb-6">
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">
                        {program.title}
                      </h3>
                      <p className="text-primary-600 font-semibold text-lg">
                        {program.tagline}
                      </p>
                    </div>

                    <div className="py-6">
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {program.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Wat je kunt verwachten:
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {program.features.map((feature, i) => (
                            <li key={i} className="text-base text-gray-700 flex items-start">
                              <span className="text-primary-600 mr-2">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4">
                        <p className="text-sm text-gray-600 italic">
                          {program.suitable}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile Layout - Expandable */}
      <div className="block lg:hidden">
        <Container>
          <div className="space-y-4">
            {programs.map((program, index) => (
              <div key={program.id} className="border border-gray-200">
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full text-left p-6 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="text-2xl font-bold text-primary-600">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {program.title}
                        </h3>
                      </div>
                    </div>
                    <svg
                      className={`w-6 h-6 text-gray-400 transition-transform flex-shrink-0 ml-4 ${
                        expandedIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {expandedIndex === index && (
                  <div className="px-6 pb-6 border-t border-gray-200">
                    <div className="pt-6">
                      <p className="text-primary-600 font-semibold text-base mb-4">
                        {program.tagline}
                      </p>
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {program.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Wat je kunt verwachten:
                        </h4>
                        <ul className="space-y-2">
                          {program.features.map((feature, i) => (
                            <li key={i} className="text-sm text-gray-700 flex items-start">
                              <span className="text-primary-600 mr-2">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 italic">
                          {program.suitable}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};
