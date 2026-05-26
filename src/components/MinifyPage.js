'use client';

import { useState } from 'react';
import WorkspaceLayout from '@/components/WorkspaceLayout';
import { Minimize2 } from 'lucide-react';

export default function MinifyPage() {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState(null);

  const handleMinify = (val = jsonInput) => {
    if (!val.trim()) {
      setJsonOutput('');
      setError(null);
      return;
    }
    try {
      const parsed = JSON.parse(val);
      const minified = JSON.stringify(parsed);
      setJsonOutput(minified);
      setError(null);
    } catch (e) {
      setError(e.message);
      const simplified = val.replace(/\s+(?=(?:[^"]*"[^"]*")*[^"]*$)/g, '');
      setJsonOutput(simplified);
    }
  };

  const controls = (
    <div className="flex xl:flex-col gap-4 justify-center items-center">
      <button
        onClick={() => handleMinify()}
        className="p-5 rounded-3xl bg-primary text-black shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:scale-105 transition-all"
        title="Execute minification"
      >
        <Minimize2 size={22} />
      </button>
    </div>
  );

  const faq = [
    { q: 'Why should I minify JSON?', a: 'Minification removes all optional characters (like spaces, tabs, and line breaks) from the document, reducing its file size and saving network bandwidth during transit.' },
    { q: 'Can I restore minified JSON?', a: 'Yes. You can paste your minified JSON output directly into our JSON Formatter to restore clean spacing and indentation.' }
  ];

  const features = [
    { title: 'Maximum Compression', desc: 'Remove every redundant carriage return, spacing token, and tab character.' },
    { title: 'Fallback Stripping', desc: 'If parsing fails, a custom regex parses and strips spacing without throwing error blocks.' },
    { title: 'Size Optimization', desc: 'Instantly view the reduction in file size in the execution status bar.' }
  ];

  return (
    <WorkspaceLayout
      title="JSON Minifier"
      h1="JSON Minifier & Compressor"
      intro="Remove redundant white space, carriage returns, and tabs to minimize network load and increase API transfer speed."
      inputValue={jsonInput}
      onInputChange={(val) => {
        setJsonInput(val);
        handleMinify(val);
      }}
      outputValue={jsonOutput}
      error={error}
      onClear={() => {
        setJsonInput('');
        setJsonOutput('');
        setError(null);
      }}
      controls={controls}
      faq={faq}
      features={features}
      relatedTools={[
        { name: 'JSON Formatter', href: '/json-formatter' },
        { name: 'JSON Validator', href: '/json-validator' },
        { name: 'YAML to JSON', href: '/yaml-to-json' }
      ]}
    />
  );
}
