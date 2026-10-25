import ServicesClient from './services-client';

export const metadata = {
  title: 'Services & Ecosystem Platforms — Revoxera Developer Suite',
  description: 'Explore the Revoxera suite of free online developer utilities: HTML Color Codes, SQL Beast Formatter, CaseConverter, JSON Formatter & Mapper, and AI Prompt Generator.',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/services',
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
