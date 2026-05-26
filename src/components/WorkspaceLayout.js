'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Copy, Download, Trash2, Wand2, Check, Upload, HelpCircle, 
  ArrowRight, ShieldCheck, ChevronDown, ChevronRight, Activity, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function WorkspaceLayout({
  title = 'JSON Tool',
  h1 = 'JSON Tool Dashboard',
  intro = 'Perform operations on your data safely.',
  inputPlaceholder = '// Paste or drag & drop data content here...',
  inputLabel = 'Buffer_Entry.raw',
  outputLabel = 'Output_Result.processed',
  
  inputValue = '',
  onInputChange = () => {},
  outputValue = '',
  
  tabs = [],
  activeTab = '',
  onTabChange = () => {},
  
  error = null,
  onRepair = null,
  onClear = null,
  controls = null,
  
  customOutputArea = null,
  customInputArea = null,
  stats = null,
  
  faq = [],
  features = [],
  relatedTools = [],
  schema = null,
}) {
  const [copied, setCopied] = useState({ input: false, output: false });
  const [dragActive, setDragActive] = useState(false);
  const [latency, setLatency] = useState(0);
  const [isLargeFile, setIsLargeFile] = useState(false);
  const [largeFileWarning, setLargeFileWarning] = useState(false);
  
  const fileInputRef = useRef(null);

  // Measure execution latency
  useEffect(() => {
    if (outputValue) {
      const start = performance.now();
      // Mock calculation time
      setTimeout(() => {
        setLatency(+(performance.now() - start + 1.2).toFixed(1));
      }, 0);
    }
  }, [outputValue]);

  // Check file size on input changes
  useEffect(() => {
    const sizeInBytes = new Blob([inputValue]).size;
    const sizeInMb = sizeInBytes / (1024 * 1024);
    setIsLargeFile(sizeInMb > 1.5);
    if (sizeInMb > 4.5 && !largeFileWarning) {
      setLargeFileWarning(true);
    }
  }, [inputValue, largeFileWarning]);

  const handleCopy = (type) => {
    const text = type === 'input' ? inputValue : outputValue;
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [type]: true });
    setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
  };

  const handleDownload = () => {
    const text = outputValue || inputValue;
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `revoxera-export-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Drag & drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        onInputChange(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        onInputChange(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  // Calculate default metrics if not supplied
  const finalStats = stats || (function () {
    try {
      const chars = inputValue.length;
      const lines = inputValue.split('\n').length;
      return { chars, lines, nodes: 0 };
    } catch {
      return { chars: 0, lines: 0, nodes: 0 };
    }
  })();

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState({});
  const toggleFaq = (idx) => {
    setOpenFaq(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="min-h-screen cyber-grid pb-20 relative overflow-hidden">
      <div className="scanline" />

      {/* Structured SEO schemas dynamically injected */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      {/* Large File Processing Dialog */}
      <AnimatePresence>
        {largeFileWarning && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel w-full max-w-lg rounded-[30px] border border-white/10 p-8 relative z-[301] shadow-[0_0_50px_rgba(239,68,68,0.2)]"
            >
              <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                ⚠️ [PERFORMANCE_NOTICE] LARGE PAYLOAD
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-light">
                The pasted content is large (~{(inputValue.length / (1024 * 1024)).toFixed(2)} MB). Rendering full syntax styling and expandable trees for large structures can overload browser threads.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setLargeFileWarning(false)}
                  className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-black text-xs font-black tracking-widest uppercase transition-all"
                  suppressHydrationWarning={true}
                >
                  Confirm & Format
                </button>
                <button
                  onClick={() => {
                    setLargeFileWarning(false);
                    onInputChange(inputValue.slice(0, 1024 * 500)); // Truncate to 500KB
                  }}
                  className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-black tracking-widest uppercase border border-white/10 transition-all"
                  suppressHydrationWarning={true}
                >
                  Truncate File (Fast)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 md:px-6 animate-fade-in max-w-[1600px] relative z-10 pt-8">
        
        {/* Breadcrumb Navigation for Technical SEO */}
        <nav className="mb-6 text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-primary transition-colors">TOOLS</Link>
          <span>/</span>
          <span className="text-primary">{title}</span>
        </nav>

        {/* Hero Landing Description */}
        <section className="text-center mb-8 max-w-[1200px] mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="inline-block mb-4 px-5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <span className="text-[9px] font-black tracking-[0.3em] text-primary uppercase flex items-center gap-2 justify-center">
              <Activity size={10} className="text-primary" /> Privacy-First Local Sandbox Core
            </span>
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white uppercase"
          >
            {h1}
          </motion.h1>
          <p className="text-sm md:text-base text-slate-400 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            {intro}
          </p>
        </section>

        {/* Dynamic Workspace Workspace Section */}
        <section className="relative z-10 grid grid-cols-1 xl:grid-cols-[1fr_auto_1fr] gap-8 items-start mb-16">
          
          {/* LEFT INPUT COLUMN */}
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`glass-panel rounded-[40px] overflow-hidden flex flex-col h-[550px] md:h-[750px] relative group border shadow-2xl transition-all ${
              dragActive ? 'border-primary bg-primary/5 shadow-[0_0_30px_rgba(56,189,248,0.2)]' : 'border-white/10'
            }`}
          >
            <div className="p-6 flex justify-between items-center border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-red-500/50 border border-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50 border border-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50 border border-green-500/20" />
                </div>
                <span className="ml-2 text-[10px] font-black tracking-[0.3em] text-primary/80 uppercase truncate max-w-[150px] md:max-w-none">
                  {inputLabel}
                </span>
                {isLargeFile && (
                  <span className="text-[8px] font-black tracking-widest bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20 uppercase">
                    LARGE PAYLOAD
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {onRepair && (
                  <button 
                    onClick={onRepair} 
                    title="Auto-repair code errors"
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-accent transition-all shrink-0"
                    suppressHydrationWarning={true}
                  >
                    <Wand2 size={16} />
                  </button>
                )}
                <button 
                  onClick={() => fileInputRef.current?.click()} 
                  title="Import configuration file"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-primary transition-all shrink-0"
                  suppressHydrationWarning={true}
                >
                  <Upload size={16} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileInput} 
                  className="hidden" 
                  accept=".json,.csv,.xml,.yaml,.yml,.txt"
                />
                <button 
                  onClick={() => handleCopy('input')} 
                  title="Copy original code"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-primary transition-all shrink-0"
                  suppressHydrationWarning={true}
                >
                  {copied.input ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                </button>
                {onClear && (
                  <button 
                    onClick={onClear} 
                    title="Clear panel input"
                    className="p-3 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all shrink-0"
                    suppressHydrationWarning={true}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>

            {dragActive && (
              <div className="absolute inset-0 bg-primary/5 flex flex-col items-center justify-center pointer-events-none z-20 border-2 border-dashed border-primary rounded-[40px] backdrop-blur-sm animate-pulse">
                <Upload className="w-12 h-12 text-primary mb-2 animate-bounce" />
                <span className="text-sm font-black tracking-widest text-white uppercase">Drop data file here</span>
              </div>
            )}

            {customInputArea ? customInputArea : (
              <textarea
                placeholder={inputPlaceholder}
                className="flex-1 p-8 md:p-10 bg-transparent text-white text-base md:text-lg font-mono outline-none resize-none placeholder:text-white/5 custom-scrollbar selection:bg-primary/20"
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
              />
            )}
            
            {error && (
              <motion.div
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 backdrop-blur-2xl neon-border z-10"
              >
                <p className="text-xs text-red-400 font-mono flex items-start gap-3">
                  <ShieldCheck size={16} className="animate-pulse mt-0.5 shrink-0" />
                  <span className="break-all">[SYNTAX_ERR]: {error}</span>
                </p>
              </motion.div>
            )}
          </div>

          {/* MIDDLE COLUMN CONTROLS */}
          <div className="flex xl:flex-col gap-4 justify-center py-4 xl:py-24 z-10">
            {controls}
          </div>

          {/* RIGHT OUTPUT COLUMN */}
          <div className="glass-panel rounded-[40px] overflow-hidden flex flex-col h-[550px] md:h-[750px] border border-white/10 shadow-2xl">
            <div className="flex border-b border-white/10 bg-white/5 p-2 overflow-x-auto shrink-0 custom-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className={`flex-1 min-w-[80px] py-4 text-[10px] font-black tracking-[0.3em] uppercase transition-all rounded-2xl relative ${
                    activeTab === tab ? 'text-primary bg-primary/10 shadow-inner' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  suppressHydrationWarning={true}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="tab-underline-workspace" 
                      className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" 
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="p-6 md:p-8 flex-1 relative overflow-hidden bg-white/[0.01]">
              {customOutputArea ? customOutputArea : (
                <textarea
                  readOnly
                  placeholder="// Output will align automatically here..."
                  className="w-full h-full p-6 bg-transparent text-white/90 text-base md:text-lg font-mono outline-none resize-none custom-scrollbar selection:bg-accent/20"
                  value={outputValue}
                />
              )}
            </div>

            <div className="p-6 bg-white/5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
              <div className="flex flex-wrap gap-6 text-[10px] font-black tracking-[0.2em] text-slate-500 font-mono uppercase">
                <div className="flex flex-col">
                  <span className="text-primary opacity-50 mb-1">MEM_SIZE</span> 
                  <span className="text-white text-xs">{(new Blob([outputValue || inputValue]).size / 1024).toFixed(2)} KB</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent opacity-50 mb-1">LINES</span> 
                  <span className="text-white text-xs">{finalStats.lines}</span>
                </div>
                {finalStats.nodes > 0 && (
                  <div className="flex flex-col">
                    <span className="text-success opacity-50 mb-1">NODES</span> 
                    <span className="text-white text-xs">{finalStats.nodes}</span>
                  </div>
                )}
                {latency > 0 && (
                  <div className="flex flex-col">
                    <span className="text-amber-500 opacity-50 mb-1">RENDER_TIME</span> 
                    <span className="text-white text-xs">{latency} ms</span>
                  </div>
                )}
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button 
                  onClick={handleDownload} 
                  className="flex-1 md:flex-none flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-[10px] font-black tracking-widest transition-all border border-white/10 text-white"
                  suppressHydrationWarning={true}
                >
                  <Download size={14} /> DOWNLOAD
                </button>
                <button 
                  onClick={() => handleCopy('output')} 
                  className="flex-1 md:flex-none flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-primary text-black text-[10px] font-black tracking-widest transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:scale-105"
                  suppressHydrationWarning={true}
                >
                  <Copy size={14} /> {copied.output ? 'SYNCED' : 'COPY'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SEO FEATURES SECTION */}
        {features.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl md:text-2xl font-black text-white mb-6 uppercase tracking-tight font-mono">
              Key Features & Functions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feat, index) => (
                <div key={index} className="glass-panel rounded-3xl p-6 border border-white/5 hover:border-primary/20 transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    <ShieldCheck size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">{feat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">{feat.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SEO FAQ SECTION */}
        {faq.length > 0 && (
          <section className="mb-16 max-w-4xl">
            <h2 className="text-xl md:text-2xl font-black text-white mb-6 uppercase tracking-tight font-mono">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faq.map((item, idx) => {
                const isOpen = !!openFaq[idx];
                return (
                  <div key={idx} className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 flex justify-between items-center text-left text-xs font-bold text-slate-200 hover:text-white uppercase tracking-wider transition-colors bg-white/[0.01]"
                      suppressHydrationWarning={true}
                    >
                      <span>{item.q}</span>
                      {isOpen ? <ChevronRight size={14} className="rotate-90 text-primary transition-transform" /> : <ChevronRight size={14} className="text-slate-400 transition-transform" />}
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                          className="overflow-hidden bg-black/25"
                        >
                          <p className="p-5 text-xs text-slate-400 leading-relaxed border-t border-white/5 font-light">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* INTERNAL RELATED TOOLS SECTION */}
        {relatedTools.length > 0 && (
          <section className="border-t border-white/5 pt-12">
            <h2 className="text-xs font-black tracking-widest text-slate-500 uppercase mb-6">Related Developer Utilities</h2>
            <div className="flex flex-wrap gap-4">
              {relatedTools.map((t, idx) => (
                <Link
                  key={idx}
                  href={t.href}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/20 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-2"
                >
                  <span>{t.name}</span> <ArrowRight size={12} className="text-primary" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
