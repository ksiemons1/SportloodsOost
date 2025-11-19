'use client';

import React from 'react';
import { Container, Heading, Section } from '../ui';

interface TimeRange {
  start: string;
  end: string;
}

interface DaySchedule {
  day: string;
  ranges: TimeRange[];
}

interface OpeningTimesSectionProps {
  hours: {
    description: string;
    schedule: DaySchedule[];
    note?: string | string[];
  };
}

export const OpeningTimesSection: React.FC<OpeningTimesSectionProps> = ({ hours }) => {
  return (
    <Section background="gray" id="openingstijden">
      <Container>
        <div className="text-center mb-12">
          <Heading level={2}>
            Openingstijden
          </Heading>
          <p className="text-xl text-gray-700 leading-relaxed mt-6 max-w-3xl mx-auto">
            {hours.description}
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {/* Opening Hours */}
          <div>
            <div className="divide-y divide-gray-200">
              {hours.schedule.map((day, index) => {
                const now = new Date();
                const currentDay = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'][now.getDay()];
                const currentTime = now.getHours() * 60 + now.getMinutes();
                const isCurrentDay = day.day === currentDay;
                
                return (
                  <div key={index} className={`py-6 flex flex-row justify-between items-start gap-3 px-4 transition-colors ${isCurrentDay ? 'bg-primary-50' : ''}`}>
                    <span className={`font-semibold min-w-[100px] md:min-w-[140px] text-lg ${isCurrentDay ? 'text-primary-700' : 'text-gray-900'}`}>{day.day}</span>
                    <div className="flex flex-col gap-2 text-right">
                      {day.ranges.map((range, rangeIndex) => {
                        const [startHour, startMin] = range.start.split(':').map(Number);
                        const [endHour, endMin] = range.end.split(':').map(Number);
                        const startTime = startHour * 60 + startMin;
                        const endTime = endHour * 60 + endMin;
                        const isCurrentTimeRange = isCurrentDay && currentTime >= startTime && currentTime <= endTime;
                        
                        return (
                          <span
                            key={rangeIndex}
                            className={`transition-all tabular-nums ${isCurrentTimeRange ? 'text-primary-700 font-semibold scale-105 inline-block' : 'text-gray-700'}`}
                          >
                            {range.start} - {range.end}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            {hours.note && (
              <div className="text-gray-600 text-center mt-8 space-y-4">
                {Array.isArray(hours.note) ? (
                  hours.note.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p>{hours.note}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};
