import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar, Footer } from '@/components/layout';
import content from '@/data/content.json';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: content.site.name,
  description: content.site.description,
  keywords: ['sportschool Nijmegen', 'functional training Nijmegen', 'krachttraining Nijmegen', 'CrossFit Nijmegen', 'personal training Nijmegen', 'gewichtheffen Nijmegen', 'fitness Nijmegen', 'sportloods', 'gym Nijmegen Oost', 'trainingsschool Nijmegen'],
  authors: [{ name: content.site.name }],
  metadataBase: new URL('https://www.sportloodsoost.nl'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: content.site.name,
    description: content.site.description,
    type: 'website',
    locale: 'nl_NL',
    url: 'https://www.sportloodsoost.nl',
    siteName: content.site.name,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${content.site.name} - Functional Training & Strength Training`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: content.site.name,
    description: content.site.description,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'GymOrHealthClub',
    name: content.site.name,
    description: content.site.description,
    url: 'https://www.sportloodsoost.nl',
    logo: 'https://www.sportloodsoost.nl/logo.png',
    image: 'https://www.sportloodsoost.nl/og-image.jpg',
    telephone: content.site.phone,
    email: content.site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: content.site.address.street,
      addressLocality: content.site.address.city,
      postalCode: content.site.address.postal,
      addressCountry: 'NL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '51.8426',
      longitude: '5.8389',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    sameAs: [
      content.site.social.facebook,
      content.site.social.instagram,
      content.site.social.linkedin,
    ],
    priceRange: '€€',
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Functional Training',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Strength Training',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Personal Training',
      },
    ],
  };

  return (
    <html lang="nl" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded focus:shadow-lg"
        >
          Spring naar hoofdinhoud
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
