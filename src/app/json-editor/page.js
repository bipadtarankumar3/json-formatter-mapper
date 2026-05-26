import EditorPage from '@/components/EditorPage';

export const metadata = {
  title: 'JSON Editor | Online Interactive Tree & Text JSON Editor',
  description: 'Edit JSON online using raw text or an interactive visual tree mode. Synchronize edits, add or delete nodes, and format values in real-time.',
  keywords: 'json editor, edit json online, interactive json editor, visual json tree editor',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/json-editor',
  }
};

export default function Page() {
  return <EditorPage />;
}
