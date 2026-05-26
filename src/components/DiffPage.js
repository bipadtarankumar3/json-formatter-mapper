'use client';

import { useState, useEffect } from 'react';
import { diffLines } from '@/lib/diff';
import { Columns, List, Check, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import Link from 'next/link';

export default function DiffPage({ mode = 'diff' }) {
  const [inputA, setInputA] = useState('{\n  "name": "Revoxera",\n  "version": "1.0.0",\n  "active": true,\n  "tags": ["json", "format"]\n}');
  const [inputB, setInputB] = useState('{\n  "name": "Revoxera Tools",\n  "version": "1.0.1",\n  "tags": ["json", "format", "diff"],\n  "author": "Engineering"\n}');
  
  const [diffResult, setDiffResult] = useState([]);
  const [viewMode, setViewMode] = useState('side-by-side'); // 'side-by-side' or 'inline'
  const [ignoreFormat, setIgnoreFormat] = useState(true);
  const [error, setError] = useState(null);

  const handleCompare = () => {
    setError(null);
    let strA = inputA;
    let strB = inputB;

    if (ignoreFormat) {
      try {
        if (inputA.trim()) {
          const parsedA = JSON.parse(inputA);
          strA = JSON.stringify(parsedA, null, 2);
        }
      } catch (e) {
        setError('Original JSON is invalid: ' + e.message);
        return;
      }

      try {
        if (inputB.trim()) {
          const parsedB = JSON.parse(inputB);
          strB = JSON.stringify(parsedB, null, 2);
        }
      } catch (e) {
        setError('Modified JSON is invalid: ' + e.message);
        return;
      }
    }

    const linesDiff = diffLines(strA, strB);
    setDiffResult(linesDiff);
  };

  // Trigger compare on load or settings change
  useEffect(() => {
    handleCompare();
  }, [ignoreFormat]);

  const swapInputs = () => {
    const temp = inputA;
    setInputA(inputB);
    setInputB(temp);
    // Trigger compare immediately after state swap
    setTimeout(handleCompare, 0);
  };

  // Render Side-by-Side Panel
  const renderSideBySide = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10 text-xs font-mono select-text leading-relaxed">
        {/* LEFT COLUMN - ORIGINAL */}
        <div className="bg-[#05080e] p-6 max-h-[500px] overflow-y-auto custom-scrollbar space-y-0.5">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 sticky top-0 bg-[#05080e] py-1 border-b border-white/5">
            Original Source (Left)
          </div>
          {diffResult.map((line, idx) => {
            const isRemoved = line.type === 'removed';
            const isAdded = line.type === 'added';
            return (
              <div 
                key={`left-${idx}`}
                className={`flex gap-3 px-2 py-0.5 rounded ${
                  isRemoved ? 'bg-red-500/20 text-red-300 font-bold border-l-2 border-red-500' : isAdded ? 'opacity-20 select-none' : 'text-slate-400'
                }`}
              >
                <span className="w-8 select-none opacity-30 text-right">{line.oldLineNumber || ' '}</span>
                <span className="whitespace-pre">{isAdded ? ' ' : line.value}</span>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN - MODIFIED */}
        <div className="bg-[#05080e] p-6 max-h-[500px] overflow-y-auto custom-scrollbar space-y-0.5">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 sticky top-0 bg-[#05080e] py-1 border-b border-white/5">
            Modified Source (Right)
          </div>
          {diffResult.map((line, idx) => {
            const isAdded = line.type === 'added';
            const isRemoved = line.type === 'removed';
            return (
              <div 
                key={`right-${idx}`}
                className={`flex gap-3 px-2 py-0.5 rounded ${
                  isAdded ? 'bg-emerald-500/20 text-emerald-300 font-bold border-l-2 border-emerald-500' : isRemoved ? 'opacity-20 select-none' : 'text-slate-400'
                }`}
              >
                <span className="w-8 select-none opacity-30 text-right">{line.newLineNumber || ' '}</span>
                <span className="whitespace-pre">{isRemoved ? ' ' : line.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Inline Panel
  const renderInline = () => {
    return (
      <div className="bg-[#05080e] p-6 rounded-3xl border border-white/10 max-h-[500px] overflow-y-auto custom-scrollbar text-xs font-mono select-text leading-relaxed">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">
          Unified Timeline View
        </div>
        <div className="space-y-0.5">
          {diffResult.map((line, idx) => {
            const isAdded = line.type === 'added';
            const isRemoved = line.type === 'removed';
            
            return (
              <div 
                key={`inline-${idx}`}
                className={`flex gap-4 px-3 py-0.5 rounded ${
                  isAdded 
                    ? 'bg-emerald-500/15 text-emerald-300 border-l-2 border-emerald-500' 
                    : isRemoved 
                    ? 'bg-red-500/15 text-red-300 border-l-2 border-red-500' 
                    : 'text-slate-400'
                }`}
              >
                <span className="w-8 select-none opacity-20 text-right">{line.oldLineNumber || ' '}</span>
                <span className="w-8 select-none opacity-20 text-right">{line.newLineNumber || ' '}</span>
                <span className="select-none opacity-40 font-bold w-3">{isAdded ? '+' : isRemoved ? '-' : ' '}</span>
                <span className="whitespace-pre-wrap break-all">{line.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen cyber-grid pb-20 relative overflow-hidden">
      <div className="scanline" />

      <div className="container mx-auto px-4 md:px-6 animate-fade-in max-w-[1600px] relative z-10 pt-8">
        
        {/* Breadcrumb */}
        <nav className="mb-6 text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-primary transition-colors">TOOLS</Link>
          <span>/</span>
          <span className="text-primary">{mode === 'diff' ? 'JSON DIFF' : 'JSON COMPARE'}</span>
        </nav>

        {/* Hero Landing */}
        <section className="text-center mb-8 max-w-[1200px] mx-auto">
          <div className="inline-block mb-4 px-5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
            <span className="text-[9px] font-black tracking-[0.3em] text-primary uppercase flex items-center gap-2 justify-center">
              <Layers size={10} /> Local Multi-payload inspection
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-none text-white uppercase">
            {mode === 'diff' ? 'JSON Diff Tool' : 'JSON Compare Tool'}
          </h1>
          <p className="text-sm md:text-base text-slate-400 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Upload two payloads to check differences, track property changes, analyze structural variances, and sync revisions.
          </p>
        </section>

        {/* Dynamic Dual Input Panel */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
          
          {/* Input A */}
          <div className="glass-panel rounded-[30px] overflow-hidden border border-white/10 flex flex-col h-[350px]">
            <div className="p-4 flex justify-between items-center border-b border-white/10 bg-white/5">
              <span className="text-[10px] font-black text-primary tracking-widest uppercase">Original JSON (Input A)</span>
              <button 
                onClick={() => setInputA('')} 
                className="text-[9px] font-black text-slate-500 hover:text-white uppercase transition-colors"
                suppressHydrationWarning={true}
              >
                Clear
              </button>
            </div>
            <textarea
              placeholder="// Paste original JSON block here..."
              className="flex-1 p-6 bg-transparent text-white font-mono text-sm outline-none resize-none custom-scrollbar"
              value={inputA}
              onChange={(e) => setInputA(e.target.value)}
            />
          </div>

          {/* Input B */}
          <div className="glass-panel rounded-[30px] overflow-hidden border border-white/10 flex flex-col h-[350px]">
            <div className="p-4 flex justify-between items-center border-b border-white/10 bg-white/5">
              <span className="text-[10px] font-black text-accent tracking-widest uppercase">Modified JSON (Input B)</span>
              <button 
                onClick={() => setInputB('')} 
                className="text-[9px] font-black text-slate-500 hover:text-white uppercase transition-colors"
                suppressHydrationWarning={true}
              >
                Clear
              </button>
            </div>
            <textarea
              placeholder="// Paste modified JSON block here..."
              className="flex-1 p-6 bg-transparent text-white font-mono text-sm outline-none resize-none custom-scrollbar"
              value={inputB}
              onChange={(e) => setInputB(e.target.value)}
            />
          </div>
        </section>

        {/* Global Toolbar and Controls */}
        <section className="glass-panel rounded-[24px] border border-white/10 p-5 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <button 
              onClick={handleCompare}
              className="px-6 py-3 rounded-xl bg-primary text-black font-black text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:scale-105 transition-all"
              suppressHydrationWarning={true}
            >
              Compare Payloads
            </button>
            <button 
              onClick={swapInputs}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-bold transition-all flex items-center gap-2 border border-white/10"
              suppressHydrationWarning={true}
            >
              <RefreshCw size={12} /> Swap A ⇄ B
            </button>
          </div>

          <div className="flex flex-wrap gap-6 items-center">
            <label className="flex items-center gap-3 text-xs font-bold text-slate-400 cursor-pointer">
              <input 
                type="checkbox" 
                checked={ignoreFormat}
                onChange={(e) => setIgnoreFormat(e.target.checked)}
                className="rounded border-white/10 bg-black/40 text-primary focus:ring-primary w-4 h-4"
                suppressHydrationWarning={true}
              />
              <span>Ignore Formatting differences</span>
            </label>

            <div className="bg-white/5 border border-white/10 rounded-xl p-1 flex gap-1">
              <button
                onClick={() => setViewMode('side-by-side')}
                className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-[10px] font-black uppercase ${
                  viewMode === 'side-by-side' ? 'bg-primary text-black' : 'text-slate-400 hover:text-white'
                }`}
                title="Side-by-side comparison"
                suppressHydrationWarning={true}
              >
                <Columns size={12} /> Split
              </button>
              <button
                onClick={() => setViewMode('inline')}
                className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-[10px] font-black uppercase ${
                  viewMode === 'inline' ? 'bg-primary text-black' : 'text-slate-400 hover:text-white'
                }`}
                title="Inline unified timeline"
                suppressHydrationWarning={true}
              >
                <List size={12} /> Unified
              </button>
            </div>
          </div>
        </section>

        {/* Validation Errors panel */}
        {error && (
          <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-mono mb-8 flex items-center gap-3">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Visual Difference Highlighting Grid */}
        <section className="glass-panel rounded-[40px] border border-white/10 p-6 md:p-8 shadow-2xl relative">
          {diffResult.length > 0 ? (
            viewMode === 'side-by-side' ? renderSideBySide() : renderInline()
          ) : (
            <div className="py-20 text-center text-slate-500 opacity-30">
              <Columns className="w-16 h-16 mx-auto mb-4" />
              <p className="text-xs font-mono">No comparison trace executed.</p>
            </div>
          )}
        </section>

        {/* FAQ Page SEO Sections */}
        <section className="mt-16 max-w-4xl">
          <h2 className="text-xl font-black text-white mb-6 uppercase tracking-tight font-mono">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="glass-panel rounded-2xl p-5 border border-white/5">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">How does JSON compare work?</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Our diff engine runs a line-by-line comparison using a Longest Common Subsequence (LCS) layout. It maps changes in matching arrays, identifies nested keys, and isolates added, deleted, or modified lines.
              </p>
            </div>
            <div className="glass-panel rounded-2xl p-5 border border-white/5">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">What does "Ignore Formatting" do?</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                When active, both input blocks are parsed into JavaScript objects and pretty-printed with identical indentation (2 spaces) before comparing. This filters out false differences caused by tab indentation styles or layout linebreaks.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
