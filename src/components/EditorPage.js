'use client';

import { useState, useEffect } from 'react';
import WorkspaceLayout from '@/components/WorkspaceLayout';
import { ChevronRight, Brackets, Hash, Type, ToggleLeft, Trash2, Plus, Edit, Check } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

function walkAndMutate(obj, path, action, payload) {
  if (path.length === 0) {
    if (action === 'update') return payload;
    return obj;
  }

  const cloned = Array.isArray(obj) ? [...obj] : { ...obj };
  const key = path[0];
  const isLast = path.length === 1;

  if (isLast) {
    if (action === 'update') {
      cloned[key] = payload;
    } else if (action === 'delete') {
      if (Array.isArray(cloned)) {
        cloned.splice(key, 1);
      } else {
        delete cloned[key];
      }
    } else if (action === 'add') {
      const target = cloned[key];
      if (Array.isArray(target)) {
        cloned[key] = [...target, 'new_value'];
      } else if (typeof target === 'object' && target !== null) {
        cloned[key] = { ...target, 'new_key': 'new_value' };
      }
    }
    return cloned;
  }

  cloned[key] = walkAndMutate(cloned[key], path.slice(1), action, payload);
  return cloned;
}

const EditableTreeItem = ({ name, value, path, depth = 0, onMutate }) => {
  const isObject = value !== null && typeof value === 'object';
  const isArray = Array.isArray(value);
  
  const [isOpen, setIsOpen] = useState(depth < 2);
  const [isEditingValue, setIsEditingValue] = useState(false);
  const [editValue, setEditValue] = useState(String(value));

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleValueSave = () => {
    setIsEditingValue(false);
    let typedValue = editValue;
    
    if (editValue.toLowerCase() === 'true') typedValue = true;
    else if (editValue.toLowerCase() === 'false') typedValue = false;
    else if (editValue.toLowerCase() === 'null') typedValue = null;
    else if (!isNaN(editValue) && editValue.trim() !== '') typedValue = Number(editValue);

    onMutate(path, 'update', typedValue);
  };

  const renderIcon = () => {
    if (isArray) return <Brackets size={12} className="text-primary" />;
    if (typeof value === 'number') return <Hash size={12} className="text-accent" />;
    if (typeof value === 'string') return <Type size={12} className="text-success" />;
    return <ToggleLeft size={12} className="text-slate-500" />;
  };

  return (
    <div className="select-none font-mono text-xs">
      <div
        className="group/item flex items-center gap-2 py-1.5 px-3 rounded-lg hover:bg-white/5 cursor-pointer relative"
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
      >
        {isObject ? (
          <div onClick={toggleOpen} className="p-0.5 rounded hover:bg-white/10 shrink-0">
            <ChevronRight size={14} className={`text-slate-500 transition-transform ${isOpen ? 'rotate-90 text-primary' : ''}`} />
          </div>
        ) : (
          <div className="w-4 shrink-0" />
        )}

        <span className="flex items-center gap-1.5 shrink-0">
          {renderIcon()}
          <span className="font-bold text-slate-300">{name}:</span>
        </span>

        {!isObject && (
          isEditingValue ? (
            <div className="flex items-center gap-1.5 shrink-0">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleValueSave}
                onKeyDown={(e) => e.key === 'Enter' && handleValueSave()}
                className="bg-[#05080e] border border-primary/30 rounded px-1.5 py-0.5 text-white font-mono text-xs outline-none focus:border-primary"
                autoFocus
              />
              <button onClick={handleValueSave} className="p-0.5 text-success rounded hover:bg-white/10">
                <Check size={12} />
              </button>
            </div>
          ) : (
            <span 
              onClick={() => {
                setEditValue(String(value));
                setIsEditingValue(true);
              }}
              className={`hover:bg-white/10 px-1 rounded cursor-edit ${
                typeof value === 'string' ? 'text-success' : 'text-accent'
              }`}
              title="Click to edit value inline"
            >
              {typeof value === 'string' ? `"${value}"` : String(value)}
            </span>
          )
        )}

        {isObject && !isOpen && (
          <span className="text-[10px] text-slate-500 italic shrink-0">
            {isArray ? `[${value.length}]` : `{${Object.keys(value).length}}`}
          </span>
        )}

        <div className="hidden group-hover/item:flex items-center gap-1 ml-auto shrink-0 bg-[#090d16]/80 backdrop-blur pl-2 rounded-lg py-0.5">
          {isObject && (
            <button 
              onClick={() => onMutate(path, 'add')}
              className="p-1 text-slate-400 hover:text-primary rounded hover:bg-white/10"
              title="Add property / element"
            >
              <Plus size={12} />
            </button>
          )}
          <button 
            onClick={() => onMutate(path, 'delete')}
            className="p-1 text-slate-400 hover:text-red-400 rounded hover:bg-white/10"
            title="Delete node"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {isObject && isOpen && (
        <div className="overflow-hidden">
          {Object.entries(value).map(([key, val]) => (
            <EditableTreeItem 
              key={key} 
              name={key} 
              value={val} 
              path={[...path, isArray ? parseInt(key, 10) : key]} 
              depth={depth + 1} 
              onMutate={onMutate} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function EditorPage() {
  const [jsonInput, setJsonInput] = useState('{\n  "title": "Config Platform",\n  "active": true,\n  "settings": {\n    "port": 3000,\n    "debug": false\n  },\n  "nodes": [\n    "server-01",\n    "server-02"\n  ]\n}');
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState(null);

  const handleRawChange = (val) => {
    setJsonInput(val);
    if (!val.trim()) {
      setParsedData(null);
      setError(null);
      return;
    }
    try {
      const parsed = JSON.parse(val);
      setParsedData(parsed);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleMutate = (path, action, payload) => {
    try {
      if (path.length === 0) {
        if (action === 'delete') {
          setParsedData(null);
          setJsonInput('');
        }
        return;
      }

      const updated = walkAndMutate(parsedData, path, action, payload);
      setParsedData(updated);
      setJsonInput(JSON.stringify(updated, null, 2));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    handleRawChange(jsonInput);
  }, []);

  const customOutputArea = (
    <div className="h-full overflow-y-auto custom-scrollbar p-2 bg-black/20 rounded-3xl border border-white/5">
      {parsedData !== null ? (
        <div className="p-2 space-y-1">
          <EditableTreeItem 
            name="root" 
            value={parsedData} 
            path={[]} 
            depth={0} 
            onMutate={handleMutate} 
          />
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 opacity-30 py-20">
          <Edit className="w-16 h-16 mb-4" />
          <p className="text-xs font-mono">Editable tree waiting for syntax loading...</p>
        </div>
      )}
    </div>
  );

  const faq = [
    { q: 'How does Editable Tree mode work?', a: 'Click on any string or number value to trigger inline editing. You can also hover over object keys or array tags to insert children or remove key-value configurations. All edits mutate the tree and compile back to the text editor in real-time.' }
  ];

  const features = [
    { title: 'Inline Value Mutator', desc: 'Click to edit values inline, preserving type properties like number or boolean.' },
    { title: 'Dynamic Node Inserter', desc: 'Hover to add child properties to objects or push elements into arrays.' },
    { title: 'Synchronous Pipeline', desc: 'Edits in tree mode instantly format and sync text representation in the editor.' }
  ];

  return (
    <WorkspaceLayout
      title="JSON Editor"
      h1="Interactive JSON Editor"
      intro="Manage data blocks dynamically. Write raw code on the left and mutate nodes directly in the interactive tree editor on the right."
      inputValue={jsonInput}
      onInputChange={handleRawChange}
      outputValue={jsonInput}
      error={error}
      onClear={() => {
        setJsonInput('');
        setParsedData(null);
        setError(null);
      }}
      customOutputArea={customOutputArea}
      faq={faq}
      features={features}
      relatedTools={[
        { name: 'JSON Formatter', href: '/json-formatter' },
        { name: 'JSON Viewer', href: '/json-viewer' }
      ]}
    />
  );
}
