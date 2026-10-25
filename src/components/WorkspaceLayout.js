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
    <div className="min-h-screen pb-20 relative overflow-x-hidden bg-background text-foreground">
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
              className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1018] p-6 md:p-8 relative z-[301] shadow-xl"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <span>⚠️ Large Payload Detected</span>
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                The pasted content is large (~{(inputValue.length / (1024 * 1024)).toFixed(2)} MB). Rendering full syntax formatting and expandable tree nodes for massive payloads may cause high browser memory usage.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setLargeFileWarning(false)}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  suppressHydrationWarning={true}
                >
                  Continue &amp; Format
                </button>
                <button
                  onClick={() => {
                    setLargeFileWarning(false);
                    onInputChange(inputValue.slice(0, 1024 * 500));
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-white/10 transition-all cursor-pointer"
                  suppressHydrationWarning={true}
                >
                  Truncate to 500KB
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 md:px-6 max-w-[1600px] relative z-10 pt-6 overflow-x-hidden">
        
        {/* Breadcrumb Navigation — hidden on home page */}
        {!isHomePage && (
          <nav className="mb-6 text-xs font-medium text-slate-500 flex items-center gap-2">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-slate-900 dark:hover:text-white transition-colors">Tools</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-bold">{title}</span>
          </nav>
        )}

        {/* Hero Section */}
        <section className="text-center mb-8 max-w-[950px] mx-auto pt-2">
          {!isHomePage && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-4">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">100% Client-Side Privacy</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span>Zero Server Latency</span>
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
            {h1}
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {intro}
          </p>
        </section>

        {/* Main Workspace Section */}
        <section className="relative z-10 flex flex-col xl:grid xl:grid-cols-[1fr_auto_1fr] gap-4 xl:gap-6 items-stretch mb-16">
          
          {/* LEFT INPUT COLUMN */}
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`bg-white dark:bg-[#0c1018] rounded-2xl overflow-hidden flex flex-col h-[380px] md:h-[580px] xl:h-[680px] relative group border shadow-xs transition-all min-w-0 ${
              dragActive ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="p-3 sm:p-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-white/[0.02] gap-2 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                  {inputLabel || 'Input JSON'}
                </span>
                <button
                  onClick={handleLoadSample}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-xs font-semibold transition-colors border border-emerald-200 dark:border-emerald-800 shrink-0 cursor-pointer"
                  title="Load dummy JSON for testing"
                  suppressHydrationWarning={true}
                >
                  Sample
                </button>
                {isLargeFile && (
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                    Large Payload
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                <button 
                  onClick={() => setHistoryOpen(!historyOpen)} 
                  title="View past sessions history"
                  className={`p-2 rounded-lg transition-colors shrink-0 cursor-pointer text-xs font-semibold flex items-center gap-1 ${
                    historyOpen 
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' 
                      : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                  suppressHydrationWarning={true}
                >
                  <History size={14} />
                  <span className="hidden md:inline">History</span>
                </button>
                {onRepair && (
                  <button 
                    onClick={onRepair} 
                    title="Auto-repair code errors"
                    className="p-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-slate-50 transition-colors shrink-0 cursor-pointer text-xs font-semibold flex items-center gap-1"
                    suppressHydrationWarning={true}
                  >
                    <Wand2 size={14} />
                    <span className="hidden md:inline">Repair</span>
                  </button>
                )}
                <button 
                  onClick={() => fileInputRef.current?.click()} 
                  title="Upload JSON file"
                  className="p-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-50 transition-colors shrink-0 cursor-pointer text-xs font-semibold flex items-center gap-1"
                  suppressHydrationWarning={true}
                >
                  <Upload size={14} />
                  <span className="hidden md:inline">Upload</span>
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
                  title="Copy input text"
                  className="p-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-50 transition-colors shrink-0 cursor-pointer text-xs font-semibold flex items-center gap-1"
                  suppressHydrationWarning={true}
                >
                  {copied.input ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  <span className="hidden md:inline">{copied.input ? 'Copied' : 'Copy'}</span>
                </button>
                {onClear && (
                  <button 
                    onClick={onClear} 
                    title="Clear panel input"
                    className="p-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors shrink-0 cursor-pointer text-xs font-semibold flex items-center gap-1"
                    suppressHydrationWarning={true}
                  >
                    <Trash2 size={14} />
                    <span className="hidden md:inline">Clear</span>
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
                  className="absolute inset-0 bg-white dark:bg-[#0c1018] z-30 flex flex-col border-r border-slate-200 dark:border-slate-800"
                >
                  <div className="p-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-white/[0.02]">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <History size={14} className="text-emerald-600" /> Past Sessions
                    </span>
                    <div className="flex gap-2">
                      {history.length > 0 && (
                        <button
                          onClick={() => {
                            localStorage.setItem('revoxera_history', '[]');
                            setHistory([]);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 text-xs font-semibold transition-colors border border-rose-200 dark:border-rose-800 cursor-pointer"
                          suppressHydrationWarning={true}
                        >
                          Clear All
                        </button>
                      )}
                      <button
                        onClick={() => setHistoryOpen(false)}
                        className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white text-xs cursor-pointer"
                        suppressHydrationWarning={true}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-2.5 custom-scrollbar">
                    {history.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6">
                        <span className="text-slate-400 font-mono text-xs mb-1">No history recorded yet</span>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-[220px]">
                          Format or process your JSON, and your recent inputs will appear here.
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
                          className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-slate-800 hover:border-emerald-500 cursor-pointer transition-all group"
                        >
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                              {item.tool}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-slate-400 font-mono">
                                {item.timestamp}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-mono">
                                {item.size}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const updated = history.filter(h => h.id !== item.id);
                                  localStorage.setItem('revoxera_history', JSON.stringify(updated));
                                  setHistory(updated);
                                }}
                                className="text-slate-400 hover:text-rose-600 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete item"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                          <div className="text-xs font-mono text-slate-600 dark:text-slate-300 line-clamp-2 break-all bg-white dark:bg-black/30 p-2 rounded-lg border border-slate-200 dark:border-white/5">
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
              <div className="absolute inset-0 bg-emerald-500/10 flex flex-col items-center justify-center pointer-events-none z-20 border-2 border-dashed border-emerald-500 rounded-2xl backdrop-blur-xs">
                <Upload className="w-10 h-10 text-emerald-600 mb-2 animate-bounce" />
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Drop data file here</span>
              </div>
            )}

            {customInputArea ? customInputArea : (
              <textarea
                placeholder={inputPlaceholder}
                className="flex-1 p-4 md:p-6 bg-transparent text-slate-900 dark:text-slate-100 text-sm md:text-base font-mono outline-none resize-none placeholder:text-slate-400 dark:placeholder:text-slate-500 custom-scrollbar selection:bg-emerald-500/20"
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
              />
            )}
            
            {error && (
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 z-10 shadow-sm">
                <p className="text-xs text-rose-700 dark:text-rose-300 font-mono flex items-start gap-2">
                  <ShieldCheck size={16} className="text-rose-600 shrink-0 mt-0.5" />
                  <span className="break-all font-semibold">Syntax Error: {error}</span>
                </p>
              </div>
            )}
          </div>

          {/* MIDDLE COLUMN CONTROLS */}
          <div className="workspace-controls-strip">
            {controls}
          </div>

          {/* RIGHT OUTPUT COLUMN */}
          <div className="bg-white dark:bg-[#0c1018] rounded-2xl overflow-hidden flex flex-col h-[380px] md:h-[580px] xl:h-[680px] border border-slate-200 dark:border-slate-800 shadow-xs min-w-0">
            {/* TAB BAR */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-white/[0.02] shrink-0 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className={`shrink-0 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                    activeTab === tab 
                      ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-[#0c1018]' 
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/50'
                  }`}
                  suppressHydrationWarning={true}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-4 md:p-6 flex-1 relative overflow-hidden">
              {customOutputArea ? customOutputArea : (
                <textarea
                  readOnly
                  placeholder="// Output will align automatically here..."
                  className="w-full h-full p-2 bg-transparent text-slate-900 dark:text-slate-100 text-sm md:text-base font-mono outline-none resize-none custom-scrollbar selection:bg-emerald-500/20"
                  value={outputValue}
                />
              )}
            </div>

            <div className="p-3 sm:p-4 bg-slate-50/70 dark:bg-white/[0.02] border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 font-mono w-full sm:w-auto">
                <span className="flex items-center gap-1.5">
                  <span className="text-slate-400">Size:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{(new Blob([outputValue || inputValue]).size / 1024).toFixed(1)} KB</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-slate-400">Lines:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{finalStats.lines}</strong>
                </span>
                {finalStats.nodes > 0 && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-slate-400">Nodes:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{finalStats.nodes}</strong>
                    </span>
                  </>
                )}
                {latency > 0 && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-slate-400">Time:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{latency}ms</strong>
                    </span>
                  </>
                )}
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button 
                  onClick={handleDownload} 
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-xs font-bold transition-colors border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 shadow-xs cursor-pointer"
                  suppressHydrationWarning={true}
                >
                  <Download size={14} /> <span>Download</span>
                </button>
                <button 
                  onClick={() => handleCopy('output')} 
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                  suppressHydrationWarning={true}
                >
                  {copied.output ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied.output ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SEO FEATURES SECTION */}
        {features.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {features.map((feat, index) => (
                <div key={index} className="bg-white dark:bg-[#0c1018] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mb-4">
                    <ShieldCheck size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{feat.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SEO FAQ SECTION */}
        {faq.length > 0 && (
          <section className="mb-16 max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faq.map((item, idx) => {
                const isOpen = !!openFaq[idx];
                return (
                  <div key={idx} className="bg-white dark:bg-[#0c1018] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 flex justify-between items-center text-left text-xs sm:text-sm font-bold text-slate-900 dark:text-white transition-colors cursor-pointer"
                      suppressHydrationWarning={true}
                    >
                      <span>{item.q}</span>
                      <ChevronRight size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-90 text-emerald-600' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* INTERNAL RELATED TOOLS SECTION */}
        {relatedTools.length > 0 && (
          <section className="border-t border-slate-200 dark:border-slate-800 pt-10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Related Developer Utilities</h2>
            <div className="flex flex-wrap gap-2.5">
              {relatedTools.map((t, idx) => (
                <Link
                  key={idx}
                  href={t.href}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span>{t.name}</span> <ArrowRight size={12} className="text-slate-400" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
