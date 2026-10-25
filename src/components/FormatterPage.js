'use client';

import { useState, useEffect } from 'react';
import WorkspaceLayout from '@/components/WorkspaceLayout';
import TreeViewer from '@/components/TreeViewer';
import { jsonToTypeScript, jsonToCsv, repairJson, evaluateJsonPath } from '@/lib/utils';
import { Maximize2, Minimize2, FileJson, Table, RefreshCw, Command, Search } from 'lucide-react';

export default function FormatterPage({ pageType = 'formatter' }) {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [activeTab, setActiveTab] = useState('editor');
  const [error, setError] = useState(null);
  const [indentSize, setIndentSize] = useState('2'); // '2', '4', 'tab'
  
  const [filter, setFilter] = useState('');
  const [jsonPath, setJsonPath] = useState('$');

  // Trigger format when input changes or indent size changes
  const handleFormat = (inputVal = jsonInput, size = indentSize) => {
    if (!inputVal.trim()) {
      setJsonOutput('');
      setError(null);
      return;
    }
    try {
      const parsed = JSON.parse(inputVal);
      const space = size === 'tab' ? '\t' : parseInt(size, 10);
      const formatted = JSON.stringify(parsed, null, space);
      setJsonOutput(formatted);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleMinify = () => {
    if (!jsonInput.trim()) return;
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed));
      setActiveTab('editor');
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleToTS = () => {
    if (!jsonInput.trim()) return;
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(jsonToTypeScript(parsed));
      setActiveTab('typescript');
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleToCSV = () => {
    if (!jsonInput.trim()) return;
    try {
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
    handleFormat(repaired, indentSize);
  };

  const handleEvaluatePath = () => {
    if (!jsonInput.trim()) return;
    try {
      const parsed = JSON.parse(jsonInput);
      const result = evaluateJsonPath(parsed, jsonPath);
      const space = indentSize === 'tab' ? '\t' : parseInt(indentSize, 10);
      setJsonOutput(JSON.stringify(result, null, space));
      setActiveTab('editor');
    } catch (e) {
      setError(e.message);
    }
  };

  // Load saved indentation size preference on mount
  useEffect(() => {
    const savedIndent = localStorage.getItem('revoxera_indent_preference');
    if (savedIndent) {
      setIndentSize(savedIndent);
    }
  }, []);

  // Run initial format on mount if there is default content and save preference
  useEffect(() => {
    localStorage.setItem('revoxera_indent_preference', indentSize);
    if (jsonInput) {
      handleFormat(jsonInput, indentSize);
    }
  }, [indentSize]);


  // Features list
  const features = [
    { title: 'Interactive Spacing', desc: 'Choose between 2 spaces, 4 spaces, or tab indentations dynamically.' },
    { title: 'Tree Node Viewer', desc: 'Explore deeply nested values with node counts, type indicators, and collapse toggles.' },
    { title: 'Conversion Sync', desc: 'Export formatted JSON payload instantly to TypeScript Interfaces or CSV arrays.' }
  ];

  // FAQ list
  const faq = [
    { q: 'Is my JSON secure?', a: 'Yes. All parsing, validation, and layout rendering happens strictly on your machine. No data is stored, uploaded, or transmitted.' },
    { q: 'Can I format nested arrays?', a: 'Absolutely. The formatting engine recursively processes arrays, dictionaries, and literal structures.' },
    { q: 'How do I query specific paths?', a: 'Select the tree tab on the output column and type a standard JSONPath query like $.items[0].name.' }
  ];

  // Related links
  const relatedTools = [
    { name: 'JSON Validator', href: '/json-validator' },
    { name: 'JSON Tree Viewer', href: '/json-viewer' },
    { name: 'JSON Minifier', href: '/json-minify' },
    { name: 'JSON Compare', href: '/json-compare' }
  ];

  // Controls JSX (Action Toolbar)
  const controls = (
    <div className="flex flex-row xl:flex-col items-center gap-2 p-2 bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl shrink-0">
      {/* Indentation group */}
      <div className="flex xl:flex-col items-center gap-1 bg-white dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-xl p-1 shrink-0">
        <span className="text-[9px] font-bold text-slate-500 uppercase hidden xl:block text-center py-0.5">Indent</span>
        {['2', '4', 'tab'].map(size => (
          <button
            key={size}
            onClick={() => setIndentSize(size)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              indentSize === size 
                ? 'bg-emerald-600 text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
            title={size === 'tab' ? 'Tab indentation' : `${size} spaces`}
            suppressHydrationWarning={true}
          >
            {size === 'tab' ? 'Tab' : `${size} SP`}
          </button>
        ))}
      </div>

      {/* Beautify button */}
      <button
        onClick={() => handleFormat(jsonInput, indentSize)}
        title="Format JSON"
        className="flex items-center gap-1.5 px-3.5 py-2.5 xl:w-full justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs hover:shadow transition-all shrink-0 cursor-pointer"
        suppressHydrationWarning={true}
      >
        <Maximize2 size={15} />
        <span>Format</span>
      </button>

      {/* Minify button */}
      <button
        onClick={handleMinify}
        title="Minify JSON"
        className="flex items-center gap-1.5 px-3 py-2.5 xl:w-full justify-center rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 font-semibold text-xs shadow-xs transition-all shrink-0 cursor-pointer"
        suppressHydrationWarning={true}
      >
        <Minimize2 size={15} />
        <span>Minify</span>
      </button>

      {/* TypeScript button */}
      <button
        onClick={handleToTS}
        title="Generate TypeScript interfaces"
        className="flex items-center gap-1.5 px-3 py-2.5 xl:w-full justify-center rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 font-semibold text-xs shadow-xs transition-all shrink-0 cursor-pointer"
        suppressHydrationWarning={true}
      >
        <FileJson size={15} className="text-emerald-600 dark:text-emerald-400" />
        <span>TypeScript</span>
      </button>

      {/* CSV button */}
      <button
        onClick={handleToCSV}
        title="Export to CSV"
        className="flex items-center gap-1.5 px-3 py-2.5 xl:w-full justify-center rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 font-semibold text-xs shadow-xs transition-all shrink-0 cursor-pointer"
        suppressHydrationWarning={true}
      >
        <Table size={15} className="text-emerald-600 dark:text-emerald-400" />
        <span>CSV</span>
      </button>
    </div>
  );

  // Custom Output Area depending on active tab
  const customOutputArea = activeTab === 'tree' ? (
    <div className="h-full flex flex-col">
      <div className="flex flex-col md:flex-row gap-3 mb-4 shrink-0">
        <div className="relative flex-1 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={14} />
          <input
            type="text"
            placeholder="Search nodes..."
            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs font-mono outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-black transition-all text-slate-900 dark:text-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            suppressHydrationWarning={true}
          />
        </div>
        <div className="relative flex-1 group">
          <Command className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={14} />
          <input
            type="text"
            placeholder="JSONPath (e.g. $.items[0])"
            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs font-mono outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-black transition-all text-slate-900 dark:text-white"
            value={jsonPath}
            onChange={(e) => setJsonPath(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEvaluatePath()}
            suppressHydrationWarning={true}
          />
        </div>
      </div>
      <TreeViewer data={jsonInput ? (function () { try { return JSON.parse(jsonInput); } catch { return null; } })() : null} filter={filter} />
    </div>
  ) : null;

  // Software Schema for SEO
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": pageType === 'pretty-print' ? "JSON Pretty Printer" : "JSON Formatter",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Beautify, indent, format, and structure JSON documents on the client-side with full privacy sandbox configurations."
  };

  return (
    <WorkspaceLayout
      title={pageType === 'pretty-print' ? 'JSON Pretty Print' : 'JSON Formatter'}
      h1={pageType === 'pretty-print' ? 'JSON Pretty Printer' : 'JSON Formatter & Beautifier'}
      intro="Paste raw, compressed data to format spacing, align indentation nodes, and structure interfaces instantly with zero latency."
      isHomePage={pageType === 'formatter'}
      
      inputValue={jsonInput}
      onInputChange={(val) => {
        setJsonInput(val);
        handleFormat(val, indentSize);
      }}
      outputValue={jsonOutput}
      
      tabs={['editor', 'tree', 'typescript', 'csv']}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      
      error={error}
      onRepair={handleRepair}
      onClear={() => {
        setJsonInput('');
        setJsonOutput('');
        setError(null);
      }}
      controls={controls}
      customOutputArea={customOutputArea}
      
      features={features}
      faq={faq}
      relatedTools={relatedTools}
      schema={softwareSchema}
    />
  );
}
