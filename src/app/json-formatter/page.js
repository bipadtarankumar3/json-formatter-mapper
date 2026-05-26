import FormatterPage from '@/components/FormatterPage';

export const metadata = {
  title: 'JSON Formatter - Online JSON Beautifier & Pretty Printer',
  description: 'Format, validate, and beautify your JSON data with our free online tool. Adjust indentation settings, view as interactive tree, and extract elements instantly.',
  keywords: 'json formatter, json beautifier, pretty print json, format json online',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/json-formatter',
  }
};

export default function Page() {
  return <FormatterPage pageType="formatter" />;
}
