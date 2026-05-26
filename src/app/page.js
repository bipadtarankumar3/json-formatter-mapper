import FormatterPage from '@/components/FormatterPage';

export const metadata = {
  title: 'JSON Formatter & Mapper | The Ultimate Online JSON Tool',
  description: 'Format, minify, and map your JSON effortlessly with our premium tool. Free, fast, and secure JSON transformation for developers.',
  keywords: 'json formatter, json beautifier, json minifier, json mapper, json to yaml, online json tool, json validator',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/',
  }
};

export default function Page() {
  return <FormatterPage pageType="formatter" />;
}
