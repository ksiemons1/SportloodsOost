'use client';

import { CTASection, OfferingsSection, TeamCarousel, MissionStorySection, BlogCarousel, TestimonialCarousel } from '@/components/sections';
import { Container, Section, Heading, Card, Badge, Button } from '@/components/ui';
import content from '@/data/content.json';
import { useState, useEffect, useRef } from 'react';

/**
 * Home Page - Modern Single Page Layout with Colorful Sections
 * Inspired by contemporary web design with vibrant, section-specific colors
 */

// Counter animation hook
const useCountUp = (end: number, duration: number = 2500, isVisible: boolean) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    setHasAnimated(true);
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for smooth animation (ease out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(end * easeOut);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [end, duration, isVisible, hasAnimated]);

  return count;
};

// StatCard component with counter animation
const StatCard: React.FC<{ 
  value: { number: string; description: string }; 
  image: string; 
  isVisible: boolean 
}> = ({ value, image, isVisible }) => {
  const targetNumber = parseInt(value.number);
  const animatedCount = useCountUp(targetNumber, 2000, isVisible);

  return (
    <div className="relative h-64 md:h-[32rem] overflow-hidden group">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gray-900/70" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-8 text-white">
        <div className="flex items-center gap-2">
          <span className="text-7xl md:text-8xl lg:text-9xl font-bold leading-none">
            {animatedCount}
          </span>
          <div className="flex flex-col items-center justify-center">
            <span className="text-4xl md:text-5xl font-bold leading-none">+</span>
            <div className="text-xs md:text-sm uppercase tracking-widest font-semibold mt-1">
              JAAR
            </div>
          </div>
        </div>
        <div className="text-sm md:text-base uppercase tracking-wide font-medium max-w-xs mt-6">
          {value.description}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { hero, mission, features, cta } = content.home;
  const { story, team, usps } = content.about;
  const { intro, programs } = content.offerings;
  const { memberships } = content.tarieven;
  const { title: testimonialsTitle, items: testimonials } = content.testimonials;
  const { hours } = content.openingstijden;
  const { featured } = content.blog;
  const { methods, form } = content.contact;

  // Intersection Observer for stats section
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Contact form state
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  // Handle form submission
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    setFormMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus('success');
        setFormMessage('Bedankt! Je bericht is verzonden. We nemen zo spoedig mogelijk contact met je op.');
        (e.target as HTMLFormElement).reset();
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormStatus('idle');
          setFormMessage('');
        }, 5000);
      } else {
        setFormStatus('error');
        setFormMessage(result.error || 'Er is iets misgegaan. Probeer het later opnieuw.');
      }
    } catch (error) {
      setFormStatus('error');
      setFormMessage('Er is een fout opgetreden. Probeer het later opnieuw of bel ons direct.');
    }
  };

  useEffect(() => {
    const currentRef = statsRef.current;
    
    if (typeof window === 'undefined') return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <>
      {/* Hero Section - Full Screen with Image Overlay */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${hero.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-primary-900/90 from-0% via-primary-900/90 via-50% to-primary-900 to-100%" />

        <Container>
          <div className="relative z-30 py-32 md:py-40 lg:py-48">
            <div className="max-w-5xl">
              <h1 className="text-white mb-8 text-5xl md:text-7xl lg:text-8xl font-bold leading-tight whitespace-pre-line">
                {hero.title}
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-3xl">
                {hero.description}
              </p>

              <div className="flex flex-row gap-3 md:gap-4">
                <Button
                  href="#tarieven"
                  variant="primary"
                  size="lg"
                  className="font-bold text-sm md:text-lg px-4 md:px-8 py-3 md:py-4 hover:bg-white hover:text-primary-600 transition-colors flex-1"
                >
                  {hero.cta.primary}
                </Button>

                <Button
                  href="#location"
                  variant="secondary"
                  size="lg"
                  className="font-bold text-sm md:text-lg px-4 md:px-8 py-3 md:py-4 bg-white text-primary-600 hover:bg-primary-600 hover:text-white transition-colors flex-1"
                >
                  {hero.cta.secondary}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Grid - Full Width */}
      <div className="w-full" id="about" ref={statsRef}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {mission.values.map((value, index) => {
            const images = [
              'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
              'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
              'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop'
            ];
            
            return (
              <StatCard 
                key={index} 
                value={value} 
                image={images[index]} 
                isVisible={isStatsVisible}
              />
            );
          })}
        </div>
      </div>

      {/* Mission & Story - Side by Side */}
      <Section background="white" className="!py-8">
        <Container>
          <div className="my-6 md:my-24">
            <MissionStorySection mission={mission} story={story} />
          </div>
        </Container>
      </Section>

      {/* Team */}
      <section className="py-8 md:py-16 pb-32 bg-white">
        <div className="container mx-auto px-4 md:px-6 mb-12">
          <div className="text-center">
            <Heading level={2}>
              {team.title}
            </Heading>
            <p className="text-xl text-gray-700 leading-relaxed mt-6 max-w-3xl mx-auto">
              {team.intro}
            </p>
          </div>
        </div>
        <TeamCarousel members={team.members} />
      </section>

      {/* Offerings Section */}
      <Section background="gray" id="offerings">
        <div className="text-center mb-16">
          <Container>
            <Heading level={2}>Ons Trainingsaanbod</Heading>
            <p className="text-xl text-gray-700 leading-relaxed mt-6 max-w-3xl mx-auto">
              {intro.text}
            </p>
          </Container>
        </div>
        
        <OfferingsSection programs={programs} />
      </Section>

      {/* Testimonials Section */}
      <TestimonialCarousel title={testimonialsTitle} testimonials={testimonials} />

      {/* Pricing Section */}
      <section id="tarieven" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 mb-12">
          <Heading level={2} className="text-center">
            Tarieven
          </Heading>
        </div>
          
        {/* Memberships */}
        <div className="mb-16">
          <div className="flex md:grid md:grid-cols-3 gap-8 max-w-5xl md:mx-auto overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 px-[calc(50vw-140px)] md:px-0 pt-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
              {memberships.items.map((membership, index) => (
                <Card
                  key={index}
                  className={`relative flex-shrink-0 w-[280px] md:w-auto snap-center ${membership.popular ? 'border-2 border-primary-600 bg-primary-50' : ''}`}
                >
                  {membership.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge variant="primary" className="bg-primary-600 text-white px-3 py-1">Populair</Badge>
                    </div>
                  )}
                  <div className="text-center mb-8 relative">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">
                      {membership.name}
                    </h4>
                    <div className="mt-6">
                      <span className="text-base text-gray-600 block mb-1" style={{ minHeight: '1.5rem' }}>
                        {membership.pricePrefix || '\u00A0'}
                      </span>
                      <span className="text-5xl font-bold text-primary-700 block">
                        {membership.price}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-6">
                    {membership.features.map((feature, i) => (
                      <li key={i} className="text-base text-gray-700 flex items-start">
                        <span className="text-primary-600 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
              
              {/* Full-width membership - now part of carousel */}
              <Card className="relative flex-shrink-0 w-[280px] md:w-auto snap-center md:col-span-3">
                <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-24 pb-0 md:pb-8">
                  <div className="text-center md:text-left md:min-w-[250px]">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">
                      {memberships.fullWidth.name}
                    </h4>
                    <div>
                      <span className="text-base text-gray-600 block mb-1" style={{ minHeight: '1.5rem' }}>
                        {memberships.fullWidth.pricePrefix || '\u00A0'}
                      </span>
                      <span className="text-5xl font-bold text-primary-700 block">
                        {memberships.fullWidth.price}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 md:max-w-md">
                    <ul className="space-y-3">
                      {memberships.fullWidth.features.map((feature, i) => (
                        <li key={i} className="text-base text-gray-700 flex items-start">
                          <span className="text-primary-600 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
      </section>

      {/* Opening Times Section */}
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

      {/* Final CTA Section */}
      <CTASection
        title={cta.title}
        description={cta.description}
        buttonLabel={cta.button}
        buttonHref="#contact"
        note={cta.note}
        background="primary"
      />

      {/* Blog Section */}
      <section id="blog" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 mb-12">
          <Heading level={2} className="text-center mb-6">
            {featured.title}
          </Heading>

          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            Blijf op de hoogte van de laatste nieuwtjes, trainingstips en updates uit de loods.
          </p>
        </div>
        
        <BlogCarousel posts={featured.items} />
      </section>

      {/* Location Section */}
      <Section background="gray" id="location">
        <Container>
          <Heading level={2} className="text-center mb-4">
            {content.location.map.title}
          </Heading>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {content.location.map.description}
          </p>

          {/* Google Maps Embed */}
          <div className="w-full h-[400px] md:h-[500px] border border-gray-200 overflow-hidden">
            <iframe
              src={content.location.map.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sportloods Oost Locatie"
            />
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section background="white" id="contact">
        <Container>
          <Heading level={2} className="text-center mb-12">
            {form.title}
          </Heading>

          <Card className="max-w-2xl mx-auto">
            <form className="space-y-6" onSubmit={handleContactSubmit}>
              {formMessage && (
                <div className={`p-4 rounded-lg ${
                  formStatus === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {formMessage}
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {form.fields.name.label}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder={form.fields.name.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {form.fields.email.label}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder={form.fields.email.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {form.fields.phone.label}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder={form.fields.phone.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  {form.fields.subject.label}
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {form.fields.subject.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {form.fields.message.label}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder={form.fields.message.placeholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                className="w-full"
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? 'Verzenden...' : form.button}
              </Button>
            </form>
          </Card>
        </Container>
      </Section>
    </>
  );
}

// Helper function to map icon names to emojis
function getIconEmoji(icon: string): string {
  const icons: Record<string, string> = {
    certificate: '🎓',
    users: '👥',
    building: '🏗️',
    heart: '❤️',
  };
  return icons[icon] || '✨';
}
