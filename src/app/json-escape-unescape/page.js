import EscapePage from '@/components/EscapePage';

export const metadata = {
  title: 'JSON Escape / Unescape | Online String Parser',
  description: 'Escape or unescape special characters in JSON strings. Strip backslashes, quotes, line breaks, and resolve raw code formats instantly.',
  keywords: 'json escape, json unescape, escape string, remove backslashes, format json string',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/json-escape-unescape',
  }
};

export default function Page() {
  return <EscapePage />;
}
