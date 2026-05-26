'use client';

import { useState } from 'react';
import WorkspaceLayout from '@/components/WorkspaceLayout';
import { ShieldCheck, AlertTriangle, CheckCircle, Wand2 } from 'lucide-react';
import { repairJson } from '@/lib/utils';

export default function ValidatorPage() {
  const [jsonInput, setJsonInput] = useState('');
  const [validationResult, setValidationResult] = useState(null);

  const handleValidate = (inputVal = jsonInput) => {
    if (!inputVal.trim()) {
      setValidationResult(null);
      return;
    }

    try {
      JSON.parse(inputVal);
      setValidationResult({
        valid: true,
        message: 'JSON structure is 100% valid! No anomalies detected.',
        line: null,
        column: null,
      });
    } catch (err) {
      const message = err.message;
      const lineColMatch = message.match(/line (\d+) column (\d+)/i);
      
      let line = 1;
      let column = 1;

      if (lineColMatch) {
        line = parseInt(lineColMatch[1], 10);
        column = parseInt(lineColMatch[2], 10);
      } else {
        const posMatch = message.match(/position (\d+)/i);
        if (posMatch) {
          const pos = parseInt(posMatch[1], 10);
          const lines = inputVal.substring(0, pos).split('\n');
          line = lines.length;
          column = lines[lines.length - 1].length + 1;
        }
      }

      setValidationResult({
        valid: false,
        message: message,
        line,
        column,
      });
    }
  };

  const handleRepair = () => {
    const repaired = repairJson(jsonInput);
    setJsonInput(repaired);
    handleValidate(repaired);
  };

  const renderErrorContext = () => {
    if (!validationResult || validationResult.valid || !jsonInput) return null;

    const lines = jsonInput.split('\n');
    const errLine = validationResult.line;
    const startIdx = Math.max(0, errLine - 4);
    const endIdx = Math.min(lines.length - 1, errLine + 2);

    return (
      <div className="border border-white/10 rounded-2xl overflow-hidden bg-black/40 font-mono text-xs select-text">
        <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-2 text-[10px] font-black text-red-400 tracking-wider">
          SYNTAX ERROR TRACE [LINE {errLine}, COL {validationResult.column}]
        </div>
        <div className="p-4 space-y-1">
          {lines.slice(startIdx, endIdx + 1).map((lineText, idx) => {
            const actualLineNum = startIdx + idx + 1;
            const isErrorLine = actualLineNum === errLine;
            return (
              <div 
                key={actualLineNum} 
                className={`flex gap-4 py-1 px-2 rounded ${
                  isErrorLine ? 'bg-red-500/20 text-red-300 font-bold border-l-2 border-red-500' : 'text-slate-500'
                }`}
              >
                <span className="w-8 select-none opacity-40 text-right">{actualLineNum}</span>
                <span className="whitespace-pre-wrap break-all">{lineText || ' '}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const customOutputArea = (
    <div className="h-full flex flex-col justify-start gap-6 overflow-y-auto custom-scrollbar">
      {validationResult ? (
        validationResult.valid ? (
          <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center text-center gap-4 py-12">
            <CheckCircle className="w-16 h-16 text-emerald-400 animate-pulse" />
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">LINT_PASSED</h3>
            <p className="text-xs text-slate-400 font-light max-w-sm">
              Your JSON is well-formed, contains valid delimiters, and matches parsing standards. Ready to deploy or commit.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-red-400 font-bold text-sm uppercase">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
                LINT_FAILED
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {validationResult.message}
              </p>
            </div>
            {renderErrorContext()}
          </div>
        )
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-30">
          <ShieldCheck className="w-16 h-16 mb-4 text-slate-500" />
          <p className="text-xs font-mono">Awaiting parser execution sequence...</p>
        </div>
      )}
    </div>
  );

  const controls = (
    <div className="flex xl:flex-col gap-4 justify-center items-center">
      <button
        onClick={() => handleValidate()}
        className="p-5 rounded-3xl bg-primary text-black shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:scale-105 transition-all"
        title="Trigger validation lint"
      >
        <ShieldCheck size={22} />
      </button>
      {jsonInput && validationResult && !validationResult.valid && (
        <button
          onClick={handleRepair}
          title="Auto-repair code errors"
          className="p-5 rounded-3xl bg-white/5 border border-white/10 text-accent hover:bg-white/10 transition-all animate-bounce"
        >
          <Wand2 size={22} />
        </button>
      )}
    </div>
  );

  const faq = [
    { q: 'How does the validator detect errors?', a: 'It uses standard browser parser tokens. When parsing fails, it extracts the character index or match parameters from the V8 error object, converting it into line and column coordinate grids.' },
    { q: 'Is there a file size limit?', a: 'For files above 3MB, interactive context views are throttled to save memory, but validation tests run instantly.' }
  ];

  const features = [
    { title: 'Line and Col Trace', desc: 'Identify the exact column and line index coordinate where syntax tokens break.' },
    { title: 'Context Highlighting', desc: 'Inspect a preview snippet of the code surrounding the failure, shaded in red.' },
    { title: 'One-click Repair', desc: 'Auto-correct trailing delimiters, quote mismatches, and unquoted identifiers instantly.' }
  ];

  return (
    <WorkspaceLayout
      title="JSON Validator"
      h1="JSON Validator & Linter"
      intro="Analyze syntax structure. Locate column anomalies, trace delimiter mismatches, and validate compliance formats locally."
      inputValue={jsonInput}
      onInputChange={(val) => {
        setJsonInput(val);
        handleValidate(val);
      }}
      outputValue={validationResult?.message || ''}
      error={validationResult && !validationResult.valid ? validationResult.message : null}
      onRepair={handleRepair}
      onClear={() => {
        setJsonInput('');
        setValidationResult(null);
      }}
      controls={controls}
      customOutputArea={customOutputArea}
      faq={faq}
      features={features}
      relatedTools={[
        { name: 'JSON Formatter', href: '/json-formatter' },
        { name: 'JSON Compare', href: '/json-compare' },
        { name: 'JSON Editor', href: '/json-editor' }
      ]}
    />
  );
}
