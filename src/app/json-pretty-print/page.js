import FormatterPage from '@/components/FormatterPage';

export const metadata = {
  title: 'JSON Pretty Print | Premium Spacing & Styling Tool',
  description: 'Style your raw JavaScript Objects and JSON data structures. Edit indentation spacing, copy to clipboard, or download directly.',
  keywords: 'json pretty print, pretty printer, style json online, format json',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/json-pretty-print',
  }
};

export default function Page() {
  return <FormatterPage pageType="pretty-print" />;
}
