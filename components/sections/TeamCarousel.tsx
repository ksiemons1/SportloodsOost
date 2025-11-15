'use client';

import React, { useState, useRef } from 'react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  certifications: string[];
}

interface TeamCarouselProps {
  members: TeamMember[];
}

export const TeamCarousel: React.FC<TeamCarouselProps> = ({ members }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const selectedMember = selectedIndex !== null ? members[selectedIndex] : null;

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(diff) > threshold && scrollContainerRef.current) {
      if (diff > 0) {
        // Swiped left - scroll right
        scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      } else {
        // Swiped right - scroll left
        scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="transition-all duration-500 ease-in-out">
      {selectedMember ? (
        /* Selected view - Portrait left, Text right */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start animate-fadeIn px-4 lg:px-0" style={{ minHeight: '400px' }}>
          {/* Portrait - Left side */}
          <div className="animate-slideInLeft mx-auto w-full" style={{ height: '400px', maxWidth: '400px' }}>
            <button
              onClick={() => setSelectedIndex(null)}
              className="w-full h-full group cursor-pointer"
            >
              <div className="w-full h-full bg-gray-900 overflow-hidden hover:ring-4 hover:ring-primary-300 transition-all">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover object-center transition-transform group-hover:scale-105 grayscale"
                />
              </div>
            </button>
          </div>

          {/* Text - Right side */}
          <div className="animate-slideInRight">
            <h3 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">
              {selectedMember.name}
            </h3>
            <p className="text-primary-600 font-semibold text-lg lg:text-xl mb-6 lg:mb-8">
              {selectedMember.role}
            </p>
            <p className="text-gray-700 mb-6 lg:mb-8 leading-relaxed text-base lg:text-lg">
              {selectedMember.bio}
            </p>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 lg:mb-4 text-lg lg:text-xl">
                Kwalificaties:
              </h4>
              <ul className="space-y-2 lg:space-y-3">
                {selectedMember.certifications.map((cert, i) => (
                  <li key={i} className="text-gray-700 flex items-start">
                    <span className="text-primary-600 mr-2 lg:mr-3 text-lg lg:text-xl">✓</span>
                    <span className="text-base lg:text-lg">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center mt-6 lg:mt-8">
              <button
                onClick={() => setSelectedIndex(null)}
                className="bg-primary-600 rounded-full p-3 w-12 h-12 flex items-center justify-center hover:bg-primary-700 transition-all shadow-lg"
                aria-label="Sluiten"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Default view - Modern card design like example */
        <div 
          ref={scrollContainerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="flex overflow-x-auto gap-4 md:gap-8 justify-start md:justify-center animate-fadeIn snap-x snap-mandatory touch-pan-y md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollPaddingLeft: 'calc(50vw - 140px)', scrollPaddingRight: 'calc(50vw - 140px)' }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {members.map((member, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className="relative group cursor-pointer overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 hover:shadow-2xl transition-all duration-300 flex-shrink-0 snap-center w-[280px] h-[400px] md:w-[400px] md:h-[500px]"
            >
              {/* Portrait with grayscale */}
              <div className="absolute inset-0">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center grayscale group-hover:scale-105 transition-transform duration-500"
                />
                {/* Light overlay effect like example */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-black/40 mix-blend-overlay" />
              </div>
              
              {/* Name and role at bottom - left aligned */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-8 text-left">
                <h3 className="text-white font-bold text-2xl lg:text-4xl mb-1 lg:mb-2">{member.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-primary-600/90 backdrop-blur-sm text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium">
                    {member.role}
                  </span>
                  {/* Tap indicator - visible only on mobile */}
                  <div className="md:hidden bg-white/90 backdrop-blur-sm rounded-full p-1.5 h-[28px] w-[28px] flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
