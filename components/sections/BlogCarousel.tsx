'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui';

interface BlogPost {
  title: string;
  description: string;
  date: string;
  image: string;
  imageAlt?: string;
  content?: string;
}

interface BlogCarouselProps {
  posts: BlogPost[];
}

export const BlogCarousel: React.FC<BlogCarouselProps> = ({ posts }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isTouching, setIsTouching] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const touchStartX = React.useRef<number>(0);
  const touchEndX = React.useRef<number>(0);
  const scrollAmountRef = React.useRef<number>(0);

  const selectedPost = selectedIndex !== null ? posts[selectedIndex % posts.length] : null;
  
  // Duplicate posts for seamless loop
  const duplicatedPosts = [...posts, ...posts];

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsTouching(true);
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  // Handle touch end
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped left - scroll right
        scroll('right');
      } else {
        // Swiped right - scroll left
        scroll('left');
      }
    }
    setIsTouching(false);
  };

  // Update scroll button visibility
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Add scroll event listener and update on mount
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && typeof window !== 'undefined') {
      // Force update after a brief delay to ensure DOM is ready
      setTimeout(() => {
        updateScrollButtons();
      }, 100);
      
      container.addEventListener('scroll', updateScrollButtons);
      window.addEventListener('resize', updateScrollButtons);
      
      return () => {
        container.removeEventListener('scroll', updateScrollButtons);
        window.removeEventListener('resize', updateScrollButtons);
      };
    }
  }, []);

  // Auto scroll effect - continuous smooth scrolling (desktop only)
  React.useEffect(() => {
    if (selectedIndex === null && !isTouching && typeof window !== 'undefined') {
      // Only auto-scroll on desktop
      if (window.innerWidth < 768) return;
      
      const cardWidth = window.innerWidth < 768 ? 300 : 400;
      const gap = 24;
      const itemWidth = cardWidth + gap;
      const scrollStep = 0.5; // Pixels per frame

      const scroll = () => {
        if (!scrollContainerRef.current) return;

        scrollAmountRef.current += scrollStep;
        scrollContainerRef.current.scrollLeft = scrollAmountRef.current;

        // Reset when we've scrolled past the first set of items
        if (scrollAmountRef.current >= itemWidth * posts.length) {
          scrollAmountRef.current = 0;
          scrollContainerRef.current.scrollLeft = 0;
        }
      };

      const intervalId = setInterval(scroll, 16); // ~60fps

      return () => clearInterval(intervalId);
    }
  }, [selectedIndex, isTouching, posts.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = typeof window !== 'undefined' && window.innerWidth < 768 ? 324 : 424;
      
      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth'
        });
      } else {
        scrollContainerRef.current.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className="transition-all duration-500 ease-in-out">
      {selectedPost ? (
        /* Selected view - Image left, Content right */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-fadeIn px-6 lg:px-0" style={{ minHeight: '500px' }}>
          {/* Image - Left side */}
          <div className="animate-slideInLeft" style={{ height: '500px', maxWidth: '400px' }}>
            <button
              onClick={() => setSelectedIndex(null)}
              className="w-full h-full group cursor-pointer"
            >
              <div className="w-full h-full bg-gray-900 overflow-hidden hover:ring-4 hover:ring-primary-300 transition-all">
                <Image
                  src={selectedPost.image}
                  alt={selectedPost.imageAlt || selectedPost.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-center transition-transform group-hover:scale-105"
                />
              </div>
            </button>
          </div>

          {/* Content - Right side */}
          <div className="animate-slideInRight">
            <Badge variant="primary" className="mb-4">{selectedPost.date}</Badge>
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              {selectedPost.title}
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {selectedPost.content || selectedPost.description}
            </p>
            <div className="flex justify-center mt-8">
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
        /* Carousel view - Scrollable cards with partial 4th card visible */
        <div className="relative w-full flex items-center justify-center">
          {/* Left Arrow - Outside container */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-primary-600 rounded-full p-3 transition-all hover:scale-110 shadow-xl"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow - Outside container */}
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-primary-600 rounded-full p-3 transition-all hover:scale-110 shadow-xl"
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="overflow-x-scroll animate-fadeIn w-full carousel-scroll-container"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <style jsx>{`
              .carousel-scroll-container::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="flex gap-4 md:gap-6" style={{ width: 'max-content' }}>
              {duplicatedPosts.map((post, index) => (
                <button
                  key={`${index}-${post.title}`}
                  onClick={() => setSelectedIndex(index)}
                  className="relative group cursor-pointer overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 hover:shadow-2xl transition-all duration-300 flex-shrink-0 w-[300px] h-[400px] md:w-[400px] md:h-[500px] snap-center"
                >
                  {/* Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      fill
                      sizes="(max-width: 768px) 300px, 400px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Title and date at bottom - left aligned */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-left z-10">
                    <h3 className="text-white font-bold text-lg md:text-xl mb-2 leading-tight w-[268px] md:w-[352px]" style={{ 
                      wordBreak: 'break-word',
                      hyphens: 'auto',
                      textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                    }}>{post.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="inline-block bg-primary-600/90 backdrop-blur-sm text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
                        {post.date}
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
          </div>
        </div>
      )}
    </div>
  );
};
