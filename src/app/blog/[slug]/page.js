import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/blog-data';
import { ArrowLeft, Clock, Calendar, BookOpen, Share2 } from 'lucide-react';

export async function generateStaticParams() {
  return BLOG_POSTS.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) {
    return {
      title: 'Article Not Found | Revoxera',
      description: 'The requested technical guide does not exist.'
    };
  }
  return {
    title: `${post.title} | Revoxera Technical Publication`,
    description: post.excerpt,
    alternates: {
      canonical: `https://jsonformatter.revoxera.com/blog/${slug}`,
    }
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Generate Table of Contents by scanning h2 tags in string
  const h2Matches = [...post.content.matchAll(/<h2>(.*?)<\/h2>/g)];
  const tableOfContents = h2Matches.map((m, i) => {
    const text = m[1];
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return { text, id };
  });

  // Inject IDs to H2 headings dynamically for anchors
  let processedContent = post.content;
  tableOfContents.forEach(item => {
    processedContent = processedContent.replace(
      `<h2>${item.text}</h2>`,
      `<h2 id="${item.id}" class="text-xl md:text-2xl font-black text-white mt-10 mb-4 uppercase tracking-tight font-mono">${item.text}</h2>`
    );
  });

  // Find related articles (same category or shared tags)
  const relatedPosts = BLOG_POSTS.filter(p => 
    p.slug !== post.slug && 
    (p.category === post.category || p.tags.some(t => post.tags.includes(t)))
  ).slice(0, 2);

  return (
    <div className="min-h-screen cyber-grid pb-20 relative overflow-hidden">
      <div className="scanline" />

      <div className="container mx-auto px-4 md:px-6 animate-fade-in max-w-[1200px] relative z-10 pt-12">
        {/* Back navigation */}
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-primary hover:text-white transition-colors uppercase group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Journal
          </Link>
        </div>

        {/* Article Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 items-start">
          
          {/* Main Article column */}
          <article className="glass-panel rounded-[40px] p-6 md:p-12 border border-white/5 shadow-2xl relative bg-[#05080e]/60">
            <header className="border-b border-white/10 pb-8 mb-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <span className="text-primary">{post.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight">
                {post.title}
              </h1>
              <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">
                {post.excerpt}
              </p>
            </header>

            {/* Content body with styled overrides */}
            <div 
              className="text-sm md:text-base text-slate-300 leading-relaxed font-light space-y-6 markdown-body select-text"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
          </article>

          {/* Sidebar (TOC & Related Posts) */}
          <aside className="space-y-8 lg:sticky lg:top-28">
            
            {/* TOC */}
            {tableOfContents.length > 0 && (
              <div className="glass-panel rounded-3xl p-6 border border-white/5 bg-black/20">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <BookOpen size={12} className="text-primary" /> Table of Contents
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-500 font-medium">
                  {tableOfContents.map((item, idx) => (
                    <li key={idx}>
                      <a 
                        href={`#${item.id}`} 
                        className="hover:text-primary transition-colors block leading-snug"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                  Related Guides
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map(rel => (
                    <Link 
                      key={rel.slug}
                      href={`/blog/${rel.slug}`}
                      className="block glass-panel rounded-2xl p-5 border border-white/5 hover:border-primary/20 transition-all hover:translate-y-[-2px] bg-black/10 group"
                    >
                      <span className="text-[8px] font-black text-primary uppercase tracking-wider block mb-1">{rel.category}</span>
                      <h4 className="text-xs font-bold text-white uppercase group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-1">
                        {rel.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 line-clamp-2 font-light">
                        {rel.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
