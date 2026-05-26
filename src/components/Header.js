'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Menu, X, Home, Sparkles, HelpCircle, CodeXml, Search, Sun, Moon, Laptop, 
  BookOpen, ChevronDown, Terminal, ShieldCheck, Brackets, Zap, Columns, 
  Edit, FileText, Table, Play, Globe 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CommandPalette from './CommandPalette';

const iconMap = {
  Terminal, CodeXml, ShieldCheck, Brackets, Zap, Columns, Edit, FileText, Table, Play, Globe, Sparkles, HelpCircle, BookOpen
};

const MEGA_MENU_CATEGORIES = [
  {
    title: "Formatters & Linting",
    color: "text-primary",
    items: [
      { name: 'JSON Formatter', href: '/json-formatter', desc: 'Beautify JSON spacing & layouts', icon: 'Terminal' },
      { name: 'JSON Pretty Print', href: '/json-pretty-print', desc: 'Syntax highlights & sharing', icon: 'CodeXml' },
      { name: 'JSON Validator', href: '/json-validator', desc: 'Validate syntax & errors', icon: 'ShieldCheck' },
      { name: 'JSON Minifier', href: '/json-minify', desc: 'Compress whitespace & tabs', icon: 'Zap' },
    ]
  },
  {
    title: "Inspect & Compare",
    color: "text-accent",
    items: [
      { name: 'JSON Tree Viewer', href: '/json-viewer', desc: 'Interactive node hierarchy', icon: 'Brackets' },
      { name: 'JSON Tree Editor', href: '/json-editor', desc: 'Mutate nodes and data text', icon: 'Edit' },
      { name: 'JSON Diff & Compare', href: '/json-compare', desc: 'Compare layouts side-by-side', icon: 'Columns' },
      { name: 'JSON Escape / Unescape', href: '/json-escape-unescape', desc: 'Quotes and slashes converter', icon: 'FileText' },
    ]
  },
  {
    title: "Format Converters",
    color: "text-success",
    items: [
      { name: 'JSON to CSV / Excel', href: '/json-to-csv', desc: 'Flatten objects to tables', icon: 'Table' },
      { name: 'JSON to XML / Markup', href: '/json-to-xml', desc: 'Serialize to XML tags', icon: 'Play' },
      { name: 'JSON to YAML / Config', href: '/json-to-yaml', desc: 'Generate YAML properties', icon: 'Play' },
      { name: 'XML / CSV ⇋ JSON Parse', href: '/tools?filter=Converter', desc: 'XML & CSV parsing layers', icon: 'Play' },
    ]
  },
  {
    title: "Developers Sandbox",
    color: "text-amber-500",
    items: [
      { name: 'API Response Tester', href: '/api-response-viewer', desc: 'Bypass CORS browser limits', icon: 'Globe' },
      { name: 'Developer Manifesto', href: '/about', desc: 'Revoxera open-source core', icon: 'Sparkles' },
      { name: 'Support & Feedbacks', href: '/contact', desc: 'Send issues and requests', icon: 'HelpCircle' },
      { name: 'Technical Blog', href: '/blog', desc: 'Guides on structures & APIs', icon: 'BookOpen' },
    ]
  }
];
 
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState({});
  const router = useRouter();

  const toggleMobileCategory = (idx) => {
    setMobileCategoryOpen(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('revoxera_theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, []);

  // Keyboard shortcut listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('revoxera_theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-[100] h-[70px] md:h-[90px] flex items-center bg-[#020617]/70 backdrop-blur-xl border-b border-white/10" role="banner">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center w-full relative h-full">
          
          {/* LOGO */}
          <a href="/" className="flex items-center gap-3 font-black text-2xl tracking-tighter text-white shrink-0">
            <img 
              src="/logo.png" 
              alt="JSON Master Logo" 
              className="w-10 h-10 object-contain rounded-xl" 
            />
            <span className="hidden sm:inline font-sans font-black tracking-tight text-white text-lg">REVOXERA</span>
          </a>
          
          {/* SEARCH BAR (Middle Trigger) */}
          <div className="hidden md:flex items-center gap-2 max-w-xs w-full mx-8">
            <button 
              onClick={() => setIsPaletteOpen(true)}
              className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-400 hover:text-white hover:border-primary/30 transition-all text-left"
              suppressHydrationWarning={true}
            >
              <span className="flex items-center gap-2"><Search size={14} /> Quick search...</span>
              <kbd className="text-[10px] font-black text-slate-500 bg-white/10 px-1.5 py-0.5 rounded uppercase">Ctrl+K</kbd>
            </button>
          </div>
          
          {/* ACTIONS & MOBILE TOGGLE */}
          <div className="flex items-center gap-4">
            
            {/* DESKTOP NAV LINKS */}
            <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main Navigation">
              {/* Interactive Tools Dropdown (Mega Menu Trigger) */}
              <div 
                className="relative"
                onMouseEnter={() => setToolsDropdownOpen(true)}
                onMouseLeave={() => setToolsDropdownOpen(false)}
              >
                <button 
                  onClick={() => router.push('/tools')}
                  className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1 py-4"
                  suppressHydrationWarning={true}
                >
                  Tools <ChevronDown size={12} className={`transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180 text-primary' : ''}`} />
                </button>
              </div>

              <a href="/blog" className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen size={12} /> Blog
              </a>
              <a href="/about" className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
                About
              </a>
              <a href="/contact" className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
                Contact
              </a>
              <a href="https://revoxera.com/services" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
                Services
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 hover:border-primary transition-all font-bold text-xs uppercase"
              >
                <CodeXml size={14} aria-hidden="true" /> Star
              </a>
            </nav>

            {/* SEARCH BUTTON FOR MOBILE */}
            <button 
              onClick={() => setIsPaletteOpen(true)}
              className="md:hidden p-3 rounded-xl bg-white/5 text-slate-400 hover:text-white border border-white/10"
              aria-label="Open search dialog"
              suppressHydrationWarning={true}
            >
              <Search size={18} />
            </button>

            {/* MOBILE MENU TOGGLE */}
            <button 
              className="md:hidden flex items-center justify-center p-3 rounded-xl bg-white/5 text-white border border-white/10 shrink-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              suppressHydrationWarning={true}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* THEME TOGGLE (Placed absolute right last) */}
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-white border border-white/10 transition-colors shrink-0"
              aria-label="Toggle display theme"
              suppressHydrationWarning={true}
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-400" />}
            </button>
          </div>

          {/* ABSOLUTE POSITIONED MEGA MENU PANEL */}
          <AnimatePresence>
            {toolsDropdownOpen && (
              <motion.div
                onMouseEnter={() => setToolsDropdownOpen(true)}
                onMouseLeave={() => setToolsDropdownOpen(false)}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute left-4 right-4 md:left-6 md:right-6 top-full mt-2 rounded-[32px] mega-menu-panel p-8 shadow-[0_30px_100px_rgba(0,0,0,0.15)] dark:shadow-[0_30px_100px_rgba(0,0,0,0.8)] z-50 grid grid-cols-1 md:grid-cols-4 gap-8"
              >
                {MEGA_MENU_CATEGORIES.map((category, idx) => (
                  <div key={idx} className="space-y-4">
                    <span className={`text-[10px] font-black tracking-widest uppercase block border-b border-white/10 pb-2 ${category.color}`}>
                      {category.title}
                    </span>
                    <div className="space-y-3">
                      {category.items.map((item, itemIdx) => {
                        const IconComp = iconMap[item.icon] || Play;
                        return (
                          <a 
                            key={itemIdx} 
                            href={item.href} 
                            className="flex items-start gap-3 group/item p-2.5 -mx-2.5 rounded-2xl hover:bg-white/5 transition-all"
                          >
                            <div className="mt-0.5 p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 group-hover/item:text-primary group-hover/item:border-primary/30 transition-all shrink-0">
                              <IconComp size={14} />
                            </div>
                            <div>
                              <span className="block text-xs font-bold text-slate-200 group-hover/item:text-primary transition-colors">
                                {item.name}
                              </span>
                              <span className="block text-[10px] text-slate-400 font-light mt-0.5 leading-normal">
                                {item.desc}
                              </span>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <nav className="md:hidden fixed top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-[#020617]/98 border-b border-white/10 p-6 flex flex-col gap-4 z-[999] shadow-2xl overflow-y-auto custom-scrollbar" role="navigation" aria-label="Mobile Navigation">
            {/* SEARCH FOR MOBILE */}
            <div className="relative group w-full mb-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={14} />
              <input
                type="text"
                placeholder="Search tools or pages..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs font-mono outline-none focus:border-primary/50 text-white"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsPaletteOpen(true);
                }}
                readOnly
              />
            </div>

            {/* Mobile collapsible Categories */}
            <div className="space-y-3">
              <div className="text-[10px] font-black text-slate-500 tracking-widest uppercase mb-1">Modules Index</div>
              {MEGA_MENU_CATEGORIES.map((category, idx) => {
                const isOpen = !!mobileCategoryOpen[idx];
                return (
                  <div key={idx} className="flex flex-col">
                    <button
                      onClick={() => toggleMobileCategory(idx)}
                      className="w-full text-left py-3 px-4 rounded-xl bg-white/5 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all uppercase tracking-wider flex justify-between items-center"
                      suppressHydrationWarning={true}
                    >
                      <span className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-primary' : idx === 1 ? 'bg-accent' : idx === 2 ? 'bg-success' : 'bg-amber-500'}`} />
                        {category.title}
                      </span>
                      <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : 'text-slate-500'}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden border-l border-white/10 ml-4 pl-3 py-2 flex flex-col gap-2"
                        >
                          {category.items.map((item, itemIdx) => {
                            const IconComp = iconMap[item.icon] || Play;
                            return (
                              <a
                                key={itemIdx}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-3 py-1.5 px-3 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all text-xs"
                              >
                                <IconComp size={12} className="text-slate-500 shrink-0" />
                                <span>{item.name}</span>
                              </a>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-white/10 my-4" />

            <div className="space-y-2">
              <a 
                href="/blog" 
                onClick={() => setIsMenuOpen(false)}
                className="py-3 px-4 rounded-xl bg-white/5 text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all uppercase tracking-wider flex items-center gap-2"
              >
                <BookOpen size={14} /> Blog Articles
              </a>
              <a 
                href="/about" 
                onClick={() => setIsMenuOpen(false)}
                className="py-3 px-4 rounded-xl bg-white/5 text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all uppercase tracking-wider"
              >
                Manifesto & About
              </a>
              <a 
                href="/contact" 
                onClick={() => setIsMenuOpen(false)}
                className="py-3 px-4 rounded-xl bg-white/5 text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all uppercase tracking-wider"
              >
                Contact Us
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="py-3 px-4 rounded-xl bg-primary text-black font-black text-sm uppercase tracking-widest text-center flex items-center justify-center gap-2"
              >
                <CodeXml size={16} /> Star on GitHub
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* COMMAND PALETTE POPUP */}
      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
    </>
  );
}
