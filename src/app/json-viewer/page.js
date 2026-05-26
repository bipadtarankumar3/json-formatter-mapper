import ViewerPage from '@/components/ViewerPage';

export const metadata = {
  title: 'JSON Viewer | Online Interactive Tree & Path Inspector',
  description: 'Inspect JSON data in a dynamic tree view. Filter nodes, query paths with JSONPath, copy node paths, and analyze structure instantly.',
  keywords: 'json viewer, json tree viewer, inspect json, jsonpath evaluator, parse json',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/json-viewer',
  }
};

export default function Page() {
  return <ViewerPage />;
}
