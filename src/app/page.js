'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Copy, Share2, Download, Trash2, Settings, Code,
  CheckCircle, ShieldCheck, Zap as ZapIcon, Check, Star,
  Type, Hash, FileText, Sparkles, Rocket, HelpCircle,
  Lock, MessageSquare, Trophy, Plus, Brackets, Layers,
  Maximize2, Minimize2, RefreshCw, History, Save, Search,
  Wand2, Cpu, FileJson, Table, Sidebar as SidebarIcon, X,
  Terminal, Activity, Globe, Zap, Fingerprint, Command
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TreeViewer from '@/components/TreeViewer';
import { jsonToTypeScript, jsonToCsv, repairJson, evaluateJsonPath } from '@/lib/utils';

// Premium Tooltip Component
const Tooltip = ({ text, children }) => (
  <div className="tooltip-container">
    {children}
    <div className="tooltip-content">{text}</div>
  </div>
);

export default function JsonFormatterMapper() {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [activeTab, setActiveTab] = useState('editor');
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [jsonPath, setJsonPath] = useState('$');
  const [history, setHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copied, setCopied] = useState({ input: false, output: false, general: false });
  const [particles, setParticles] = useState([]);

  // Generate particles
  useEffect(() => {
    const p = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${10 + Math.random() * 20}s`,
      delay: `${Math.random() * 5}s`,
      size: `${2 + Math.random() * 4}px`
    }));
    setParticles(p);
  }, []);

  // Load history
  useEffect(() => {
    const savedHistory = localStorage.getItem('json_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const saveToHistory = (input) => {
    if (!input.trim()) return;
    const newHistory = [
      { id: Date.now(), content: input, timestamp: new Date().toLocaleTimeString() },
      ...history.slice(0, 9)
    ];
    setHistory(newHistory);
    localStorage.setItem('json_history', JSON.stringify(newHistory));
  };

  const handleFormat = () => {
    try {
      if (!jsonInput.trim()) return;
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonOutput(formatted);
      setError(null);
      saveToHistory(jsonInput);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleMinify = () => {
    try {
      if (!jsonInput.trim()) return;
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleToTS = () => {
    try {
      if (!jsonInput.trim()) return;
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(jsonToTypeScript(parsed));
      setActiveTab('ts');
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleToCSV = () => {
    try {
      if (!jsonInput.trim()) return;
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(jsonToCsv(parsed));
      setActiveTab('csv');
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleRepair = () => {
    const repaired = repairJson(jsonInput);
    setJsonInput(repaired);
    setError(null);
  };

  const handleEvaluatePath = () => {
    try {
      if (!jsonInput.trim()) return;
      const parsed = JSON.parse(jsonInput);
      const result = evaluateJsonPath(parsed, jsonPath);
      setJsonOutput(JSON.stringify(result, null, 2));
      setActiveTab('editor');
    } catch (e) {
      setError(e.message);
    }
  };

  const handleCopy = (type) => {
    const text = type === 'input' ? jsonInput : jsonOutput;
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [type]: true });
    setTimeout(() => setCopied({ ...copied, [type]: false }), 2000);
  };

  const handleDownload = () => {
    const text = jsonOutput || jsonInput;
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data-${Date.now()}.${activeTab === 'csv' ? 'csv' : activeTab === 'ts' ? 'ts' : 'json'}`;
    a.click();
  };

  const stats = (function () {
    try {
      const chars = jsonInput.length;
      const lines = jsonInput.split('\n').length;
      const parsed = jsonInput.trim() ? JSON.parse(jsonInput) : null;
      const nodes = (function countNodes(obj) {
        if (typeof obj !== 'object' || obj === null) return 1;
        let count = 1;
        for (let key in obj) count += countNodes(obj[key]);
        return count;
      })(parsed);
      return { chars, lines, nodes };
    } catch {
      return { chars: jsonInput.length, lines: jsonInput.split('\n').length, nodes: 0 };
    }
  })();

  return (
    <div className="min-h-screen cyber-grid pb-20 relative overflow-hidden">
      <div className="scanline" />

      {/* Background Particles */}
      <div className="particles-container">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              animationDuration: p.duration,
              animationDelay: p.delay,
              width: p.size,
              height: p.size,
              bottom: '-20px'
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed left-0 top-0 h-full w-80 glass-panel z-50 p-6 border-r border-white/10 hologram-effect"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-primary flex items-center gap-2">
                  <History size={20} /> SESSION_LOG
                </h3>
                <button onClick={() => setSidebarOpen(false)} className="text-muted hover:text-white p-2 bg-white/5 rounded-lg">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-120px)] custom-scrollbar pr-2">
                {history.length === 0 && <p className="text-muted italic text-center py-10 opacity-50">No temporal data detected</p>}
                {history.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ x: 5 }}
                    onClick={() => { setJsonInput(item.content); setSidebarOpen(false); }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/50 cursor-pointer transition-all group relative overflow-hidden"
                  >
                    <div className="absolute inset-y-0 left-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform" />
                    <div className="flex justify-between text-[10px] text-muted mb-2 font-mono">
                      <span>[{item.timestamp}]</span>
                      <span className="group-hover:text-primary tracking-widest">RESTORE_FRAGMENT</span>
                    </div>
                    <code className="text-[10px] text-white/40 line-clamp-2 block font-mono">
                      {item.content}
                    </code>
                  </motion.div>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 md:px-6 animate-fade-in max-w-[1600px] relative z-10">
        <header className="flex justify-between items-center py-4">
          <div className="flex items-center gap-6">
            <Tooltip text="Toggle temporal history log">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-primary transition-all neon-border hologram-effect group"
              >
                <SidebarIcon size={24} className="group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </Tooltip>
            <div className="hidden md:flex flex-col">
              <span className="text-[10px] font-black text-primary tracking-[0.4em] uppercase">Flux_Engine.core</span>
              <h2 className="text-sm font-bold text-white/80 tracking-widest uppercase">Nexus Protocol v4.5.1</h2>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-8 text-[10px] font-black text-muted tracking-widest">
              <span className="flex items-center gap-2"><Globe size={14} className="text-primary" /> NODE_01: ONLINE</span>
              <span className="flex items-center gap-2"><Activity size={14} className="text-accent" /> LATENCY: 2.4MS</span>
              <span className="flex items-center gap-2"><Fingerprint size={14} className="text-success" /> AUTH: VERIFIED</span>
            </div>
            <Tooltip text="System overclocking enabled">
              <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-primary flex items-center gap-2 animate-pulse-glow cursor-help">
                <Zap size={16} /> <span className="text-[10px] font-black tracking-tighter">MAX PERFORMANCE</span>
              </div>
            </Tooltip>
          </div>
        </header>

        <section className="text-center mb-8 max-w-[1200px] mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="inline-block mb-4 px-5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <span className="text-[9px] font-black tracking-[0.3em] text-primary uppercase flex items-center gap-2">
              <Sparkles size={10} /> The ultimate data architect for the web 3.0 era
            </span>
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent"
          >
            JSON <span className="text-primary drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]">FORMATTER</span>
          </motion.h1>
          <p className="text-base md:text-lg text-muted font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Neural-linked JSON formatting, mapping, and extraction with <span className="text-white font-bold italic">zero latency</span>.
          </p>
        </section>

        <section className="relative z-10 grid grid-cols-1 xl:grid-cols-[1fr_auto_1fr] gap-8 items-start">
          {/* Input Panel */}
          <div className="glass-panel rounded-[40px] overflow-hidden flex flex-col h-[550px] md:h-[750px] relative group border border-white/10 shadow-2xl">
            <div className="p-8 flex justify-between items-center border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50 border border-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50 border border-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50 border border-green-500/20" />
                </div>
                <span className="ml-4 text-[10px] font-black tracking-[0.3em] text-primary/80 uppercase flex items-center gap-2">
                  <Terminal size={14} /> Buffer_Entry.raw
                </span>
              </div>
              <div className="flex gap-3">
                <Tooltip text="Neural auto-repair JSON errors">
                  <button onClick={handleRepair} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-muted hover:text-accent transition-all group/btn">
                    <Wand2 size={18} className="group-hover/btn:scale-110 transition-transform" />
                  </button>
                </Tooltip>
                <Tooltip text="Sync source to clipboard">
                  <button onClick={() => handleCopy('input')} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-muted hover:text-primary transition-all">
                    {copied.input ? <Check size={18} className="text-success" /> : <Copy size={18} />}
                  </button>
                </Tooltip>
                <Tooltip text="Purge buffer content">
                  <button onClick={() => setJsonInput('')} className="p-3 rounded-xl bg-white/5 hover:bg-red-500/20 text-muted hover:text-red-400 transition-all">
                    <Trash2 size={18} />
                  </button>
                </Tooltip>
              </div>
            </div>
            <textarea
              placeholder="// Paste raw data fragment here... (CTRL+V)"
              className="flex-1 p-10 bg-transparent text-white text-xl font-mono outline-none resize-none placeholder:text-white/5 custom-scrollbar selection:bg-primary/20"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            {error && (
              <motion.div
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-red-500/10 border border-red-500/20 backdrop-blur-2xl neon-border"
              >
                <p className="text-xs text-red-400 font-mono flex items-center gap-3">
                  <ShieldCheck size={18} className="animate-pulse" /> [CRITICAL_EXC]: {error}
                </p>
              </motion.div>
            )}
          </div>

          {/* Central Control Hub */}
          <div className="flex xl:flex-col gap-6 justify-center py-6 xl:py-32">
            <Tooltip text="FORMAT_STRUCTURE">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}
                onClick={handleFormat}
                className="p-6 rounded-3xl bg-primary text-black shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:shadow-[0_0_50px_rgba(56,189,248,0.6)] transition-all"
              >
                <Maximize2 size={28} strokeWidth={2.5} />
              </motion.button>
            </Tooltip>
            <Tooltip text="MINIFY_PAYLOAD">
              <motion.button
                whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.9 }}
                onClick={handleMinify}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all hologram-effect"
              >
                <Minimize2 size={28} />
              </motion.button>
            </Tooltip>
            <Tooltip text="GENERATE_TS_INTERFACE">
              <motion.button
                whileHover={{ scale: 1.1, y: -5 }} whileTap={{ scale: 0.9 }}
                onClick={handleToTS}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 text-accent hover:border-accent hover:bg-accent/5 transition-all shadow-[0_0_15px_rgba(139,92,246,0)] hover:shadow-[0_0_25px_rgba(139,92,246,0.2)]"
              >
                <FileJson size={28} />
              </motion.button>
            </Tooltip>
            <Tooltip text="CONVERT_TO_CSV_PROTOCOL">
              <motion.button
                whileHover={{ scale: 1.1, y: 5 }} whileTap={{ scale: 0.9 }}
                onClick={handleToCSV}
                className="p-6 rounded-3xl bg-white/5 border border-white/10 text-success hover:border-success hover:bg-success/5 transition-all"
              >
                <Table size={28} />
              </motion.button>
            </Tooltip>
          </div>

          {/* Output Panel */}
          <div className="glass-panel rounded-[40px] overflow-hidden flex flex-col h-[550px] md:h-[750px] border border-white/10 shadow-2xl">
            <div className="flex border-b border-white/10 bg-white/5 p-2">
              {['editor', 'tree', 'ts', 'csv'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 text-[10px] font-black tracking-[0.3em] uppercase transition-all rounded-2xl relative ${activeTab === tab ? 'text-primary bg-primary/10 shadow-inner' : 'text-muted hover:text-white hover:bg-white/5'
                    }`}
                >
                  {tab}
                  {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />}
                </button>
              ))}
            </div>

            <div className="p-8 flex-1 relative overflow-hidden bg-white/[0.01]">
              {activeTab === 'tree' ? (
                <div className="h-full flex flex-col">
                  <div className="flex gap-4 mb-6">
                    <div className="relative flex-1 group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={16} />
                      <input
                        type="text"
                        placeholder="Neural filter nodes..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs font-mono outline-none focus:border-primary/50 transition-all focus:bg-white/10"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                      />
                    </div>
                    <div className="relative flex-1 group">
                      <Command className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors" size={16} />
                      <input
                        type="text"
                        placeholder="JSONPath (e.g. $.items[0])"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs font-mono outline-none focus:border-accent/50 transition-all focus:bg-white/10"
                        value={jsonPath}
                        onChange={(e) => setJsonPath(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleEvaluatePath()}
                      />
                    </div>
                  </div>
                  <TreeViewer data={jsonInput ? (function () { try { return JSON.parse(jsonInput); } catch { return null; } })() : null} filter={filter} />
                </div>
              ) : (
                <textarea
                  readOnly
                  placeholder="// Awaiting manifestation instructions..."
                  className="w-full h-full p-8 bg-transparent text-white/90 text-xl font-mono outline-none resize-none custom-scrollbar selection:bg-accent/20"
                  value={jsonOutput}
                />
              )}
            </div>

            <div className="p-8 bg-white/5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex gap-10 text-[10px] font-black tracking-[0.2em] text-muted font-mono uppercase">
                <div className="flex flex-col"><span className="text-primary opacity-50 mb-1">MEM_SIZE</span> <span className="text-white text-sm">{stats.chars}</span></div>
                <div className="flex flex-col"><span className="text-accent opacity-50 mb-1">NODE_COUNT</span> <span className="text-white text-sm">{stats.nodes}</span></div>
                <div className="flex flex-col"><span className="text-success opacity-50 mb-1">LINE_COUNT</span> <span className="text-white text-sm">{stats.lines}</span></div>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <Tooltip text="Initiate data stream export">
                  <button onClick={handleDownload} className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-[10px] font-black tracking-widest transition-all border border-white/10">
                    <Download size={16} /> DOWNLOAD
                  </button>
                </Tooltip>
                <Tooltip text="Capture buffer to clipboard">
                  <button onClick={() => handleCopy('output')} className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-primary text-black text-[10px] font-black tracking-widest transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:scale-105">
                    <Copy size={16} /> {copied.output ? 'SYNCED' : 'COPY'}
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
}
