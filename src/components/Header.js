'use client';

import { useState } from 'react';
import { Brackets, CodeXml, Menu, X, Home, Sparkles, HelpCircle } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] h-[70px] md:h-[90px] flex items-center bg-[#020617]/70 backdrop-blur-xl border-b border-white/10" role="banner">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center w-full">
        <a href="/" className="flex items-center gap-3 font-black text-2xl tracking-tighter text-white">
          <img src="/logo.png" alt="JSON Master Logo" className="w-10 h-10 object-contain invert dark:invert-0 hue-rotate-180 dark:hue-rotate-0 contrast-125 dark:contrast-100 saturate-150 dark:saturate-100 rounded-xl" />
        </a>
        
        <button 
          className="md:hidden flex items-center justify-center p-2 rounded-xl bg-white/5 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`
          fixed md:static top-[70px] md:top-auto left-0 w-full md:w-auto
          bg-background md:bg-transparent p-8 md:p-0
          flex flex-col md:flex-row items-center gap-6 md:gap-8
          border-b md:border-none border-white/10
          transition-all duration-300 z-[1000]
          ${isMenuOpen ? 'flex' : 'hidden md:flex'}
        `} role="navigation" aria-label="Main Navigation">
          <a href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium text-muted hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-primary after:transition-all">
            <Home size={18} />
            <span>Home</span>
          </a>
          <a href="#features" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium text-muted hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-primary after:transition-all">
            <Sparkles size={18} />
            <span>Features</span>
          </a>
          <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium text-muted hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-primary after:transition-all">
            <HelpCircle size={18} />
            <span>FAQ</span>
          </a>
          <a href="https://tools.orbytara.com/services" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium text-muted hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-primary after:transition-all">
            <Sparkles size={18} />
            <span>Services</span>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-2xl border border-white/10 hover:border-primary transition-all hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] font-semibold w-full md:w-auto justify-center">
            <CodeXml size={18} aria-hidden="true" />
            <span>Star on GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
