import React from 'react';
import { Container, Heading, Section } from '@/components/ui';
import content from '@/data/content.json';

const { legal, site } = content;
const terms = legal.terms;

export const metadata = {
  title: terms.meta.title,
  description: terms.meta.description,
};

export default function AlgemeneVoorwaardenPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Section className="py-16 md:py-24">
        <Container>
          <Heading level={1} className="mb-8 text-center">
            {terms.title}
          </Heading>

          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-sm">
            <div className="prose prose-lg max-w-none">
              {terms.sections.map((section) => (
                <div key={section.id} className="mb-8">
                  <h2>{section.id}. {section.title}</h2>
                  {section.items.map((item, idx) => (
                    <div key={idx} className="mb-4">
                      <p>
                        <strong>• {item.number}</strong> {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              ))}

              <h2>Contact</h2>
              <p>
                Voor vragen over deze algemene voorwaarden kun je contact met ons opnemen:
              </p>
              <address className="not-italic">
                <strong>Sportloods Oost</strong><br />
                {site.address.street}<br />
                {site.address.postal} {site.address.city}<br />
                E-mail: <a href={`mailto:${site.email}`} className="text-primary-600 hover:text-primary-700">
                  {site.email}
                </a><br />
                Telefoon: <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="text-primary-600 hover:text-primary-700">
                  {site.phone}
                </a>
              </address>

              <p className="text-sm text-gray-600 mt-8">
                Laatst bijgewerkt: {terms.lastUpdated}
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
