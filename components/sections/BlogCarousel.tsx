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
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const selectedPost = selectedIndex !== null ? posts[selectedIndex] : null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420; // card width (400) + gap (20)
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(
            scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth,
            scrollPosition + scrollAmount
          );
      
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollContainerRef.current 
    ? scrollPosition < scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
    : false;

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
        <div className="relative">
          {/* Navigation Arrows */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110"
              aria-label="Previous"
            >
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110"
              aria-label="Next"
            >
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="overflow-x-hidden animate-fadeIn mx-auto"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              maxWidth: 'calc(1200px + 200px)', // 3 full cards (400*3) + gaps (24*2) + half of 4th card (200)
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="flex gap-6" style={{ width: 'max-content', paddingRight: '200px' }}>
              {posts.map((post, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className="relative group cursor-pointer overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 hover:shadow-2xl transition-all duration-300 flex-shrink-0"
                  style={{ width: '400px', height: '500px' }}
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
        </div>
      )}
    </div>
  );
};
