import ConversionPage from '@/components/ConversionPage';

export const metadata = {
  title: 'Convert JSON to XML Online | Nest XML Serializer',
  description: 'Serialize JSON schemas and structures to XML. Customize parent elements and generate standard, validated XML markup easily.',
  keywords: 'json to xml, convert json to xml, xml generator online, json serialization',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/json-to-xml',
  }
};

const faq = [
  { q: 'How are arrays handled in XML?', a: 'Array items are converted to repeating tags named after the array property parent.' },
  { q: 'Can I define XML attributes in JSON?', a: 'Yes. By using the special `@attributes` key, you can map inner properties directly into XML tag attributes.' }
];

const features = [
  { title: 'Attribute Support', desc: 'Specify tag attributes using @attributes key conventions in your JSON.' },
  { title: 'XML Escaping', desc: 'Characters like &, <, and > are automatically escaped to prevent syntax breakage.' }
];

const related = [
  { name: 'XML to JSON', href: '/xml-to-json' },
  { name: 'JSON Formatter', href: '/json-formatter' }
];

export default function Page() {
  return (
    <ConversionPage
      title="JSON to XML"
      h1="JSON to XML Converter"
      intro="Translate key-value pairs into markup tags. Reconstruct nesting arrays and format XML nodes dynamically."
      fromFormat="json"
      toFormat="xml"
      faq={faq}
      features={features}
      relatedTools={related}
    />
  );
}
