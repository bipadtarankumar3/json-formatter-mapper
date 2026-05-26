'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, Terminal, ShieldCheck, Columns, Play, Edit, 
  Brackets, Zap, ArrowRight, Table, Cpu, Globe, FileText, CodeXml 
} from 'lucide-react';
import { motion } from 'framer-motion';

const TOOLS_LIST = [
  { name: 'JSON Formatter', desc: 'Beautify JSON, configure indentation spacing, and render clean formatting conventions.', href: '/json-formatter', icon: <Terminal className="w-5 h-5" />, category: 'Formatter', tags: ['Beautify', 'Indent'] },
  { name: 'JSON Pretty Print', desc: 'Indentation spacing styles, syntax tokens highlights, and quick sharing links.', href: '/json-pretty-print', icon: <CodeXml className="w-5 h-5" />, category: 'Formatter', tags: ['Pretty Print', 'Style'] },
  { name: 'JSON Validator', desc: 'Validate syntax elements. Locate error line and column index coordinates across browsers.', href: '/json-validator', icon: <ShieldCheck className="w-5 h-5" />, category: 'Validator', tags: ['Lint', 'Syntax'] },
  { name: 'JSON Tree Viewer', desc: 'Interactive visual node hierarchy with JSONPath querying and element search filtering.', href: '/json-viewer', icon: <Brackets className="w-5 h-5" />, category: 'Inspector', tags: ['Tree View', 'JSONPath'] },
  { name: 'JSON Minifier', desc: 'Compress whitespace, line breaks, and tabs to optimize network transfer sizes.', href: '/json-minify', icon: <Zap className="w-5 h-5" />, category: 'Compressor', tags: ['Minify', 'Size'] },
  { name: 'JSON Compare', desc: 'Compare side-by-side structures, highlight differences, and track modifications.', href: '/json-compare', icon: <Columns className="w-5 h-5" />, category: 'Comparison', tags: ['Compare', 'Diff'] },
  { name: 'JSON Diff Tool', desc: 'Split side-by-side or unified inline visual difference highlighting grids.', href: '/json-diff', icon: <Columns className="w-5 h-5" />, category: 'Comparison', tags: ['Diff', 'Unified'] },
  { name: 'JSON Editor', desc: 'Synchronous editor allowing raw editing or tree mutation (adding / deleting nodes).', href: '/json-editor', icon: <Edit className="w-5 h-5" />, category: 'Inspector', tags: ['Edit', 'Tree Editor'] },
  { name: 'JSON Escape / Unescape', desc: 'Process strings. Escape or unescape quote and backslash characters safely.', href: '/json-escape-unescape', icon: <FileText className="w-5 h-5" />, category: 'Processor', tags: ['Escape', 'Strings'] },
  { name: 'JSON to CSV', desc: 'Flatten object arrays to spreadsheet comma-separated rows.', href: '/json-to-csv', icon: <Table className="w-5 h-5" />, category: 'Converter', tags: ['CSV', 'Convert'] },
  { name: 'JSON to XML', desc: 'Serialize key-value data structures to markup tag elements recursively.', href: '/json-to-xml', icon: <Play className="w-5 h-5" />, category: 'Converter', tags: ['XML', 'Serialize'] },
  { name: 'JSON to YAML', desc: 'Generate YAML config formatting directly from JSON blocks.', href: '/json-to-yaml', icon: <Play className="w-5 h-5" />, category: 'Converter', tags: ['YAML', 'Config'] },
  { name: 'XML to JSON', desc: 'Parse XML tag structures to V8 Javascript objects natively.', href: '/xml-to-json', icon: <Play className="w-5 h-5" />, category: 'Converter', tags: ['XML', 'Parse'] },
  { name: 'CSV to JSON', desc: 'Parse spreadsheet CSV records to key-value JSON arrays.', href: '/csv-to-json', icon: <Play className="w-5 h-5" />, category: 'Converter', tags: ['CSV', 'Parse'] },
  { name: 'YAML to JSON', desc: 'Parse YAML configuration blocks to standard JSON structures.', href: '/yaml-to-json', icon: <Play className="w-5 h-5" />, category: 'Converter', tags: ['YAML', 'Parse'] },
  { name: 'API Response Viewer', desc: 'Bypass CORS limits using our server proxy to test, inspect, and beautify API responses.', href: '/api-response-viewer', icon: <Globe className="w-5 h-5" />, category: 'API Utilities', tags: ['API Test', 'CORS Proxy'] },
];

const CATEGORIES = ['All', 'Formatter', 'Validator', 'Inspector', 'Comparison', 'Converter', 'API Utilities'];

export default function ToolsHub() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = TOOLS_LIST.filter(tool => {
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen cyber-grid pb-20 relative overflow-hidden">
      <div className="scanline" />

      <div className="container mx-auto px-4 md:px-6 animate-fade-in max-w-[1200px] relative z-10 pt-12">
        <section className="text-center mb-12 max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
            <span className="text-[9px] font-black tracking-[0.3em] text-primary uppercase flex items-center gap-2 justify-center">
              <Cpu size={10} /> Nexus System Index v4.5.1
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none text-white uppercase">
            DEVELOPER <span className="text-primary drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]">UTILITIES</span> HUB
          </h1>
          <p className="text-base md:text-lg text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
            Access our suite of zero-latency, local-sandbox parser, converter, and validation pipelines designed to format code structures safely.
          </p>
        </section>

        <section className="glass-panel rounded-[30px] border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
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
          </div>

          <div className="relative w-full md:max-w-xs group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={14} />
            <input
              type="text"
              placeholder="Search tools or tags..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs font-mono outline-none focus:border-primary/50 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              suppressHydrationWarning={true}
            />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.length === 0 ? (
            <div className="col-span-full py-20 text-center text-slate-500 font-mono text-sm">
              No matching modules detected. Try resetting filters.
            </div>
          ) : (
            filteredTools.map((tool, idx) => (
              <Link 
                key={idx}
                href={tool.href}
                className="group glass-panel rounded-3xl p-6 border border-white/5 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-[220px]"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:border-primary/30 transition-all">
                      {tool.icon}
                    </div>
                    <span className="text-[8px] font-black tracking-widest text-slate-500 border border-white/5 px-2 py-0.5 rounded bg-white/[0.02]">
                      {tool.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light line-clamp-3">
                    {tool.desc}
                  </p>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-1.5">
                    {tool.tags.map(t => (
                      <span key={t} className="text-[8px] font-semibold text-slate-500">
                        #{t.toLowerCase()}
                      </span>
                    ))}
                  </div>
                  <ArrowRight size={14} className="text-slate-500 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
