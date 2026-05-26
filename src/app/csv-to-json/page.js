import ConversionPage from '@/components/ConversionPage';

export const metadata = {
  title: 'Convert CSV to JSON Online | Spreadsheet Row Parser',
  description: 'Convert CSV spreadsheets to structured JSON arrays. Automatically cast numbers, booleans, and nested elements into key-value datasets.',
  keywords: 'csv to json, convert csv to json, csv parser online, spreadsheet to json',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/csv-to-json',
  }
};

const faq = [
  { q: 'Can this tool parse quotes in CSV fields?', a: 'Yes. The CSV parser handles standard quotes, double-quoted delimiters, and line breaks inside columns.' },
  { q: 'Are numbers converted automatically?', a: 'Yes, the parser checks and casts cell inputs into numbers, true/false booleans, or null elements automatically.' }
];

const features = [
  { title: 'Header Row Mapping', desc: 'Maps the first row of your CSV data into keys for the resulting JSON objects.' },
  { title: 'Type Auto-Casting', desc: 'Detects numbers, booleans, and null entries and casts them to respective types.' }
];

const related = [
  { name: 'JSON to CSV', href: '/json-to-csv' },
  { name: 'JSON Formatter', href: '/json-formatter' }
];

export default function Page() {
  return (
    <ConversionPage
      title="CSV to JSON"
      h1="CSV to JSON Converter"
      intro="Parse table rows and values into nested arrays of JSON objects. Adjust delimiters and save outputs instantly."
      fromFormat="csv"
      toFormat="json"
      faq={faq}
      features={features}
      relatedTools={related}
    />
  );
}
