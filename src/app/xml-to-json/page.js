import ConversionPage from '@/components/ConversionPage';

export const metadata = {
  title: 'Convert XML to JSON Online | XML tag Parser',
  description: 'Parse XML tags, elements, and attributes to JSON objects. Upload XML files and output structured JSON data streams.',
  keywords: 'xml to json, convert xml to json, xml parser, parse tag hierarchy',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/xml-to-json',
  }
};

const faq = [
  { q: 'How does XML parser translate tag attributes?', a: 'Tag attributes are mapped to a special `@attributes` property inside the resulting JSON object parent.' },
  { q: 'What happens to tag text values?', a: 'If a tag contains both children and text, the text value is mapped to `#text` key inside the JSON structure.' }
];

const features = [
  { title: 'DOM Parser Core', desc: 'Uses native browser DOMParser to safely parse XML nodes without external overhead.' },
  { title: 'Attribute Mapping', desc: 'Maintains attributes and namespace definitions inside nested JSON fields.' }
];

const related = [
  { name: 'JSON to XML', href: '/json-to-xml' },
  { name: 'JSON Formatter', href: '/json-formatter' }
];

export default function Page() {
  return (
    <ConversionPage
      title="XML to JSON"
      h1="XML to JSON Converter"
      intro="Transform markup elements into clean JavaScript objects. Handles parent attributes, repeating child tags, and nested trees."
      fromFormat="xml"
      toFormat="json"
      faq={faq}
      features={features}
      relatedTools={related}
    />
  );
}
