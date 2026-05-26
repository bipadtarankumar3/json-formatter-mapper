import DiffPage from '@/components/DiffPage';

export const metadata = {
  title: 'JSON Diff Tool | Visual JSON Line Comparison',
  description: 'Identify structural and syntax variations between two JSON files. Supports split side-by-side or unified inline visual modes.',
  keywords: 'json diff, json compare, online diff checker, code difference highlights',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/json-diff',
  }
};

export default function Page() {
  return <DiffPage mode="diff" />;
}
