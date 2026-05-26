'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-data';
import { ArrowRight, Clock, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = ['All', 'Guides', 'Comparisons', 'Troubleshooting', 'Advanced', 'Design'];

export default function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = BLOG_POSTS.filter(post => 
    activeCategory === 'All' || post.category === activeCategory
  );

  return (
    <div className="min-h-screen cyber-grid pb-20 relative overflow-hidden">
      <div className="scanline" />

      <div className="container mx-auto px-4 md:px-6 animate-fade-in max-w-[1000px] relative z-10 pt-12">
        <section className="text-center mb-12">
          <div className="inline-block mb-4 px-5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
            <span className="text-[9px] font-black tracking-[0.3em] text-primary uppercase flex items-center gap-2 justify-center">
              <Sparkles size={10} /> Technical Publication Core
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white uppercase">
            DEVELOPER <span className="text-primary drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]">JOURNAL</span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 font-light max-w-xl mx-auto leading-relaxed">
            Discover guides, syntax troubleshooting references, data structure comparisons, and API design patterns from Revoxera Engineering.
          </p>
        </section>

        <section className="glass-panel rounded-[24px] border border-white/10 p-4 flex flex-wrap gap-2 justify-center mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                activeCategory === cat ? 'bg-primary text-black' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              suppressHydrationWarning={true}
            >
              {cat}
            </button>
          ))}
        </section>

        <section className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="py-20 text-center text-slate-500 font-mono text-xs">
              No entries found under this section.
            </div>
          ) : (
            filteredPosts.map((post, idx) => (
              <motion.article 
                key={post.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group glass-panel rounded-[30px] border border-white/5 hover:border-primary/20 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer"
              >
                <div className="flex-1 space-y-3 min-w-0">
                  <div className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">
                    <span className="text-primary">{post.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar size={10} /> {post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-lg md:text-xl font-bold text-white uppercase group-hover:text-primary transition-colors cursor-pointer">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex gap-2 pt-2">
                    {post.tags.map(t => (
                      <span key={t} className="text-[8px] font-black border border-white/5 bg-white/[0.02] px-2 py-0.5 rounded-full text-slate-500 uppercase font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-slate-400 group-hover:text-primary group-hover:border-primary/30 transition-all shrink-0"
                >
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.article>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
