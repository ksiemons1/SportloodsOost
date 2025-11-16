import React from 'react';
import { Container, Heading, Section } from '@/components/ui';
import content from '@/data/content.json';

const { legal, site } = content;
const privacy = legal.privacy;

export const metadata = {
  title: privacy.meta.title,
  description: privacy.meta.description,
};

export default function PrivacyverklaringPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Section className="py-16 md:py-24">
        <Container>
          <Heading level={1} className="mb-8 text-center">
            {privacy.title}
          </Heading>

          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-sm">
            <div className="prose prose-lg max-w-none">
              <p className="text-sm text-gray-600 mb-6">
                Deze privacyverklaring is op {privacy.lastUpdated} voor het laatst gewijzigd.
              </p>

              <p className="lead mb-8">
                {privacy.intro}
              </p>

              {privacy.sections.map((section) => (
                <div key={section.id} className="mb-8">
                  <h2>{section.id}) {section.title}</h2>
                  <p>{section.content}</p>

                  {section.subsections && section.subsections.map((subsection, idx) => (
                    <div key={idx} className="ml-4 mb-4">
                      <h3 className="text-lg font-semibold mb-2">• {subsection.title}</h3>
                      <p>{subsection.content}</p>
                      {subsection.measures && (
                        <ul>
                          {subsection.measures.map((measure, mIdx) => (
                            <li key={mIdx}>{measure}</li>
                          ))}
                        </ul>
                      )}
                      {subsection.requirements && (
                        <ul>
                          {subsection.requirements.map((req, rIdx) => (
                            <li key={rIdx}>{req}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  {section.dataCollected && (
                    <div className="ml-4 mb-4">
                      <p className="font-semibold mb-2">{section.dataCollected.registration}</p>
                      <p className="mb-2">{section.dataCollected.medical}</p>
                      <p>{section.dataCollected.membership}</p>
                    </div>
                  )}

                  {section.purposes && (
                    <div className="ml-4 mb-4">
                      <p className="font-semibold mb-2">Wij gebruiken de persoonsgegevens van onze leden voor de volgende doelen indien noodzakelijk:</p>
                      <ul>
                        {section.purposes.map((purpose, pIdx) => (
                          <li key={pIdx}>{purpose}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.retention && (
                    <p className="ml-4 mb-4">{section.retention}</p>
                  )}

                  {section.thirdParties && (
                    <div className="ml-4 mb-4">
                      <h3 className="text-lg font-semibold mb-2">Samenwerking met derden</h3>
                      <p style={{ whiteSpace: 'pre-line' }}>{section.thirdParties}</p>
                    </div>
                  )}
                </div>
              ))}

              <h2>{privacy.contact.title}</h2>
              <p>{privacy.contact.content}</p>

              <address className="not-italic mt-8">
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
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
