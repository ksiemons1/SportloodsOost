'use client';

import React, { useState } from 'react';

interface MissionStoryProps {
  mission: {
    title: string;
    description: string | string[];
  };
  story: {
    title: string;
    content: string[];
  };
}

export const MissionStorySection: React.FC<MissionStoryProps> = ({ mission, story }) => {
  const [activeTab, setActiveTab] = useState<'mission' | 'story'>('mission');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-12">
      {/* Left side - Clickable titles */}
      <div className="lg:col-span-1">
        <div className="space-y-4">
          <button
            onClick={() => setActiveTab('mission')}
            className={`text-left w-full text-3xl md:text-4xl lg:text-5xl font-bold transition-colors duration-300 ${
              activeTab === 'mission'
                ? 'text-primary-600'
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            {mission.title}
          </button>
          
          <button
            onClick={() => setActiveTab('story')}
            className={`text-left w-full text-3xl md:text-4xl lg:text-5xl font-bold transition-colors duration-300 ${
              activeTab === 'story'
                ? 'text-primary-600'
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            {story.title}
          </button>
        </div>
      </div>

      {/* Right side - Content */}
      <div className="lg:col-span-2">
        <div className="relative transition-all duration-500 ease-in-out">
          {activeTab === 'mission' && (
            <div className="animate-fadeIn space-y-6">
              {Array.isArray(mission.description) ? (
                mission.description.map((paragraph, index) => (
                  <p key={index} className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  {mission.description}
                </p>
              )}
            </div>
          )}
          
          {activeTab === 'story' && (
            <div className="animate-fadeIn space-y-6">
              {story.content.map((paragraph, index) => (
                <p key={index} className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
