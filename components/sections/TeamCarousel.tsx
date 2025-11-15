'use client';

import React, { useState } from 'react';

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

  const selectedMember = selectedIndex !== null ? members[selectedIndex] : null;

  return (
    <div className="transition-all duration-500 ease-in-out">
      {selectedMember ? (
        /* Selected view - Portrait left, Text right */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-fadeIn" style={{ minHeight: '500px' }}>
          {/* Portrait - Left side */}
          <div className="animate-slideInLeft" style={{ height: '500px', maxWidth: '400px' }}>
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
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {selectedMember.name}
            </h3>
            <p className="text-primary-600 font-semibold text-xl mb-8">
              {selectedMember.role}
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              {selectedMember.bio}
            </p>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-xl">
                Kwalificaties:
              </h4>
              <ul className="space-y-3">
                {selectedMember.certifications.map((cert, i) => (
                  <li key={i} className="text-gray-700 flex items-start">
                    <span className="text-primary-600 mr-3 text-xl">✓</span>
                    <span className="text-lg">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setSelectedIndex(null)}
              className="mt-8 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
            >
              ← Terug naar overzicht
            </button>
          </div>
        </div>
      ) : (
        /* Default view - Modern card design like example */
        <div className="flex flex-col md:flex-row justify-center gap-8 animate-fadeIn">
          {members.map((member, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className="relative group cursor-pointer overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 hover:shadow-2xl transition-all duration-300"
              style={{ width: '100%', maxWidth: '400px', height: '500px' }}
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
              <div className="absolute bottom-0 left-0 right-0 p-8 text-left">
                <h3 className="text-white font-bold text-4xl mb-2">{member.name}</h3>
                <span className="inline-block bg-primary-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                  {member.role}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
