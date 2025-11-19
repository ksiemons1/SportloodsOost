'use client';

import React, { useState } from 'react';
import { Container, Heading, Section, Card, Button } from '../ui';

interface ContactField {
  label: string;
  placeholder: string;
  options?: string[];
}

interface ContactFormSectionProps {
  form: {
    title: string;
    button: string;
    fields: {
      name: ContactField;
      email: ContactField;
      phone: ContactField;
      subject: ContactField;
      message: ContactField;
    };
  };
}

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({ form }) => {
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
        setFormMessage('Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.');
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus('error');
        setFormMessage(result.error || 'Er is iets misgegaan. Probeer het later opnieuw.');
      }
    } catch (error) {
      setFormStatus('error');
      setFormMessage('Er is een fout opgetreden. Probeer het later opnieuw of bel ons direct.');
    }
  };

  return (
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
                {form.fields.subject.options?.map((option, index) => (
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
  );
};
