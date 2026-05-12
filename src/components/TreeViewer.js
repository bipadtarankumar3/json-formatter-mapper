'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Brackets, Hash, Type, ToggleLeft as Toggle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TreeItem = ({ name, value, depth = 0, filter = '' }) => {
  const isObject = value !== null && typeof value === 'object';
  const isArray = Array.isArray(value);
  const [isOpen, setIsOpen] = useState(depth < 2);
  
  // Auto-expand if filter matches children
  useEffect(() => {
    if (filter && isObject) {
      const matches = JSON.stringify(value).toLowerCase().includes(filter.toLowerCase());
      if (matches) setIsOpen(true);
    }
  }, [filter, value, isObject]);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Filter logic
  const matchesFilter = (n, v) => {
    if (!filter) return true;
    const search = filter.toLowerCase();
    if (String(n).toLowerCase().includes(search)) return true;
    if (typeof v !== 'object' && String(v).toLowerCase().includes(search)) return true;
    if (typeof v === 'object' && v !== null) {
      return JSON.stringify(v).toLowerCase().includes(search);
    }
    return false;
  };

  if (filter && !matchesFilter(name, value)) {
    return null;
  }

  const renderIcon = () => {
    if (isArray) return <Brackets size={14} className="text-primary" />;
    if (typeof value === 'number') return <Hash size={14} className="text-accent" />;
    if (typeof value === 'string') return <Type size={14} className="text-success" />;
    return <Toggle size={14} className="text-muted" />;
  };

  return (
    <div className="select-none">
      <div 
        className={`flex items-center gap-2 py-1 px-2 rounded-lg transition-colors cursor-pointer hover:bg-white/5 ${depth === 0 ? 'mt-2' : ''}`}
        onClick={isObject ? toggleOpen : undefined}
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
      >
        {isObject ? (
          <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight size={16} className="text-muted" />
          </motion.div>
        ) : (
          <div className="w-4" />
        )}
        
        <span className="flex items-center gap-2">
          {renderIcon()}
          <span className="font-mono text-sm font-bold text-white/70">{name}:</span>
        </span>

        {!isObject && (
          <span className={`font-mono text-sm ${typeof value === 'string' ? 'text-success' : 'text-accent'}`}>
            {typeof value === 'string' ? `"${value}"` : String(value)}
          </span>
        )}
        
        {isObject && !isOpen && (
          <span className="text-xs text-muted/50 italic">
            {isArray ? `[${value.length}]` : `{${Object.keys(value).length}}`}
          </span>
        )}
      </div>

      <AnimatePresence>
        {isObject && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {Object.entries(value).map(([key, val]) => (
              <TreeItem key={key} name={key} value={val} depth={depth + 1} filter={filter} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function TreeViewer({ data, filter = '' }) {
  if (!data) return null;
  
  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar p-4 bg-black/20 rounded-2xl border border-white/5">
      <TreeItem name="root" value={data} filter={filter} />
    </div>
  );
}
