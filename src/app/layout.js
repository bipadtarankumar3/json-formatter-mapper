import './globals.css';
import Header from '@/components/Header';
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

        <footer className="py-12 md:py-24 border-t border-white/10" role="contentinfo">
          <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-12 text-center md:text-left max-w-[1600px]">
            <div className="max-w-md">
              <div className="flex items-center gap-3 font-black text-2xl tracking-tighter text-white mb-6 justify-center md:justify-start">
                <Brackets className="text-primary animate-pulse-glow" size={24} aria-hidden="true" />
                <span>JSON<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">MASTER</span></span>
              </div>
              <p className="text-muted leading-relaxed text-sm md:text-base">The world's most advanced online JSON tool. Built for speed, optimized for structure, and designed for the modern developer. Your privacy is our priority—all processing happens locally.</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl hover:bg-primary/40 hover:text-primary transition-all hover:-translate-y-1" title="Follow us on X" aria-label="X"><X size={22} /></a>
                <a href="#" className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl hover:bg-primary/40 hover:text-primary transition-all hover:-translate-y-1" title="Contact us via Email" aria-label="Email"><Mail size={22} /></a>
                <a href="https://github.com" className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl hover:bg-primary/40 hover:text-primary transition-all hover:-translate-y-1" title="View source on GitHub" aria-label="GitHub"><CodeXml size={22} /></a>
              </div>
              <p className="text-muted text-sm" suppressHydrationWarning>&copy; {new Date().getFullYear()} JsonMaster. Built with passion for developers.</p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
