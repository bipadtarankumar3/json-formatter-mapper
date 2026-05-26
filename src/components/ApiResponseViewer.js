'use client';

import { useState } from 'react';
import WorkspaceLayout from '@/components/WorkspaceLayout';
import TreeViewer from '@/components/TreeViewer';
import { Send, Globe, ChevronRight, Activity } from 'lucide-react';

export default function ApiResponseViewer() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [method, setMethod] = useState('GET');
  const [authType, setAuthType] = useState('none');
  const [authToken, setAuthToken] = useState('');
  const [headers, setHeaders] = useState([{ key: 'Accept', value: 'application/json' }]);
  const [reqBody, setReqBody] = useState('');
  
  const [responseResult, setResponseResult] = useState(null);
  const [activeTab, setActiveTab] = useState('editor');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addHeaderRow = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const removeHeaderRow = (idx) => {
    setHeaders(headers.filter((_, i) => i !== idx));
  };

  const updateHeaderRow = (idx, field, val) => {
    const updated = [...headers];
    updated[idx][field] = val;
    setHeaders(updated);
  };

  const handleSendRequest = async () => {
    if (!url.trim()) return;
    setIsLoading(false);
    setError(null);
    setIsLoading(true);

    try {
      const requestHeaders = {};
      headers.forEach(h => {
        if (h.key.trim() && h.value.trim()) {
          requestHeaders[h.key.trim()] = h.value.trim();
        }
      });

      if (authType === 'bearer' && authToken) {
        requestHeaders['Authorization'] = `Bearer ${authToken}`;
      } else if (authType === 'basic' && authToken) {
        requestHeaders['Authorization'] = `Basic ${btoa(authToken)}`;
      }

      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          method,
          headers: requestHeaders,
          body: method !== 'GET' && method !== 'HEAD' ? reqBody : null
        })
      });

      const result = await res.json();
      
      if (result.error) {
        setError(result.error);
        setResponseResult(null);
      } else {
        setResponseResult({
          status: result.status,
          statusText: result.statusText,
          headers: result.headers,
          data: result.data,
          latency: result.latency
        });
        
        try {
          JSON.parse(result.data);
          setActiveTab('tree');
        } catch {
          setActiveTab('editor');
        }
      }
    } catch (err) {
      setError(err.message);
      setResponseResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const requestArea = (
    <div className="space-y-6 h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="flex gap-2">
        <select 
          value={method} 
          onChange={(e) => setMethod(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-2xl px-3 py-3 text-xs font-black text-primary outline-none focus:border-primary/50"
        >
          {['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'].map(m => (
            <option key={m} value={m} className="bg-[#020617]">{m}</option>
          ))}
        </select>
        <div className="relative flex-1 group">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input
            type="text"
            placeholder="Enter API Endpoint (e.g. https://api.site.com/data)"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs font-mono outline-none focus:border-primary/50 text-white"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            suppressHydrationWarning={true}
          />
        </div>
      </div>

      <div className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Authorization</span>
          <select 
            value={authType} 
            onChange={(e) => setAuthType(e.target.value)}
            className="bg-transparent border border-white/10 rounded-xl px-3 py-1.5 text-[10px] font-bold text-white outline-none"
          >
            <option value="none" className="bg-[#020617]">None</option>
            <option value="bearer" className="bg-[#020617]">Bearer Token</option>
            <option value="basic" className="bg-[#020617]">Basic Auth</option>
          </select>
        </div>
        {authType !== 'none' && (
          <input
            type="password"
            placeholder={authType === 'bearer' ? 'Paste Bearer token here...' : 'username:password credentials'}
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono outline-none focus:border-primary/50 text-white"
            suppressHydrationWarning={true}
          />
        )}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Headers</span>
          <button 
            onClick={addHeaderRow}
            className="text-[9px] font-black text-primary hover:text-white uppercase transition-colors"
            suppressHydrationWarning={true}
          >
            + Add Header
          </button>
        </div>
        <div className="space-y-2">
          {headers.map((h, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Key (e.g. Content-Type)"
                value={h.key}
                onChange={(e) => updateHeaderRow(i, 'key', e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono outline-none text-white"
                suppressHydrationWarning={true}
              />
              <input
                type="text"
                placeholder="Value"
                value={h.value}
                onChange={(e) => updateHeaderRow(i, 'value', e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono outline-none text-white"
                suppressHydrationWarning={true}
              />
              <button 
                onClick={() => removeHeaderRow(i)}
                className="text-red-400 hover:text-red-300 px-2 font-bold text-xs"
                suppressHydrationWarning={true}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {method !== 'GET' && method !== 'HEAD' && (
        <div className="space-y-2">
          <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase block">Request Body</span>
          <textarea
            placeholder='{\n  "key": "value"\n}'
            value={reqBody}
            onChange={(e) => setReqBody(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-mono h-32 outline-none focus:border-primary/50 text-white"
          />
        </div>
      )}
    </div>
  );

  const customOutputArea = (
    <div className="h-full flex flex-col">
      {responseResult ? (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-4 shrink-0 font-mono">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${
              responseResult.status >= 200 && responseResult.status < 300 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                : 'bg-red-500/10 text-red-400 border-red-500/20'
            }`}>
              STATUS: {responseResult.status} {responseResult.statusText}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-500">
              <Activity size={12} className="text-amber-500 animate-pulse" /> LATENCY: {responseResult.latency}ms
            </span>
          </div>

          <div className="mb-4 shrink-0 bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden text-xs">
            <details className="group">
              <summary className="p-3 font-bold text-slate-400 cursor-pointer list-none flex justify-between items-center hover:text-white transition-colors bg-white/[0.01]">
                <span>Response Headers ({Object.keys(responseResult.headers).length})</span>
                <ChevronRight size={14} className="group-open:rotate-90 text-slate-500 transition-transform" />
              </summary>
              <div className="p-4 border-t border-white/5 max-h-[120px] overflow-y-auto custom-scrollbar font-mono text-[10px] space-y-1 bg-black/40">
                {Object.entries(responseResult.headers).map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <span className="text-primary font-bold">{k}:</span>
                    <span className="text-slate-400">{v}</span>
                  </div>
                ))}
              </div>
            </details>
          </div>

          <div className="flex-1 min-h-0">
            {activeTab === 'tree' ? (
              <TreeViewer 
                data={(function() {
                  try {
                    return JSON.parse(responseResult.data);
                  } catch {
                    return { error: 'Payload body is not valid JSON.' };
                  }
                })()} 
              />
            ) : (
              <textarea
                readOnly
                className="w-full h-full p-4 bg-transparent text-white font-mono text-sm outline-none resize-none custom-scrollbar"
                value={responseResult.data}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 opacity-30 py-20">
          <Activity className="w-16 h-16 mb-4 animate-pulse" />
          <p className="text-xs font-mono">Response viewer waiting for request sequence...</p>
        </div>
      )}
    </div>
  );

  const controls = (
    <div className="flex xl:flex-col gap-4 justify-center items-center">
      <button
        onClick={handleSendRequest}
        disabled={isLoading}
        className={`p-5 rounded-3xl bg-primary text-black shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:scale-105 transition-all ${
          isLoading ? 'animate-spin' : ''
        }`}
        title="Send Request"
        suppressHydrationWarning={true}
      >
        <Send size={22} />
      </button>
    </div>
  );

  return (
    <WorkspaceLayout
      title="API Response Viewer"
      h1="API Response Viewer & Tester"
      intro="Fetch and inspect endpoints locally. Proxy CORS limits, analyze response times, and pretty-print JSON configurations."
      inputValue={url}
      onInputChange={setUrl}
      outputValue={responseResult?.data || ''}
      error={error}
      onClear={() => {
        setUrl('');
        setResponseResult(null);
        setError(null);
      }}
      controls={controls}
      customOutputArea={customOutputArea}
      customInputArea={requestArea} // We can feed custom inputs grid here
      tabs={['editor', 'tree']}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      relatedTools={[
        { name: 'JSON Formatter', href: '/json-formatter' },
        { name: 'JSON Viewer', href: '/json-viewer' }
      ]}
    />
  );
}
