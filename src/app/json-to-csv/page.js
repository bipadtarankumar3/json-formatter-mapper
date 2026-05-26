import ConversionPage from '@/components/ConversionPage';

export const metadata = {
  title: 'Convert JSON to CSV Online | Free Table Generator',
  description: 'Convert JSON array payloads to spreadsheet CSV files. Paste or upload your JSON block to export comma-separated tables instantly.',
  keywords: 'json to csv, convert json to csv, json table converter, csv exporter',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/json-to-csv',
  }
};

const faq = [
  { q: 'How is JSON mapped to CSV?', a: 'Objects in the JSON array are converted to rows, and their property keys are mapped as the header column cells. Nested structures are flattened into string cells.' }
];

const features = [
  { title: 'Dynamic Header Parsing', desc: 'Scan all array items dynamically to extract column keys, even for sparse configurations.' },
  { title: 'Automatic Escaping', desc: 'Cell values containing commas or quotes are wrapped in standard CSV escaping.' }
];

const related = [
  { name: 'CSV to JSON', href: '/csv-to-json' },
  { name: 'JSON Formatter', href: '/json-formatter' }
];

export default function Page() {
  return (
    <ConversionPage
      title="JSON to CSV"
      h1="JSON to CSV Converter"
      intro="Flatten structured data arrays into clean spreadsheet rows. Paste your JSON array or object to generate CSV values."
      fromFormat="json"
      toFormat="csv"
      faq={faq}
      features={features}
      relatedTools={related}
    />
  );
}
