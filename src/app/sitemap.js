import { BLOG_POSTS } from '@/lib/blog-data';

export default function sitemap() {
  const baseUrl = 'https://jsonformatter.revoxera.com';

  const staticPages = [
    '',
    '/json-formatter',
    '/json-pretty-print',
    '/json-validator',
    '/json-viewer',
    '/json-minify',
    '/json-compare',
    '/json-diff',
    '/json-editor',
    '/json-escape-unescape',
    '/json-to-csv',
    '/json-to-xml',
    '/json-to-yaml',
    '/xml-to-json',
    '/csv-to-json',
    '/yaml-to-json',
    '/api-response-viewer',
    '/tools',
    '/blog',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions',
    '/disclaimer'
  ];

  const sitemapEntries = staticPages.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const blogEntries = BLOG_POSTS.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...sitemapEntries, ...blogEntries];
}
