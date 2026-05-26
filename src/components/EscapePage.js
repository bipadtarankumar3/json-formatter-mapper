'use client';

import { useState } from 'react';
import WorkspaceLayout from '@/components/WorkspaceLayout';
import { Play } from 'lucide-react';

export default function EscapePage() {
  const [inputVal, setInputVal] = useState('');
  const [outputVal, setOutputVal] = useState('');
  const [mode, setMode] = useState('escape');

  const handleProcess = (val = inputVal, currentMode = mode) => {
    if (!val) {
      setOutputVal('');
      return;
    }

    if (currentMode === 'escape') {
      const escaped = JSON.stringify(val).slice(1, -1);
      setOutputVal(escaped);
    } else {
      try {
        const unescaped = JSON.parse('"' + val.replace(/"/g, '\\"') + '"');
        setOutputVal(unescaped);
      } catch {
        const fallback = val
          .replace(/\\"/g, '"')
          .replace(/\\'/g, "'")
          .replace(/\\\\/g, '\\')
          .replace(/\\n/g, '\n')
          .replace(/\\r/g, '\r')
          .replace(/\\t/g, '\t');
        setOutputVal(fallback);
      }
    }
  };

  const controls = (
    <div className="flex xl:flex-col gap-4 justify-center items-center">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-4 flex xl:flex-col gap-2">
        <label className="text-[8px] font-black text-slate-500 tracking-widest uppercase text-center xl:mb-2">Operation</label>
        <button
          onClick={() => {
            setMode('escape');
            handleProcess(inputVal, 'escape');
          }}
          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
            mode === 'escape' ? 'bg-primary text-black' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          suppressHydrationWarning={true}
        >
          ESCAPE
        </button>
        <button
          onClick={() => {
            setMode('unescape');
            handleProcess(inputVal, 'unescape');
          }}
          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
            mode === 'unescape' ? 'bg-primary text-black' : 'text-slate-400 hover:text-white'
          }`}
          suppressHydrationWarning={true}
        >
          UNESCAPE
        </button>
      </div>

      <button
        onClick={() => handleProcess()}
        className="p-5 rounded-3xl bg-primary text-black shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:scale-105 transition-all"
        title="Execute escape operation"
        suppressHydrationWarning={true}
      >
        <Play size={22} />
      </button>
    </div>
  );

  const faq = [
    { q: 'Why do I need to escape JSON strings?', a: 'JSON payload bodies embedded inside database strings or network structures must escape inner double quotes, backslashes, and carriage returns to avoid breaking outer quotes and syntax delimiters.' },
    { q: 'Does this tool support backslashes?', a: 'Yes. It converts raw quotes and backslashes to \\" and \\\\, and reverses them in unescape mode.' }
  ];

  const features = [
    { title: 'Standard JSON Spec', desc: 'Compliant with standard V8 JSON escape directives for secure parsing.' },
    { title: 'Safe Unescaping', desc: 'Corrects unescaped sequences, double-escaped strings, and raw spacing.' },
    { title: 'Local Sandbox Execution', desc: 'Secure local processing ensures system parameters and keys remain private.' }
  ];

  return (
    <WorkspaceLayout
      title="JSON Escape / Unescape"
      h1="JSON Escape / Unescape Tool"
      intro="Prepare data blocks for embedding. Escape special quotes, tabs, and backslashes, or unescape query parameters instantly."
      inputValue={inputVal}
      onInputChange={(val) => {
        setInputVal(val);
        handleProcess(val, mode);
      }}
      outputValue={outputVal}
      onClear={() => {
        setInputVal('');
        setOutputVal('');
      }}
      controls={controls}
      faq={faq}
      features={features}
      relatedTools={[
        { name: 'JSON Formatter', href: '/json-formatter' },
        { name: 'JSON Validator', href: '/json-validator' }
      ]}
    />
  );
}
