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
  const [showArrows, setShowArrows] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [clickStartX, setClickStartX] = useState(0);
  const [clickStartY, setClickStartY] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const selectedPost = selectedIndex !== null ? posts[selectedIndex % posts.length] : null;
  
  // Don't duplicate posts - show original posts only
  const displayPosts = posts;

  // Update scroll button visibility and check if arrows needed
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      
      // Only show arrows if content is wider than container
      setShowArrows(scrollWidth > clientWidth + 10);
      
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Update current slide for dots
      const cardWidth = window.innerWidth < 768 ? 300 : 400;
      const gap = window.innerWidth < 768 ? 16 : 24;
      const slideIndex = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentSlide(slideIndex % posts.length);
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

  // Auto scroll effect removed - no auto-scrolling on any device
  React.useEffect(() => {
    // Auto-scroll disabled
  }, [selectedIndex, posts.length]);

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
        <div className="animate-fadeIn px-6 lg:px-0">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12" style={{ minHeight: '500px' }}>
              {/* Image - Left side (5 columns to accommodate 400px image) */}
              <div className="lg:col-span-5 animate-slideInLeft flex justify-center lg:justify-start">
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="group cursor-pointer flex-shrink-0"
                  style={{ width: '400px', height: '500px', maxWidth: '100%' }}
                >
                  <div className="relative w-full h-full overflow-hidden hover:ring-4 hover:ring-primary-300 transition-all">
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

              {/* Content - Right side (7 columns) */}
              <div className="lg:col-span-7 animate-slideInRight">
                <p className="text-primary-600 font-semibold text-sm lg:text-base mb-4">{selectedPost.date}</p>
                <h3 className="text-4xl font-bold text-gray-900 mb-6">
                  {selectedPost.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {selectedPost.content || selectedPost.description}
                </p>
              </div>
            </div>
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
          {/* Left Arrow - Only show if arrows are needed */}
          {showArrows && (
            <button
              onClick={() => scroll('left')}
              className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-primary-600 rounded-full p-3 transition-all hover:scale-110 shadow-xl"
              aria-label="Previous"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Right Arrow - Only show if arrows are needed */}
          {showArrows && (
            <button
              onClick={() => scroll('right')}
              className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white text-primary-600 rounded-full p-3 transition-all hover:scale-110 shadow-xl"
              aria-label="Next"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="carousel-scroll-container flex overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 px-[calc(50vw-150px)] md:px-0"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <style jsx>{`
              .carousel-scroll-container::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="flex gap-4 md:gap-6 md:justify-center">
              {displayPosts.map((post, index) => (
                <button
                  key={`${index}-${post.title}`}
                  onMouseDown={(e) => {
                    setClickStartX(e.clientX);
                    setClickStartY(e.clientY);
                  }}
                  onTouchStart={(e) => {
                    setClickStartX(e.touches[0].clientX);
                    setClickStartY(e.touches[0].clientY);
                  }}
                  onClick={(e) => {
                    // Check if this was a drag/scroll gesture
                    const moveThreshold = 10;
                    const currentX = 'clientX' in e ? e.clientX : clickStartX;
                    const currentY = 'clientY' in e ? e.clientY : clickStartY;
                    const moveDistance = Math.sqrt(
                      Math.pow(currentX - clickStartX, 2) + 
                      Math.pow(currentY - clickStartY, 2)
                    );
                    
                    // Only open if it wasn't a scroll/drag
                    if (moveDistance < moveThreshold) {
                      setSelectedIndex(index);
                    }
                  }}
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
