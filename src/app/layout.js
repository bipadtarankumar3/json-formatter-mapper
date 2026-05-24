import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CodeXml, X, Mail, Zap, Brackets } from 'lucide-react';

export const metadata = {
  title: 'JSON Formatter & Mapper | The Ultimate Online JSON Tool',
  description: 'Format, minify, and map your JSON effortlessly with our premium tool. Free, fast, and secure JSON transformation for developers.',
  keywords: 'json formatter, json beautifier, json minifier, json mapper, json to yaml, online json tool, json validator',
  authors: [{ name: 'JsonMaster' }],
  openGraph: {
    title: 'JSON Formatter & Mapper - Professional Data Tools',
    description: 'The most powerful online JSON tool with a premium glassmorphic interface. Master your data structure.',
    url: 'https://jsonformatter.vercel.app',
    siteName: 'JsonMaster',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter & Mapper',
    description: 'Master your JSON data with style. The ultimate professional JSON tool.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "JSON Formatter & Mapper",
  "operatingSystem": "All",
  "applicationCategory": "UtilitiesApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Professional-grade JSON formatting and mapping tool with a premium glassmorphic interface.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "850"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>
        <div className="bg-blob blob-3"></div>
        
        <Header />

        <main className="main-content" id="main-content">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}
