import ApiResponseViewer from '@/components/ApiResponseViewer';

export const metadata = {
  title: 'API Response Viewer | Online API Tester & Parser',
  description: 'Enter an API endpoint to fetch and beautify JSON payloads. Configure request headers, authorization tokens, and inspect response parameters.',
  keywords: 'api response viewer, test api online, api payload beautifier, http response viewer',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/api-response-viewer',
  }
};

export default function Page() {
  return <ApiResponseViewer />;
}
