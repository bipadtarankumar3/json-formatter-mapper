import MinifyPage from '@/components/MinifyPage';

export const metadata = {
  title: 'JSON Minifier | Online JSON Compressor & White-Space Stripper',
  description: 'Compress and minify your JSON data. Remove comments, tabs, and carriage returns to optimize network transfer sizes.',
  keywords: 'json minifier, compress json, minify json online, json size reducer',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/json-minify',
  }
};

export default function Page() {
  return <MinifyPage />;
}
