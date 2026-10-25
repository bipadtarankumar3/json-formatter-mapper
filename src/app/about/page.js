import AboutClient from './about-client';

export const metadata = {
  title: 'About JSON Master — The Story Behind the Tool | Revoxera',
  description: 'Learn about JSON Master — a free, privacy-focused data transformation and tree visualization tool built by the Revoxera team. Format, inspect, and map JSON without ever sending data to a server.',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
