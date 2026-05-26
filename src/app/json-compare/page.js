import DiffPage from '@/components/DiffPage';

export const metadata = {
  title: 'JSON Compare | Online Side-by-Side JSON Diff Tool',
  description: 'Compare two JSON objects side-by-side. Highlight added, removed, or modified values, and ignore formatting discrepancies automatically.',
  keywords: 'json compare, compare json online, json difference checker, online json diff',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/json-compare',
  }
};

export default function Page() {
  return <DiffPage mode="compare" />;
}
