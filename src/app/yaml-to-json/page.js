import ConversionPage from '@/components/ConversionPage';

export const metadata = {
  title: 'Convert YAML to JSON Online | Configuration Parser',
  description: 'Parse YAML code blocks to JSON. Upload Kubernetes or docker-compose yml files and export structured JSON documents.',
  keywords: 'yaml to json, convert yaml to json, yml to json parser, docker config converter',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/yaml-to-json',
  }
};

const faq = [
  { q: 'Can this tool parse complex YAML anchors?', a: 'Yes. It uses standard js-yaml engines on the client side, resolving YAML references, anchors, and block strings safely.' }
];

const features = [
  { title: 'Anchor Resolution', desc: 'Auto-extends YAML reference pointers and anchors into explicit nested object properties.' },
  { title: 'Multi-line Strings', desc: 'Parses block styles (using | and > characters) into plain strings.' }
];

const related = [
  { name: 'JSON to YAML', href: '/json-to-yaml' },
  { name: 'JSON Formatter', href: '/json-formatter' }
];

export default function Page() {
  return (
    <ConversionPage
      title="YAML to JSON"
      h1="YAML to JSON Converter"
      intro="Parse indentation files and map their properties back to structured V8 JavaScript objects instantly."
      fromFormat="yaml"
      toFormat="json"
      faq={faq}
      features={features}
      relatedTools={related}
    />
  );
}
