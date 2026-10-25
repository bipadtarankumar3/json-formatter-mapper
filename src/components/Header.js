'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Layers, 
  Briefcase, 
  Terminal, 
  Sparkles, 
  CodeXml, 
  Search, 
  Command, 
  ChevronDown, 
  Menu, 
  X, 
  Mail, 
  ShieldCheck, 
  Zap, 
  Brackets, 
  Columns, 
  FileCode, 
  Sun, 
  Moon,
  ExternalLink,
  BookOpen,
  FolderTree,
  FileEdit,
  GitCompare,
  Quote,
  FileSpreadsheet,
  Settings2,
  ArrowLeftRight,
  Palette,
  Type,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CommandPalette from './CommandPalette';

const MEGA_MENU_CATEGORIES = [
  {
    title: "Formatters & Linting",
    color: "text-emerald-700 dark:text-emerald-400",
    theme: {
      headerDot: "bg-emerald-500",
      iconBg: "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200/70 dark:border-emerald-800/60 group-hover/item:bg-emerald-100 dark:group-hover/item:bg-emerald-900/60 group-hover/item:border-emerald-300",
      hoverBg: "hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 hover:border-emerald-200/70 dark:hover:border-emerald-800/40",
      titleHover: "group-hover/item:text-emerald-700 dark:group-hover/item:text-emerald-300",
      badgeClass: "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-800/60",
    },
    items: [
      { name: 'JSON Formatter', href: '/json-formatter', desc: 'Beautify & indent JSON', icon: Terminal, badge: 'Popular' },
      { name: 'JSON Pretty Print', href: '/json-pretty-print', desc: 'Syntax highlights & sharing', icon: CodeXml },
      { name: 'JSON Validator', href: '/json-validator', desc: 'Syntax & schema checker', icon: ShieldCheck, badge: 'Shield' },
      { name: 'JSON Minifier', href: '/json-minify', desc: 'Compress whitespace & tabs', icon: Zap },
    ]
  },
  {
    title: "Inspect & Compare",
    color: "text-indigo-700 dark:text-indigo-400",
    theme: {
      headerDot: "bg-indigo-500",
      iconBg: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200/70 dark:border-indigo-800/60 group-hover/item:bg-indigo-100 dark:group-hover/item:bg-indigo-900/60 group-hover/item:border-indigo-300",
      hoverBg: "hover:bg-indigo-50/60 dark:hover:bg-indigo-950/30 hover:border-indigo-200/70 dark:hover:border-indigo-800/40",
      titleHover: "group-hover/item:text-indigo-700 dark:group-hover/item:text-indigo-300",
      badgeClass: "bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-200/80 dark:border-indigo-800/60",
    },
    items: [
      { name: 'JSON Tree Viewer', href: '/json-viewer', desc: 'Interactive node hierarchy', icon: FolderTree, badge: 'Interactive' },
      { name: 'JSON Tree Editor', href: '/json-editor', desc: 'Mutate nodes & data keys', icon: FileEdit },
      { name: 'JSON Diff & Compare', href: '/json-compare', desc: 'Side-by-side comparison', icon: GitCompare },
      { name: 'JSON Escape / Unescape', href: '/json-escape-unescape', desc: 'Quotes & slashes parser', icon: Quote },
    ]
  },
  {
    title: "Format Converters",
    color: "text-sky-700 dark:text-sky-400",
    theme: {
      headerDot: "bg-sky-500",
      iconBg: "bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border-sky-200/70 dark:border-sky-800/60 group-hover/item:bg-sky-100 dark:group-hover/item:bg-sky-900/60 group-hover/item:border-sky-300",
      hoverBg: "hover:bg-sky-50/60 dark:hover:bg-sky-950/30 hover:border-sky-200/70 dark:hover:border-sky-800/40",
      titleHover: "group-hover/item:text-sky-700 dark:group-hover/item:text-sky-300",
      badgeClass: "bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border-sky-200/80 dark:border-sky-800/60",
    },
    items: [
      { name: 'JSON to CSV / Excel', href: '/json-to-csv', desc: 'Flatten objects to tables', icon: FileSpreadsheet },
      { name: 'JSON to XML / Markup', href: '/json-to-xml', desc: 'Serialize to XML elements', icon: CodeXml },
      { name: 'JSON to YAML / Config', href: '/json-to-yaml', desc: 'Generate YAML properties', icon: Settings2 },
      { name: 'CSV to JSON Parse', href: '/csv-to-json', desc: 'Tabular spreadsheet import', icon: ArrowLeftRight },
    ]
  },
  {
    title: "Ecosystem Platforms",
    color: "text-amber-700 dark:text-amber-400",
    theme: {
      headerDot: "bg-amber-500",
      iconBg: "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200/70 dark:border-amber-800/60 group-hover/item:bg-amber-100 dark:group-hover/item:bg-amber-900/60 group-hover/item:border-amber-300",
      hoverBg: "hover:bg-amber-50/60 dark:hover:bg-amber-950/30 hover:border-amber-200/70 dark:hover:border-amber-800/40",
      titleHover: "group-hover/item:text-amber-700 dark:group-hover/item:text-amber-300",
      badgeClass: "bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200/80 dark:border-amber-800/60",
    },
    items: [
      { name: 'HTML Color Codes', href: 'https://colorcode.revoxera.com/', desc: 'OKLCH, HEX & Color Wheel', icon: Palette, isExternal: true },
      { name: 'CaseConverter Engine', href: 'https://caseconverter.revoxera.com/', desc: '11 Text mutation formats', icon: Type, isExternal: true },
      { name: 'SQL Beast Formatter', href: 'https://sqlformatter.revoxera.com/', desc: 'Multi-dialect SQL beautifier', icon: Database, isExternal: true },
      { name: 'AI Prompt Generator', href: 'https://ai-prompt.revoxera.com/', desc: 'System prompts & templates', icon: Sparkles, isExternal: true },
    ]
  }
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close tools dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync theme on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('revoxera_theme') || 'light';
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K
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
    try {
      localStorage.setItem('revoxera_theme', nextTheme);
      if (nextTheme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  };

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
      <header
        className="sticky top-0 z-[100] transition-all duration-200 h-[76px] bg-white/95 dark:bg-[#07090e]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10"
        role="banner"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 flex justify-between items-center h-full">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-0.5 flex items-center justify-center shrink-0 shadow-xs group-hover:border-emerald-500 transition-colors">
                <img 
                  src="/logo.png" 
                  alt="Revoxera Logo" 
                  className="w-full h-full object-cover rounded-[10px]" 
                />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  JSON<span className="text-emerald-600">Master</span>
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-tight -mt-0.5 hidden sm:block">
                100% Private JSON Transformation Suite
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2" role="navigation" aria-label="Main Navigation">
            {/* Home Link */}
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive('/')
                  ? 'text-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40'
                  : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 hover:bg-slate-50 dark:hover:bg-white/5'
              }`}
            >
              <Home size={15} className="text-slate-500 dark:text-slate-400" />
              <span>Home</span>
            </Link>

            {/* Tools Dropdown Trigger */}
            <div 
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setToolsDropdownOpen(prev => !prev)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all group cursor-pointer ${
                  toolsDropdownOpen || pathname.includes('/json-') || pathname === '/tools'
                    ? 'text-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40'
                    : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
                aria-haspopup="true"
                aria-expanded={toolsDropdownOpen}
              >
                <div className="w-5 h-5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
                  <Layers size={13} />
                </div>
                <span>Tools</span>
                <ChevronDown
                  size={14}
                  className={`text-slate-400 group-hover:text-emerald-600 transition-transform duration-200 ${
                    toolsDropdownOpen ? 'rotate-180 text-emerald-600' : ''
                  }`}
                />
              </button>

              {/* MEGA MENU DROPDOWN PANEL */}
              <AnimatePresence>
                {toolsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    style={{ backgroundColor: theme === 'dark' ? '#0c1018' : '#ffffff' }}
                    className="tools-mega-menu absolute -left-12 sm:-left-20 lg:-left-28 top-[calc(100%+8px)] w-[920px] max-w-[calc(100vw-3rem)] rounded-2xl border border-slate-200/90 dark:border-white/10 shadow-2xl p-5 sm:p-6 z-50 max-h-[calc(100vh-100px)] overflow-y-auto before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
                  >
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                      {MEGA_MENU_CATEGORIES.map((category, idx) => (
                        <div key={idx} className="space-y-2.5">
                          {/* Category Header */}
                          <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100 dark:border-white/5">
                            <span className={`w-2 h-2 rounded-full ${category.theme.headerDot} shadow-2xs`} />
                            <span className={`text-[10px] font-black tracking-widest uppercase ${category.color}`}>
                              {category.title}
                            </span>
                          </div>

                          {/* Category Items */}
                          <div className="space-y-1">
                            {category.items.map((item, itemIdx) => {
                              const IconComp = item.icon;
                              const content = (
                                <div className={`flex items-start gap-2.5 p-2 rounded-xl border border-transparent transition-all duration-150 ${category.theme.hoverBg}`}>
                                  <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 shadow-2xs transition-all duration-150 ${category.theme.iconBg}`}>
                                    <IconComp size={13} className="transition-transform group-hover/item:scale-110 shrink-0" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                      <span className={`text-[11.5px] font-bold text-slate-800 dark:text-slate-100 transition-colors ${category.theme.titleHover} truncate`}>
                                        {item.name}
                                      </span>
                                      {item.badge && (
                                        <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded border shrink-0 ${category.theme.badgeClass}`}>
                                          {item.badge}
                                        </span>
                                      )}
                                      {item.isExternal && (
                                        <ExternalLink size={10} className="text-slate-400 group-hover/item:text-amber-600 dark:group-hover/item:text-amber-400 shrink-0 transition-colors" />
                                      )}
                                    </div>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-1 block mt-0.5">
                                      {item.desc}
                                    </span>
                                  </div>
                                </div>
                              );

                              if (item.isExternal) {
                                return (
                                  <a
                                    key={itemIdx}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block group/item cursor-pointer"
                                  >
                                    {content}
                                  </a>
                                );
                              }

                              return (
                                <Link
                                  key={itemIdx}
                                  href={item.href}
                                  onClick={() => setToolsDropdownOpen(false)}
                                  className="block group/item cursor-pointer"
                                >
                                  {content}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Banner */}
                    <div className="pt-3.5 mt-4 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px]">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="font-medium">100% In-Browser AST · Zero Server Storage</span>
                      </div>
                      <Link 
                        href="/tools" 
                        onClick={() => setToolsDropdownOpen(false)}
                        className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 group/link cursor-pointer px-2.5 py-1 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all"
                      >
                        <span>Explore All 16+ Developer Tools</span>
                        <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services with Ecosystem Badge */}
            <Link
              href="/services"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all group ${
                isActive('/services')
                  ? 'text-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40'
                  : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-white/5'
              }`}
            >
              <div className="w-5 h-5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Briefcase size={13} />
              </div>
              <span>Services</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                Ecosystem
              </span>
            </Link>

            {/* JSON Viewer Shortcut */}
            <Link
              href="/json-viewer"
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive('/json-viewer')
                  ? 'text-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40'
                  : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-white/5'
              }`}
            >
              <div className="w-5 h-5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                <Brackets size={13} />
              </div>
              <span>Viewer</span>
            </Link>

            {/* JSON Compare Shortcut */}
            <Link
              href="/json-compare"
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive('/json-compare')
                  ? 'text-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40'
                  : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-white/5'
              }`}
            >
              <div className="w-5 h-5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                <Columns size={13} />
              </div>
              <span>Compare</span>
            </Link>

            {/* About */}
            <Link
              href="/about"
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive('/about')
                  ? 'text-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40'
                  : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-white/5'
              }`}
            >
              <div className="w-5 h-5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                <Sparkles size={13} />
              </div>
              <span>About</span>
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                isActive('/contact')
                  ? 'text-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40'
                  : 'text-slate-700 dark:text-slate-300 hover:text-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-white/5'
              }`}
            >
              <div className="w-5 h-5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                <Mail size={13} />
              </div>
              <span>Contact</span>
            </Link>
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsPaletteOpen(true)}
              className="hidden sm:flex items-center gap-3 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-xs text-slate-500 dark:text-slate-400 cursor-pointer transition-all duration-200 shadow-2xs"
              title="Search tools (Ctrl+K)"
            >
              <div className="flex items-center gap-1.5">
                <Search size={13} />
                <span className="hidden md:inline">Search...</span>
              </div>
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-[9px] font-mono">
                <Command size={9} />
                <span>K</span>
              </div>
            </button>

            {/* GitHub Link */}
            <a
              href="https://github.com/revoxera"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/15 text-white px-3.5 py-2 rounded-xl font-bold text-xs shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <CodeXml size={14} className="text-emerald-400" />
              <span>GitHub</span>
            </a>

            {/* Services CTA button */}
            <Link
              href="/services"
              className="hidden lg:inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl font-bold text-xs shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <Sparkles size={14} className="text-emerald-200" />
              <span>Services</span>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-all cursor-pointer shadow-2xs"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun size={17} className="text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon size={17} className="text-indigo-600 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              className="lg:hidden flex items-center justify-center p-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE SLIDE-DOWN DRAWER */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden w-full bg-white dark:bg-[#0c1018] border-b border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden px-4 py-6 space-y-5"
            >
              {/* Mobile Search Button */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsPaletteOpen(true);
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-400"
              >
                <div className="flex items-center gap-2">
                  <Search size={15} />
                  <span>Search tools & converters...</span>
                </div>
                <span className="text-[10px] bg-white dark:bg-white/10 px-2 py-0.5 rounded font-mono">Ctrl+K</span>
              </button>

              {/* Main Nav Links */}
              <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-slate-200 hover:text-emerald-600"
                >
                  <Home size={16} className="text-emerald-600" />
                  <span>Home</span>
                </Link>
                <Link
                  href="/services"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold"
                >
                  <Briefcase size={16} className="text-emerald-600" />
                  <span>Services</span>
                </Link>
                <Link
                  href="/json-formatter"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-slate-200 hover:text-emerald-600"
                >
                  <Terminal size={16} className="text-indigo-600" />
                  <span>Formatter</span>
                </Link>
                <Link
                  href="/json-viewer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-slate-200 hover:text-emerald-600"
                >
                  <Brackets size={16} className="text-purple-600" />
                  <span>Tree Viewer</span>
                </Link>
                <Link
                  href="/json-compare"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-slate-200 hover:text-emerald-600"
                >
                  <Columns size={16} className="text-blue-600" />
                  <span>Diff Compare</span>
                </Link>
                <Link
                  href="/json-validator"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-slate-200 hover:text-emerald-600"
                >
                  <ShieldCheck size={16} className="text-rose-600" />
                  <span>Validator</span>
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-slate-200 hover:text-emerald-600"
                >
                  <Sparkles size={16} className="text-amber-500" />
                  <span>About Us</span>
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-slate-200 hover:text-emerald-600"
                >
                  <Mail size={16} className="text-teal-600" />
                  <span>Contact Us</span>
                </Link>
              </div>

              {/* Ecosystem Quick Links */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block px-1">
                  Revoxera Production Suite
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href="https://colorcode.revoxera.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300"
                  >
                    <span>Color Codes</span>
                    <ExternalLink size={11} className="text-slate-400" />
                  </a>
                  <a
                    href="https://caseconverter.revoxera.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300"
                  >
                    <span>CaseConverter</span>
                    <ExternalLink size={11} className="text-slate-400" />
                  </a>
                  <a
                    href="https://sqlformatter.revoxera.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300"
                  >
                    <span>SQL Beast</span>
                    <ExternalLink size={11} className="text-slate-400" />
                  </a>
                  <a
                    href="https://ai-prompt.revoxera.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300"
                  >
                    <span>AI Prompt Gen</span>
                    <ExternalLink size={11} className="text-slate-400" />
                  </a>
                </div>
              </div>

              {/* Bottom Quick Row */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <a
                  href="https://github.com/revoxera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  <CodeXml size={14} className="text-emerald-500" />
                  <span>GitHub Repository</span>
                </a>
                <Link
                  href="/tools"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xs font-bold text-emerald-600 hover:underline"
                >
                  View All Tools →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Command Palette Dialog */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
      />
    </>
  );
}
