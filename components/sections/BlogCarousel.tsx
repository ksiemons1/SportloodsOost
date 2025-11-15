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
              const scrollAmount = typeof window !== 'undefined' && window.innerWidth < 768 ? 324 : 524;
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
      const scrollAmount = typeof window !== 'undefined' && window.innerWidth < 768 ? 324 : 424; // mobile: 300+24, desktop: 400+24
      
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-fadeIn px-6 lg:px-0" style={{ minHeight: '500px' }}>
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
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-primary-600 rounded-full p-3 transition-all hover:scale-110 shadow-xl"
            aria-label="Previous"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow - Outside container */}
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-primary-600 rounded-full p-3 transition-all hover:scale-110 shadow-xl"
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
            className="overflow-x-auto animate-fadeIn touch-pan-y w-full snap-x snap-mandatory carousel-scroll-container"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <style jsx>{`
              @media (min-width: 768px) {
                .carousel-scroll-container {
                  width: 1248px !important;
                  max-width: 1248px;
                  min-width: 1248px;
                  margin: 0 auto;
                }
              }
            `}</style>
            <style jsx>{`
              .carousel-scroll-container::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="flex gap-4 md:gap-6 px-[calc(50vw-150px)] md:px-0" style={{ width: 'max-content' }}>
              {posts.map((post, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className="relative group cursor-pointer overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 hover:shadow-2xl transition-all duration-300 flex-shrink-0 w-[300px] h-[400px] md:w-[400px] md:h-[500px] snap-center"
                >
                  {/* Image */}
                  <div className="absolute inset-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Title and date at bottom - left aligned */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-left z-10">
                    <h3 className="text-white font-bold text-lg md:text-xl mb-2 leading-tight w-[268px] md:w-[352px]" style={{ 
                      wordBreak: 'break-word',
                      hyphens: 'auto',
                      textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                    }}>{post.title}</h3>
                    <span className="inline-block bg-primary-600/90 backdrop-blur-sm text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
                      {post.date}
                    </span>
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
