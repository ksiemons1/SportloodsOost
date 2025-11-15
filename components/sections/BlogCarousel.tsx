'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui';

interface BlogPost {
  title: string;
  description: string;
  date: string;
  image: string;
  content?: string;
}

interface BlogCarouselProps {
  posts: BlogPost[];
}

export const BlogCarousel: React.FC<BlogCarouselProps> = ({ posts }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const touchStartX = React.useRef<number>(0);
  const touchEndX = React.useRef<number>(0);

  const selectedPost = selectedIndex !== null ? posts[selectedIndex] : null;

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
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
    if (container) {
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

  // Auto scroll effect
  React.useEffect(() => {
    if (selectedIndex === null) {
      // Start auto scroll after initial delay
      const startDelay = setTimeout(() => {
        autoScrollIntervalRef.current = setInterval(() => {
          if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            
            // If we can't scroll right anymore, scroll back to start
            if (scrollLeft >= scrollWidth - clientWidth - 10) {
              scrollContainerRef.current.scrollTo({
                left: 0,
                behavior: 'smooth'
              });
            } else {
              // Otherwise scroll right
              const scrollAmount = typeof window !== 'undefined' && window.innerWidth < 768 ? 324 : 424;
              scrollContainerRef.current.scrollTo({
                left: scrollLeft + scrollAmount,
                behavior: 'smooth'
              });
            }
          }
        }, 4000); // Auto scroll every 4 seconds
      }, 1000); // Initial delay of 1 second

      return () => {
        clearTimeout(startDelay);
        if (autoScrollIntervalRef.current) {
          clearInterval(autoScrollIntervalRef.current);
        }
      };
    }
  }, [selectedIndex]);

  const scroll = (direction: 'left' | 'right') => {
    // Clear auto scroll when manually scrolling
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }

    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const scrollAmount = typeof window !== 'undefined' && window.innerWidth < 768 ? 324 : 424; // 300px + 24px gap (mobile) or 400px + 24px gap (desktop)
      
      if (direction === 'left') {
        // If at the start, jump to the end
        if (scrollLeft <= 10) {
          scrollContainerRef.current.scrollTo({
            left: scrollWidth - clientWidth,
            behavior: 'smooth'
          });
        } else {
          scrollContainerRef.current.scrollTo({
            left: Math.max(0, scrollLeft - scrollAmount),
            behavior: 'smooth'
          });
        }
      } else {
        // If at the end, jump to the start
        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          scrollContainerRef.current.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          scrollContainerRef.current.scrollTo({
            left: scrollLeft + scrollAmount,
            behavior: 'smooth'
          });
        }
      }
    }

    // Restart auto scroll after manual interaction
    setTimeout(() => {
      if (selectedIndex === null && autoScrollIntervalRef.current === null) {
        autoScrollIntervalRef.current = setInterval(() => {
          if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            
            if (scrollLeft >= scrollWidth - clientWidth - 10) {
              scrollContainerRef.current.scrollTo({
                left: 0,
                behavior: 'smooth'
              });
            } else {
              const scrollAmount = typeof window !== 'undefined' && window.innerWidth < 768 ? 324 : 424;
              scrollContainerRef.current.scrollTo({
                left: scrollLeft + scrollAmount,
                behavior: 'smooth'
              });
            }
          }
        }, 4000);
      }
    }, 8000); // Wait 8 seconds before restarting auto scroll
  };

  return (
    <div className="transition-all duration-500 ease-in-out">
      {selectedPost ? (
        /* Selected view - Image left, Content right */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-fadeIn" style={{ minHeight: '500px' }}>
          {/* Image - Left side */}
          <div className="animate-slideInLeft" style={{ height: '500px', maxWidth: '400px' }}>
            <button
              onClick={() => setSelectedIndex(null)}
              className="w-full h-full group cursor-pointer"
            >
              <div className="w-full h-full bg-gray-900 overflow-hidden hover:ring-4 hover:ring-primary-300 transition-all">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover object-center transition-transform group-hover:scale-105"
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
            <button
              onClick={() => setSelectedIndex(null)}
              className="mt-8 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              ← Terug naar overzicht
            </button>
          </div>
        </div>
      ) : (
        /* Carousel view - Scrollable cards with partial 4th card visible */
        <div className="flex items-center justify-center gap-3 md:gap-6 w-full px-2 md:px-0">
          {/* Left Arrow - Hidden on mobile */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex bg-primary-600 hover:bg-primary-700 text-white rounded-full p-3 transition-all hover:scale-110 shadow-lg flex-shrink-0"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="overflow-hidden animate-fadeIn w-full md:w-auto touch-pan-y"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              width: '100%',
              maxWidth: '1248px',
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="flex gap-4 md:gap-6" style={{ width: 'max-content' }}>
              {posts.map((post, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className="relative group cursor-pointer overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 hover:shadow-2xl transition-all duration-300 flex-shrink-0 w-[300px] h-[400px] md:w-[400px] md:h-[500px]"
                >
                  {/* Image */}
                  <div className="absolute inset-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  
                  {/* Title and date at bottom - left aligned */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-left">
                    <h3 className="text-white font-bold text-3xl mb-3 leading-tight">{post.title}</h3>
                    <span className="inline-block bg-primary-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                      {post.date}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Arrow - Always visible */}
          <button
            onClick={() => scroll('right')}
            className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-3 transition-all hover:scale-110 shadow-lg flex-shrink-0"
            aria-label="Next"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
