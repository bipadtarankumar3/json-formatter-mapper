'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Send,
  ExternalLink,
  Code2,
  Terminal,
  CheckCircle2,
  Brackets,
  Columns,
  Table,
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      return;
    }
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer
      className="mt-20 border-t border-slate-200 dark:border-white/10 bg-slate-50/90 dark:bg-[#07090e] text-slate-600 dark:text-slate-400"
      role="contentinfo"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12 md:py-16">

        {/* 1. TOP NEWSLETTER & SLA BANNER */}
        <div className="mb-12 p-6 md:p-8 rounded-3xl bg-white dark:bg-[#0c1018] border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                All Edge Systems Operational • 99.99% SLA
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
              Join 50,000+ Developers & DBAs
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
              Get weekly developer utilities, JSON schemas, API formatting guides, and text engine releases.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>You&apos;re subscribed! Welcome to the Revoxera dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter developer email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:bg-white dark:focus:bg-black focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 text-xs text-slate-900 dark:text-white outline-none w-full sm:w-64"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold shadow-xs hover:shadow transition-all shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send size={13} />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 2. DIRECTORY COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">

          {/* Col 1: Brand & Trust Guarantee (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <img src="/logo.png" alt="Revoxera Logo" className="w-full h-full object-cover rounded-lg" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                JSON<span className="text-emerald-600">Master</span>
              </span>
            </Link>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Professional-grade client-side JSON formatting engine & data mapping suite by Revoxera. Format, validate, and restructure payloads with zero server data retention.
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300 w-fit">
                <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                <span>100% Client-Side Privacy Guarantee</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-800 dark:text-indigo-300 w-fit">
                <Zap size={14} className="text-indigo-600 shrink-0" />
                <span>Revoxera Developer Suite</span>
              </div>
            </div>
          </div>

          {/* Col 2: JSON Tools */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              JSON Tools
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/json-formatter"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">JSON Formatter</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    Popular
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/json-viewer"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">JSON Tree Viewer</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/json-validator"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">JSON Validator</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/json-compare"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">JSON Compare & Diff</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/json-minify"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">JSON Minifier</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/json-to-csv"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">JSON to CSV / Excel</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-xs text-emerald-600 font-bold hover:underline transition-all inline-flex items-center gap-1"
                >
                  <span>View All 16+ Tools →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Ecosystem Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Ecosystem Services
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://colorcode.revoxera.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">HTML Color Codes & Picker</span>
                </a>
              </li>
              <li>
                <a
                  href="https://caseconverter.revoxera.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">CaseConverter Text Engine</span>
                </a>
              </li>
              <li>
                <a
                  href="https://sqlformatter.revoxera.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">SQL Beast Formatter</span>
                </a>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">JSON Formatter & Mapper</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    Current
                  </span>
                </Link>
              </li>
              <li>
                <a
                  href="https://ai-prompt.revoxera.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">AI Prompt Generator</span>
                </a>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline transition-all inline-flex items-center gap-1"
                >
                  <span>All Ecosystem Platforms →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Guides & Resources */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Guides & Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/guides/what-is-json-schema"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">What is JSON Schema?</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/json-vs-yaml"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">JSON vs YAML Guide</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/api-response-viewer"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">API Response Viewer</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/json-escape-unescape"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">JSON Escape & Unescape</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Technical Engineering Blog</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">About JSON Master</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Services & Platforms</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Contact Support</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Disclaimer</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* 3. BOTTOM ROW */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p>© {new Date().getFullYear()} JSON Formatter &amp; Mapper by Revoxera. All rights reserved.</p>
            <Link href="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              About
            </Link>
            <Link href="/services" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/privacy-policy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* X / Twitter */}
            <a
              href="https://x.com/revoxera"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-8 h-8 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all shadow-xs hover:scale-105"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/revoxera"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all shadow-xs hover:scale-105"
            >
              <Code2 size={14} />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/revoxera-digital"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all shadow-xs hover:scale-105"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
