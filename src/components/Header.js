'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, Home, Sparkles, HelpCircle, CodeXml, Search, Sun, Moon, Laptop, BookOpen } from 'lucide-react';
import CommandPalette from './CommandPalette';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const router = useRouter();

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
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center w-full">
          
          {/* LOGO */}
          <a href="/" className="flex items-center gap-3 font-black text-2xl tracking-tighter text-white shrink-0">
            <img 
              src="/logo.png" 
              alt="JSON Master Logo" 
              className="w-10 h-10 object-contain invert dark:invert-0 hue-rotate-180 dark:hue-rotate-0 contrast-125 dark:contrast-100 saturate-150 dark:saturate-100 rounded-xl" 
            />
            <span className="hidden sm:inline font-sans font-black tracking-tight text-white text-lg">REVOXERA</span>
          </a>
          
          {/* SEARCH BAR (Middle Trigger) */}
          <div className="hidden md:flex items-center gap-2 max-w-xs w-full mx-8">
            <button 
              onClick={() => setIsPaletteOpen(true)}
              className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-400 hover:text-white hover:border-primary/30 transition-all text-left"
            >
              <span className="flex items-center gap-2"><Search size={14} /> Quick search...</span>
              <kbd className="text-[10px] font-black text-slate-500 bg-white/10 px-1.5 py-0.5 rounded uppercase">Ctrl+K</kbd>
            </button>
          </div>

          {/* ACTIONS & MOBILE TOGGLE */}
          <div className="flex items-center gap-3">
            
            {/* SEARCH BUTTON FOR MOBILE */}
            <button 
              onClick={() => setIsPaletteOpen(true)}
              className="md:hidden p-3 rounded-xl bg-white/5 text-slate-400 hover:text-white border border-white/10"
              aria-label="Open search dialog"
            >
              <Search size={18} />
            </button>

            {/* THEME TOGGLE */}
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-white border border-white/10 transition-colors shrink-0"
              aria-label="Toggle display theme"
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-400" />}
            </button>

            <button 
              className="md:hidden flex items-center justify-center p-3 rounded-xl bg-white/5 text-white border border-white/10 shrink-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* DESKTOP NAV LINKS */}
            <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main Navigation">
              <a href="/tools" className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider">
                Tools
              </a>
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
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <nav className="md:hidden fixed top-[70px] left-0 w-full bg-[#020617]/95 border-b border-white/10 p-6 flex flex-col gap-4 z-[999] shadow-2xl" role="navigation" aria-label="Mobile Navigation">
            <a 
              href="/tools" 
              onClick={() => setIsMenuOpen(false)}
              className="py-3 px-4 rounded-xl bg-white/5 text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all uppercase tracking-wider"
            >
              All Tools
            </a>
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
              href="https://revoxera.com/services"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="py-3 px-4 rounded-xl bg-white/5 text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all uppercase tracking-wider"
            >
              Services
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="py-3 px-4 rounded-xl bg-primary text-black font-black text-sm uppercase tracking-widest text-center flex items-center justify-center gap-2"
            >
              <CodeXml size={16} /> Star on GitHub
            </a>
          </nav>
        )}
      </header>

      {/* COMMAND PALETTE POPUP */}
      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
    </>
  );
}
