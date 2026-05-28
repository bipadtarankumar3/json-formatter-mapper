import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CodeXml, X, Mail, Zap, Brackets } from 'lucide-react';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
  metadataBase: new URL('https://jsonformatter.revoxera.com'),
  title: {
    default: 'JSON Formatter & Mapper | The Ultimate Online JSON Tool',
    template: '%s | JSON Formatter & Mapper',
  },
  description: 'Format, minify, and map your JSON effortlessly with our premium tool. Free, fast, and secure JSON transformation for developers.',
  keywords: 'json formatter, json beautifier, json minifier, json mapper, json to yaml, online json tool, json validator',
  authors: [{ name: 'JsonFormatter' }],
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/',
  },
  openGraph: {
    title: 'JSON Formatter & Mapper - Professional Data Tools',
    description: 'The most powerful online JSON tool with a premium glassmorphic interface. Master your data structure.',
    url: 'https://jsonformatter.revoxera.com',
    siteName: 'JsonFormatter',
    locale: 'en_US',
    type: 'website',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Formatter & Mapper',
    description: 'Master your JSON data with style. The ultimate professional JSON tool.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logo.png',
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "JSON Formatter & Mapper",
  "operatingSystem": "Windows, macOS, Linux, Android, iOS",
  "applicationCategory": "DeveloperApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Professional-grade client-side JSON utility to format, minify, validate, map and convert JSON to CSV, YAML, XML, and TypeScript interfaces.",
  "featureList": [
    "JSON Formatter & Validator with syntax error highlights",
    "JSON Minifier & Compressor",
    "JSON to CSV, YAML, XML, and Excel converters",
    "JSON Tree Viewer & Editor",
    "CORS-safe API Response Tester"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://jsonformatter.revoxera.com",
  "name": "JSON Formatter & Mapper",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://jsonformatter.revoxera.com/tools?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Validate and Format JSON Online",
  "description": "A quick guide on using JSON Formatter to repair and convert your raw data streams.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Paste Raw JSON Code",
      "text": "Paste your nested data payload or log trace directly into the editor."
    },
    {
      "@type": "HowToStep",
      "name": "Auto-Repair Errors",
      "text": "The validation parser checks for missing quotation marks, trailing commas, or invalid brackets and highlights them in real-time."
    },
    {
      "@type": "HowToStep",
      "name": "Transform Formats",
      "text": "Click YAML, XML, or CSV buttons to serialize the clean structure into alternative formats."
    },
    {
      "@type": "HowToStep",
      "name": "Copy clean JSON",
      "text": "Use the Copy button or click Star to save the snippet for cross-device access."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is my proprietary JSON code uploaded to any backend?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Color, JSON, SQL, and all other Revoxera tools compile data strictly inside your local browser engine. Zero bits are transferred to remote servers."
      }
    },
    {
      "@type": "Question",
      "name": "Does the auto-repair engine fix missing quotes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The smart parser automatically wraps unquoted keys, strips trailing commas, and resolves invalid escaping to repair common syntax errors."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between minification and formatting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Formatting adds indents, line breaks, and whitespace for readability. Minification compresses the code by stripping all non-essential spacing to reduce network payloads."
      }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="canonical" href="https://jsonformatter.revoxera.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('revoxera_theme') || 'dark';
                  if (savedTheme === 'light') {
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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

        <GoogleAnalytics gaId="G-2Y0DSV87D7" />
      </body>
    </html>
  );
}
