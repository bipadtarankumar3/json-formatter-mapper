import ConversionPage from '@/components/ConversionPage';

export const metadata = {
  title: 'Convert JSON to YAML Online | Config Serializer',
  description: 'Convert JSON objects to YAML format online. Format YAML files with clean spaces, remove braces, and export configurations.',
  keywords: 'json to yaml, convert json to yaml, online yaml generator, kubernetes config',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/json-to-yaml',
  }
};

const faq = [
  { q: 'Is YAML indentation standardized?', a: 'Yes. YAML uses standard spaces (usually 2) to denote nesting boundaries instead of XML tags or JSON brackets.' }
];

const features = [
  { title: 'Standard Compliance', desc: 'Outputs YAML 1.2 specifications with no reference anchors.' },
  { title: 'Comment Stripping', desc: 'Ensures structured configurations export with clean alignments.' }
];

const related = [
  { name: 'YAML to JSON', href: '/yaml-to-json' },
  { name: 'JSON Formatter', href: '/json-formatter' }
];

export default function Page() {
  return (
    <ConversionPage
      title="JSON to YAML"
      h1="JSON to YAML Converter"
      intro="Translate key-value records into clean space-indented configurations. Great for Docker, Kubernetes, and server settings."
      fromFormat="json"
      toFormat="yaml"
      faq={faq}
      features={features}
      relatedTools={related}
    />
  );
}
