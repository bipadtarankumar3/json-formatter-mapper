'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, Terminal, FileText, ArrowRight, X, Command, Sun, Moon, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BLOG_POSTS } from '@/lib/blog-data';

const TOOLS_INDEX = [
  { name: 'JSON Formatter', desc: 'Beautify JSON, configure indentation', href: '/json-formatter', category: 'Formatter' },
  { name: 'JSON Pretty Print', desc: 'Interactive styling and spacing', href: '/json-pretty-print', category: 'Formatter' },
  { name: 'JSON Validator', desc: 'Identify error line and columns', href: '/json-validator', category: 'Validation' },
  { name: 'JSON Tree Viewer', desc: 'Interactive node expansion & filtering', href: '/json-viewer', category: 'Inspection' },
  { name: 'JSON Minifier', desc: 'Compress whitespace and payloads', href: '/json-minify', category: 'Compression' },
  { name: 'JSON Compare', desc: 'Compare side-by-side JSON', href: '/json-compare', category: 'Comparison' },
  { name: 'JSON Diff Tool', desc: 'Inline visual diff and highlights', href: '/json-diff', category: 'Comparison' },
  { name: 'JSON Editor', desc: 'Sync raw editor and interactive nodes', href: '/json-editor', category: 'Editor' },
  { name: 'JSON Escape / Unescape', desc: 'Process quote and slash characters', href: '/json-escape-unescape', category: 'Processing' },
  { name: 'JSON to CSV', desc: 'Parse objects to spreadsheet table', href: '/json-to-csv', category: 'Conversion' },
  { name: 'JSON to XML', desc: 'Serialize structured nodes to tag layout', href: '/json-to-xml', category: 'Conversion' },
  { name: 'JSON to YAML', desc: 'Export config values to indentation files', href: '/json-to-yaml', category: 'Conversion' },
  { name: 'XML to JSON', desc: 'Parse XML tags to Javascript objects', href: '/xml-to-json', category: 'Conversion' },
  { name: 'CSV to JSON', desc: 'Parse spreadsheet CSV grid to JSON objects', href: '/csv-to-json', category: 'Conversion' },
  { name: 'YAML to JSON', desc: 'Parse YAML configurations to JSON structure', href: '/yaml-to-json', category: 'Conversion' },
  { name: 'API Response Viewer', desc: 'Mock requests and explore API details', href: '/api-response-viewer', category: 'API Utilities' },
  { name: 'Developer Hub', desc: 'View all developer utility platforms', href: '/tools', category: 'General' },
];

export default function CommandPalette({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Combine items for searching
  const filteredTools = TOOLS_INDEX.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBlogs = BLOG_POSTS.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  ).map(b => ({
    name: b.title,
    desc: b.excerpt,
    href: `/blog/${b.slug}`,
    category: 'Blog Article',
    isBlog: true,
  }));

  const allItems = [...filteredTools, ...filteredBlogs];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(allItems.length, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + allItems.length) % Math.max(allItems.length, 1));
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter') {
        if (allItems[selectedIndex]) {
          router.push(allItems[selectedIndex].href);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, allItems, onClose, router]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4">
        {/* Overlay backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Palette Box */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="w-full max-w-2xl bg-[#090d16]/90 border border-white/10 rounded-[30px] shadow-[0_0_50px_rgba(56,189,248,0.25)] overflow-hidden relative z-10 glass-panel"
        >
          {/* Header Input */}
          <div className="p-6 border-b border-white/10 flex items-center gap-4 relative">
            <Search className="text-primary w-5 h-5" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search tools, guides, or type system commands..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedIndex(0);
              }}
              className="bg-transparent text-white placeholder-slate-500 outline-none text-base w-full font-sans"
            />
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-500 border border-white/10 px-2 py-1 rounded-md bg-white/5 uppercase">
                ESC
              </span>
              <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Results Area */}
          <div className="max-h-[350px] overflow-y-auto custom-scrollbar p-4 space-y-2">
            {allItems.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-sm">
                <Cpu size={32} className="mx-auto mb-3 text-slate-600 animate-pulse" />
                No matching results found for "<span className="text-white font-mono">{searchQuery}</span>"
              </div>
            ) : (
              allItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={item.href + item.name}
                    onClick={() => {
                      router.push(item.href);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-primary/10 border-primary/30 text-white pl-6'
                        : 'bg-white/[0.02] border-transparent text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-primary/20 text-primary' : 'bg-white/5 text-slate-400'
                      }`}>
                        {item.isBlog ? <FileText size={16} /> : <Terminal size={16} />}
                      </div>
                      <div className="min-w-0">
                        <span className={`block font-semibold text-sm ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {item.name}
                        </span>
                        <span className="block text-xs text-slate-400 truncate max-w-sm md:max-w-md">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`text-[9px] font-black tracking-widest uppercase border px-2 py-0.5 rounded-full ${
                        isSelected 
                          ? 'border-primary/30 bg-primary/20 text-primary' 
                          : 'border-white/10 bg-white/5 text-slate-500'
                      }`}>
                        {item.category}
                      </span>
                      {isSelected && <ArrowRight size={14} className="text-primary animate-pulse" />}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Guidelines */}
          <div className="p-4 border-t border-white/5 bg-black/40 flex items-center justify-between text-[10px] font-black text-slate-500 tracking-wider font-mono">
            <span className="flex items-center gap-2">
              <Command size={10} /> Keyboard navigation enabled
            </span>
            <div className="flex items-center gap-3">
              <span>↑↓ Navigation</span>
              <span>⏎ Select</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
