'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Copy, Download, Trash2, Wand2, Check, Upload, HelpCircle, 
  ArrowRight, ShieldCheck, ChevronDown, ChevronRight, Activity, Globe,
  History
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
  isHomePage = false,
}) {
  const [copied, setCopied] = useState({ input: false, output: false });
  const [dragActive, setDragActive] = useState(false);
  const [latency, setLatency] = useState(0);
  const [isLargeFile, setIsLargeFile] = useState(false);
  const [largeFileWarning, setLargeFileWarning] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  
  const fileInputRef = useRef(null);

  const draftKey = `revoxera_draft_${title.toLowerCase().replace(/\s+/g, '_')}`;

  // Load draft session from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft && !inputValue) {
      onInputChange(savedDraft);
    }
  }, [draftKey]);

  // Save draft session to localStorage when input value changes
  useEffect(() => {
    if (inputValue) {
      localStorage.setItem(draftKey, inputValue);
    } else {
      localStorage.removeItem(draftKey);
    }
  }, [inputValue, draftKey]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem('revoxera_history') || '[]');
      setHistory(savedHistory);
    } catch (e) {
      setHistory([]);
    }
  }, []);

  // Helper to append a processed operation into history
  const addToHistory = (value) => {
    if (!value || !value.trim()) return;
    const trimmed = value.trim();
    
    let historyList = [];
    try {
      historyList = JSON.parse(localStorage.getItem('revoxera_history') || '[]');
    } catch (e) {
      historyList = [];
    }
    
    // Filter duplicates of exact same content
    historyList = historyList.filter(item => item.input.trim() !== trimmed);
    
    const snippet = trimmed.slice(0, 80) + (trimmed.length > 80 ? '...' : '');
    const sizeInKb = (new Blob([trimmed]).size / 1024).toFixed(2);
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    const newItem = {
      id: Date.now(),
      timestamp,
      tool: title,
      input: trimmed,
      size: `${sizeInKb} KB`,
      snippet
    };
    
    historyList.unshift(newItem);
    if (historyList.length > 15) {
      historyList = historyList.slice(0, 15);
    }
    
    localStorage.setItem('revoxera_history', JSON.stringify(historyList));
    setHistory(historyList);
  };

  // Debounced history save when user input is stable
  useEffect(() => {
    if (!inputValue || !inputValue.trim()) return;
    const timer = setTimeout(() => {
      addToHistory(inputValue);
    }, 3000);
    return () => clearTimeout(timer);
  }, [inputValue]);

  // Handler to inject a rich complex JSON mock payload for immediate test drive
  const handleLoadSample = () => {
    const sampleJson = {
      appName: "Revoxera Sandbox",
      version: 2.4,
      status: "active",
      meta: {
        uptimeSeconds: 154820,
        environment: "production",
        features: ["beautify", "minify", "tree_view", "typescript_gen", "csv_export"]
      },
      users: [
        { id: 1, name: "Alice Vance", role: "DevOps", active: true },
        { id: 2, name: "Bob Miller", role: "Fullstack", active: false },
        { id: 3, name: "Charlie King", role: "Frontend", active: true }
      ]
    };
    const sampleText = JSON.stringify(sampleJson, null, 2);
    onInputChange(sampleText);
    addToHistory(sampleText);
  };

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
    <div className="min-h-screen cyber-grid pb-20 relative overflow-x-hidden">
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

      <div className="container mx-auto px-4 md:px-6 animate-fade-in max-w-[1600px] relative z-10 pt-8 overflow-x-hidden">
        
        {/* Breadcrumb Navigation — hidden on home page */}
        {!isHomePage && (
          <nav className="mb-6 text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase flex items-center gap-2">
            <Link href="/" className="hover:text-primary transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-primary transition-colors">TOOLS</Link>
            <span>/</span>
            <span className="text-primary">{title}</span>
          </nav>
        )}

        {/* Hero Landing Description */}
        <section className="text-center mb-8 max-w-[1200px] mx-auto">
          {!isHomePage && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="inline-block mb-4 px-5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <span className="text-[9px] font-black tracking-[0.3em] text-primary uppercase flex items-center gap-2 justify-center">
                <Activity size={10} className="text-primary" /> Privacy-First Local Sandbox Core
              </span>
            </motion.div>
          )}
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

        {/* Dynamic Workspace Section */}
        <section className="relative z-10 flex flex-col xl:grid xl:grid-cols-[1fr_auto_1fr] gap-4 xl:gap-8 items-stretch mb-16">
          
          {/* LEFT INPUT COLUMN */}
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`glass-panel rounded-[28px] md:rounded-[40px] overflow-hidden flex flex-col h-[380px] md:h-[600px] xl:h-[750px] relative group border shadow-2xl transition-all min-w-0 ${
              dragActive ? 'border-primary bg-primary/5 shadow-[0_0_30px_rgba(56,189,248,0.2)]' : 'border-white/10'
            }`}
          >
            <div className="p-3 md:p-6 flex justify-between items-center border-b border-white/10 bg-white/5 gap-2">
              <div className="flex items-center gap-2 md:gap-4 min-w-0">
                <div className="hidden sm:flex gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-red-500/50 border border-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50 border border-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50 border border-green-500/20" />
                </div>
                <span className="text-[9px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.3em] text-primary/80 uppercase truncate max-w-[80px] sm:max-w-[120px] md:max-w-none">
                  {inputLabel}
                </span>
                <button
                  onClick={handleLoadSample}
                  className="hidden sm:block px-2 py-1 rounded bg-primary/10 hover:bg-primary/20 text-primary text-[8px] font-black tracking-widest uppercase transition-all border border-primary/20 hover:scale-105 shrink-0"
                  title="Load dummy JSON for testing"
                  suppressHydrationWarning={true}
                >
                  Sample
                </button>
                {isLargeFile && (
                  <span className="text-[8px] font-black tracking-widest bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20 uppercase">
                    LARGE PAYLOAD
                  </span>
                )}
              </div>
              <div className="flex gap-1 md:gap-2 shrink-0">
                <button 
                  onClick={() => setHistoryOpen(!historyOpen)} 
                  title="View past sessions history"
                  className={`p-2 md:p-3 rounded-xl transition-all shrink-0 ${historyOpen ? 'bg-primary text-black' : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-primary'}`}
                  suppressHydrationWarning={true}
                >
                  <History size={15} />
                </button>
                {onRepair && (
                  <button 
                    onClick={onRepair} 
                    title="Auto-repair code errors"
                    className="p-2 md:p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-accent transition-all shrink-0"
                    suppressHydrationWarning={true}
                  >
                    <Wand2 size={15} />
                  </button>
                )}
                <button 
                  onClick={() => fileInputRef.current?.click()} 
                  title="Import configuration file"
                  className="hidden sm:block p-2 md:p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-primary transition-all shrink-0"
                  suppressHydrationWarning={true}
                >
                  <Upload size={15} />
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
                  className="p-2 md:p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-primary transition-all shrink-0"
                  suppressHydrationWarning={true}
                >
                  {copied.input ? <Check size={15} className="text-success" /> : <Copy size={15} />}
                </button>
                {onClear && (
                  <button 
                    onClick={onClear} 
                    title="Clear panel input"
                    className="p-2 md:p-3 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all shrink-0"
                    suppressHydrationWarning={true}
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* History Drawer Overlay */}
            <AnimatePresence>
              {historyOpen && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute inset-0 bg-black/95 backdrop-blur-md z-30 flex flex-col border-r border-white/10"
                >
                  <div className="p-6 flex justify-between items-center border-b border-white/10 bg-white/5">
                    <span className="text-xs font-black tracking-[0.2em] text-white uppercase flex items-center gap-2">
                      <History size={14} className="text-primary animate-pulse" /> PAST SESSIONS
                    </span>
                    <div className="flex gap-2">
                      {history.length > 0 && (
                        <button
                          onClick={() => {
                            localStorage.setItem('revoxera_history', '[]');
                            setHistory([]);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[9px] font-black tracking-widest uppercase transition-all border border-red-500/20"
                          suppressHydrationWarning={true}
                        >
                          Clear All
                        </button>
                      )}
                      <button
                        onClick={() => setHistoryOpen(false)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all text-xs"
                        suppressHydrationWarning={true}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {history.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6">
                        <span className="text-slate-600 font-mono text-xs uppercase tracking-widest mb-2">No history recorded</span>
                        <p className="text-[10px] text-slate-500 font-light leading-relaxed max-w-[200px]">
                          Format or process data, and your last 15 inputs will appear here automatically.
                        </p>
                      </div>
                    ) : (
                      history.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            onInputChange(item.input);
                            setHistoryOpen(false);
                          }}
                          className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/[0.08] cursor-pointer transition-all group relative"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[9px] font-black tracking-wider text-primary uppercase">
                              {item.tool}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] text-slate-500 font-mono">
                                {item.timestamp}
                              </span>
                              <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 font-mono">
                                {item.size}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updated = history.filter(h => h.id !== item.id);
                                  localStorage.setItem('revoxera_history', JSON.stringify(updated));
                                  setHistory(updated);
                                }}
                                className="text-slate-500 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete item"
                              >
                                <Trash2 size={10} />
                              </button>
                            </div>
                          </div>
                          <div className="text-xs font-mono text-slate-400 line-clamp-2 break-all bg-black/30 p-2 rounded-lg border border-white/5">
                            {item.snippet}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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

          {/* MIDDLE COLUMN CONTROLS — scrollable horizontal strip on mobile, vertical on xl */}
          <div className="workspace-controls-strip">
            {controls}
          </div>

          {/* RIGHT OUTPUT COLUMN */}
          <div className="glass-panel rounded-[28px] md:rounded-[40px] overflow-hidden flex flex-col h-[380px] md:h-[600px] xl:h-[750px] border border-white/10 shadow-2xl min-w-0">
            {/* TAB BAR — horizontally scrollable, no wrap */}
            <div className="flex border-b border-white/10 bg-white/5 shrink-0 overflow-x-auto custom-scrollbar" style={{ scrollbarWidth: 'none' }}>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className={`shrink-0 px-4 py-3.5 text-[9px] md:text-[10px] font-black tracking-[0.25em] uppercase transition-all relative whitespace-nowrap ${
                    activeTab === tab ? 'text-primary bg-primary/10' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  suppressHydrationWarning={true}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="tab-underline-workspace" 
                      className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" 
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

            <div className="p-3 md:p-5 bg-white/5 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
              <div className="flex flex-wrap gap-3 md:gap-6 text-[9px] font-black tracking-[0.2em] text-slate-500 font-mono uppercase w-full sm:w-auto">
                <div className="flex flex-col">
                  <span className="text-primary opacity-50 mb-1">MEM</span> 
                  <span className="text-white text-[10px]">{(new Blob([outputValue || inputValue]).size / 1024).toFixed(1)} KB</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-accent opacity-50 mb-1">LINES</span> 
                  <span className="text-white text-[10px]">{finalStats.lines}</span>
                </div>
                {finalStats.nodes > 0 && (
                  <div className="flex flex-col">
                    <span className="text-success opacity-50 mb-1">NODES</span> 
                    <span className="text-white text-[10px]">{finalStats.nodes}</span>
                  </div>
                )}
                {latency > 0 && (
                  <div className="flex flex-col">
                    <span className="text-amber-500 opacity-50 mb-1">MS</span> 
                    <span className="text-white text-[10px]">{latency}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button 
                  onClick={handleDownload} 
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-[9px] font-black tracking-widest transition-all border border-white/10 text-white"
                  suppressHydrationWarning={true}
                >
                  <Download size={13} /> DL
                </button>
                <button 
                  onClick={() => handleCopy('output')} 
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-primary text-black text-[9px] font-black tracking-widest transition-all hover:opacity-90 active:scale-95"
                  suppressHydrationWarning={true}
                >
                  <Copy size={13} /> {copied.output ? 'COPIED' : 'COPY'}
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
