'use client';

import { useState } from 'react';
import WorkspaceLayout from '@/components/WorkspaceLayout';
import TreeViewer from '@/components/TreeViewer';
import { Search, Command } from 'lucide-react';
import { evaluateJsonPath } from '@/lib/utils';

export default function ViewerPage() {
  const [jsonInput, setJsonInput] = useState('');
  const [filter, setFilter] = useState('');
  const [jsonPath, setJsonPath] = useState('$');
  const [evaluatedData, setEvaluatedData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (val) => {
    setJsonInput(val);
    setError(null);
    if (!val.trim()) {
      setEvaluatedData(null);
      return;
    }
    try {
      const parsed = JSON.parse(val);
      setEvaluatedData(parsed);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleEvaluatePath = () => {
    if (!jsonInput.trim()) return;
    try {
      const parsed = JSON.parse(jsonInput);
      const result = evaluateJsonPath(parsed, jsonPath);
      setEvaluatedData(result);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const customOutputArea = (
    <div className="h-full flex flex-col">
      <div className="flex flex-col md:flex-row gap-3 mb-4 shrink-0">
        <div className="relative flex-1 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={14} />
          <input
            type="text"
            placeholder="Search matching key/value..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono outline-none focus:border-primary/50 transition-all focus:bg-white/10 text-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="relative flex-1 group">
          <Command className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent transition-colors" size={14} />
          <input
            type="text"
            placeholder="JSONPath (e.g. $.items[0].id)"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono outline-none focus:border-accent/50 transition-all focus:bg-white/10 text-white"
            value={jsonPath}
            onChange={(e) => setJsonPath(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEvaluatePath()}
          />
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        {evaluatedData !== null ? (
          <TreeViewer data={evaluatedData} filter={filter} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 opacity-30 py-20">
            <Search className="w-16 h-16 mb-4" />
            <p className="text-xs font-mono">Tree inspector waiting for syntax payload...</p>
          </div>
        )}
      </div>
    </div>
  );

  const controls = (
    <div className="flex xl:flex-col gap-4 justify-center items-center">
      <button
        onClick={handleEvaluatePath}
        className="p-5 rounded-3xl bg-primary text-black shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:scale-105 transition-all"
        title="Execute JSONPath query"
      >
        <Command size={22} />
      </button>
    </div>
  );

  const faq = [
    { q: 'What is JSONPath?', a: 'JSONPath is a query language for JSON, similar to XPath for XML. It allows you to select and filter elements from deep nested object nodes.' },
    { q: 'How do I copy a specific path?', a: 'Hover over a node in the tree list to view its depth index, then use standard paths starting with $ to fetch elements in code.' }
  ];

  const features = [
    { title: 'Interactive Collapsing', desc: 'Expand or collapse node groups hierarchically with single-click selectors.' },
    { title: 'Dynamic Filtering', desc: 'Highlight and isolate matching keys or values instantly without visual lag.' },
    { title: 'JSONPath Queries', desc: 'Evaluate specific nodes or array values using standard query syntax.' }
  ];

  return (
    <WorkspaceLayout
      title="JSON Tree Viewer"
      h1="JSON Tree Viewer & Node Inspector"
      intro="Translate raw data strings into an interactive visual hierarchy. Query elements with JSONPath and search nodes instantly."
      inputValue={jsonInput}
      onInputChange={handleInputChange}
      outputValue={JSON.stringify(evaluatedData, null, 2) || ''}
      error={error}
      onClear={() => {
        setJsonInput('');
        setEvaluatedData(null);
        setError(null);
      }}
      controls={controls}
      customOutputArea={customOutputArea}
      faq={faq}
      features={features}
      relatedTools={[
        { name: 'JSON Formatter', href: '/json-formatter' },
        { name: 'JSON Editor', href: '/json-editor' },
        { name: 'JSON Validator', href: '/json-validator' }
      ]}
    />
  );
}
