import BlogIndex from '@/components/BlogIndex';

export const metadata = {
  title: 'Developer Blog | Revoxera Technical Guides',
  description: 'Deep-dives into JSON syntax specifications, API validation guides, formatting best practices, and comparisons between XML and JSON structure layouts.',
  keywords: 'json blog, developer guides, json schema validation, api formatting, xml to json guide',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/blog',
  }
};

export default function Page() {
  return <BlogIndex />;
}
