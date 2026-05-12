'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Copy, Share2, Download, Trash2, Settings, Code,
  CheckCircle, ShieldCheck, Zap as ZapIcon, Check, Star,
  Type, Hash, FileText, Sparkles, Rocket, HelpCircle, 
  Lock, MessageSquare, Trophy, Plus, Brackets, Layers, 
  Maximize2, Minimize2, RefreshCw
} from 'lucide-react';

export default function JsonFormatterMapper() {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copiedInput, setCopiedInput] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  useEffect(() => {
    if (copiedInput) {
      const timer = setTimeout(() => setCopiedInput(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedInput]);

  useEffect(() => {
    if (copiedOutput) {
      const timer = setTimeout(() => setCopiedOutput(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedOutput]);

  const handleFormat = () => {
    try {
      if (!jsonInput.trim()) return;
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonOutput(formatted);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleMinify = () => {
    try {
      if (!jsonInput.trim()) return;
      const parsed = JSON.parse(jsonInput);
      const minified = JSON.stringify(parsed);
      setJsonOutput(minified);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleValidate = () => {
    try {
      if (!jsonInput.trim()) {
        setError(null);
        return;
      }
      JSON.parse(jsonInput);
      setError(null);
      alert('JSON is valid!');
    } catch (e) {
      setError(e.message);
    }
  };

  const handleClear = () => {
    setJsonInput('');
    setJsonOutput('');
    setError(null);
  };

  const handleCopy = () => {
    const textToCopy = jsonOutput || jsonInput;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
  };

  const handleCopyInput = () => {
    if (!jsonInput) return;
    navigator.clipboard.writeText(jsonInput);
    setCopiedInput(true);
  };

  const handleCopyOutput = () => {
    if (!jsonOutput) return;
    navigator.clipboard.writeText(jsonOutput);
    setCopiedOutput(true);
  };

  const handleDownload = () => {
    const textToDownload = jsonOutput || jsonInput;
    if (!textToDownload) return;
    const element = document.createElement("a");
    const file = new Blob([textToDownload], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = "transformed.json";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getStats = () => {
    try {
      const chars = jsonInput.length;
      const lines = jsonInput.split('\n').length;
      const parsed = jsonInput.trim() ? JSON.parse(jsonInput) : null;
      const nodes = parsed ? countNodes(parsed) : 0;
      return { chars, lines, nodes };
    } catch {
      return { chars: jsonInput.length, lines: jsonInput.split('\n').length, nodes: 0 };
    }
  };

  const countNodes = (obj) => {
    if (typeof obj !== 'object' || obj === null) return 1;
    let count = 1;
    for (let key in obj) {
      count += countNodes(obj[key]);
    }
    return count;
  };

  const stats = getStats();

  return (
    <div className="container mx-auto px-4 md:px-6 animate-fade-in max-w-[1600px]">
      <section className="text-center mb-8 md:mb-10 max-w-[1200px] mx-auto pt-10 md:pt-10">
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 leading-none bg-gradient-to-b from-white to-muted bg-clip-text text-transparent">
          Master the <span className="inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-2 after:bg-primary/40 after:blur-lg after:-z-10">STRUCTURE</span> of your data.
        </h1>
        <p className="text-base md:text-xl text-muted leading-relaxed mx-auto">
          Professional-grade JSON formatting and mapping with a stunning glassmorphic interface.
        </p>
      </section>

      <section className="relative z-10">
        <div className="bg-glass backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-premium overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {/* Input Area */}
            <div className="p-4 md:p-10 pb-5">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-bold text-primary flex items-center gap-2">
                  <Code size={16} /> INPUT JSON
                </label>
                <div className="flex items-center gap-3">
                  {error && <span className="text-xs text-red-400 font-medium">Invalid JSON: {error}</span>}
                  <button onClick={handleCopyInput} className="text-muted hover:text-primary p-1.5 rounded-lg bg-white/5 transition-all" title="Copy input">
                    {copiedInput ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
              <textarea
                ref={textareaRef}
                placeholder="Paste your messy JSON here..."
                className="w-full h-[300px] md:h-[400px] bg-transparent border-none text-white text-lg md:text-xl resize-none outline-none leading-relaxed font-mono placeholder:text-white/20"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
              />
            </div>

            {/* Output Area */}
            <div className="p-4 md:p-10 pb-5 bg-white/[0.01]">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-bold text-accent flex items-center gap-2">
                  <Brackets size={16} /> FORMATTED OUTPUT
                </label>
                <button onClick={handleCopyOutput} className="text-muted hover:text-accent p-1.5 rounded-lg bg-white/5 transition-all" title="Copy formatted output">
                  {copiedOutput ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                </button>
              </div>
              <textarea
                readOnly
                placeholder="Formatted output will appear here..."
                className="w-full h-[300px] md:h-[400px] bg-transparent border-none text-white text-lg md:text-xl resize-none outline-none leading-relaxed font-mono placeholder:text-white/20"
                value={jsonOutput}
              />
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center p-2 md:px-10 md:py-2 bg-white/[0.02] border-t border-b border-white/10 gap-4">
            <div className="flex gap-4">
              <button onClick={handleCopy} className="text-muted p-2.5 rounded-xl bg-white/[0.03] border border-transparent hover:bg-white/[0.08] hover:text-primary hover:border-white/10 transition-all hover:-translate-y-0.5" title="Copy to clipboard">
                {copied ? <Check size={20} className="text-success" /> : <Copy size={20} />}
              </button>
              <button onClick={handleDownload} className="text-muted p-2.5 rounded-xl bg-white/[0.03] border border-transparent hover:bg-white/[0.08] hover:text-primary hover:border-white/10 transition-all hover:-translate-y-0.5" title="Download .json"><Download size={20} /></button>
              <button onClick={handleClear} className="text-muted p-2.5 rounded-xl bg-white/[0.03] border border-transparent hover:bg-white/[0.08] hover:text-primary hover:border-white/10 transition-all hover:-translate-y-0.5" title="Clear all"><Trash2 size={20} /></button>
              <button onClick={handleValidate} className="text-muted p-2.5 rounded-xl bg-white/[0.03] border border-transparent hover:bg-white/[0.08] hover:text-primary hover:border-white/10 transition-all hover:-translate-y-0.5" title="Validate JSON"><ShieldCheck size={20} /></button>
            </div>
            <div className="flex gap-4 md:gap-8 text-sm text-muted">
              <div className="flex items-center gap-2"><Hash size={16} /> <span><strong className="text-white text-lg">{stats.chars}</strong> Chars</span></div>
              <div className="flex items-center gap-2"><Layers size={16} /> <span><strong className="text-white text-lg">{stats.nodes}</strong> Nodes</span></div>
              <div className="flex items-center gap-2"><FileText size={16} /> <span><strong className="text-white text-lg">{stats.lines}</strong> Lines</span></div>
            </div>
          </div>

          {/* Main Controls */}
          <div className="p-4 md:p-6 flex flex-wrap justify-center gap-4">
            <button 
              onClick={handleFormat}
              className="group relative overflow-hidden flex items-center justify-center gap-3 px-8 py-4 bg-primary text-slate-950 font-black rounded-2xl transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_-5px_rgba(56,189,248,0.4)]"
            >
              <Maximize2 size={20} />
              <span>Format JSON</span>
            </button>
            <button 
              onClick={handleMinify}
              className="group relative overflow-hidden flex items-center justify-center gap-3 px-8 py-4 bg-white/[0.05] border border-white/10 text-white font-bold rounded-2xl transition-all hover:-translate-y-1 hover:bg-white/[0.1] hover:border-accent"
            >
              <Minimize2 size={20} />
              <span>Minify JSON</span>
            </button>
            <button 
              onClick={() => {}}
              className="group relative overflow-hidden flex items-center justify-center gap-3 px-8 py-4 bg-white/[0.05] border border-white/10 text-white font-bold rounded-2xl transition-all hover:-translate-y-1 hover:bg-white/[0.1] hover:border-accent"
            >
              <RefreshCw size={20} />
              <span>JSON to YAML</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 md:mt-20">
        <article className="p-8 md:p-12 bg-white/[0.02] rounded-[32px] border border-white/10 relative overflow-hidden group hover:border-primary hover:-translate-y-2 transition-all duration-500">
          <div className="w-14 h-14 flex items-center justify-center bg-primary/10 text-primary rounded-2xl mb-8 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
            <ZapIcon size={28} />
          </div>
          <h3 className="text-2xl font-extrabold mb-5 text-white">Instant Validation</h3>
          <p className="text-muted text-lg leading-relaxed">Our engine validates your JSON structure in real-time, pointing out exact syntax errors.</p>
        </article>
        <article className="p-8 md:p-12 bg-white/[0.02] rounded-[32px] border border-white/10 relative overflow-hidden group hover:border-accent hover:-translate-y-2 transition-all duration-500">
          <div className="w-14 h-14 flex items-center justify-center bg-accent/10 text-accent rounded-2xl mb-8 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all">
            <Layers size={28} />
          </div>
          <h3 className="text-2xl font-extrabold mb-5 text-white">Mapping Engine</h3>
          <p className="text-muted text-lg leading-relaxed">Coming soon: Visualize your JSON as a tree and map fields across different structures.</p>
        </article>
        <article className="p-8 md:p-12 bg-white/[0.02] rounded-[32px] border border-white/10 relative overflow-hidden group hover:border-primary hover:-translate-y-2 transition-all duration-500">
          <div className="w-14 h-14 flex items-center justify-center bg-primary/10 text-primary rounded-2xl mb-8 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
            <ShieldCheck size={28} />
          </div>
          <h3 className="text-2xl font-extrabold mb-5 text-white">Private & Secure</h3>
          <p className="text-muted text-lg leading-relaxed">Your data never leaves your browser. All transformations are performed locally for maximum security.</p>
        </article>
      </section>

      {/* FAQ/How it works */}
      <section className="mt-12 md:mt-24 pb-20">
        <h2 className="text-4xl md:text-6xl font-black mb-16 text-center tracking-tighter">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <details className="group bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden transition-all">
            <summary className="flex items-center gap-4 p-6 font-bold text-lg cursor-pointer hover:bg-white/[0.03] transition-all list-none">
              <HelpCircle size={20} className="text-primary" />
              <span>What is JSON Formatting?</span>
              <Plus className="ml-auto group-open:rotate-45 transition-transform" />
            </summary>
            <div className="p-6 pt-0 text-muted leading-relaxed border-t border-white/5 mt-4">
              JSON formatting (or beautifying) involves adding whitespace and indentation to a JSON string to make it human-readable.
            </div>
          </details>
          <details className="group bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden transition-all">
            <summary className="flex items-center gap-4 p-6 font-bold text-lg cursor-pointer hover:bg-white/[0.03] transition-all list-none">
              <Lock size={20} className="text-primary" />
              <span>Is my JSON data safe?</span>
              <Plus className="ml-auto group-open:rotate-45 transition-transform" />
            </summary>
            <div className="p-6 pt-0 text-muted leading-relaxed border-t border-white/5 mt-4">
              Yes! Like all our tools, the JSON Formatter and Mapper runs entirely in your browser. We don't store or transmit your data to any server.
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
