import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar, Footer } from '@/components/layout';
import content from '@/data/content.json';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: content.site.name,
  description: content.site.description,
  keywords: ['functional training', 'strength training', 'Nijmegen', 'gym', 'personal training', 'Olympic weightlifting'],
  authors: [{ name: content.site.name }],
  openGraph: {
    title: content.site.name,
    description: content.site.description,
    type: 'website',
    locale: 'nl_NL',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={inter.variable}>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
