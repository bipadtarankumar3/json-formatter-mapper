'use client';

import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Lock,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Brackets,
  FileCode,
} from 'lucide-react';

const ECOSYSTEM_TOOLS = [
  {
    name: 'JSON Formatter & Mapper',
    desc: 'Collapsible tree visualizer & schema mapper',
    href: '/json-formatter',
    isCurrent: true,
  },
  {
    name: 'HTML Color Codes & Picker',
    desc: 'OKLCH, HEX & WCAG Contrast Checker',
    href: 'https://colorcode.revoxera.com/',
    isExternal: true,
  },
  {
    name: 'CaseConverter Text Engine',
    desc: '11 Text transformation modes & dev casings',
    href: 'https://caseconverter.revoxera.com/',
    isExternal: true,
  },
  {
    name: 'SQL Beast Formatter & Beautifier',
    desc: 'Multi-dialect indents, casing & AST analysis',
    href: 'https://sqlformatter.revoxera.com/',
    isExternal: true,
  },
  {
    name: 'AI Prompt Generator',
    desc: 'Meta-prompter & token estimator for LLMs',
    href: 'https://ai-prompt.revoxera.com/',
    isExternal: true,
  },
];

const QUALITY_PILLARS = [
  {
    title: 'Zero Latency In-Browser Engine',
    desc: 'All payloads are formatted, minified, and verified using local JavaScript automata and streaming parsers without queuing or network delays.',
    icon: Cpu,
  },
  {
    title: 'Absolute Privacy Sandbox',
    desc: 'No confidential logs, bearer tokens, API payloads, or schema keys are ever transmitted to or logged on any external servers.',
    icon: Lock,
  },
  {
    title: 'AST & Schema Integrity',
    desc: 'Comprehensive JSON schema validation, JSONPath querying, and multi-format conversion to CSV, YAML, XML, and TypeScript.',
    icon: Layers,
  },
  {
    title: 'Free & Open Ecosystem',
    desc: 'Free forever with no paywalls, subscriptions, account requirements, or invasive tracking scripts.',
    icon: Sparkles,
  },
];

export default function AboutClient() {
  return (
    <div className="w-full max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">

      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-bold">About</span>
      </nav>

      {/* HEADER */}
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
          About JSON Master
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
          JSON Formatter &amp; Mapper is a free, professional-grade data transformation utility built by{' '}
          <strong className="text-slate-900 dark:text-white font-semibold">Revoxera</strong> — dedicated to creating fast, client-side developer and productivity tools.
        </p>
      </header>

      {/* MAIN CARDS */}
      <section className="space-y-6 mb-10">

        {/* Why We Built This */}
        <div className="p-6 md:p-8 bg-white dark:bg-[#0c1018] border border-slate-200 dark:border-white/10 rounded-3xl shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            Why We Built This
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3">
            Every software engineer, QA tester, and API developer encounters the same bottleneck: microservice payloads, database dumps, and configuration files arrive as unformatted, dense single-line strings. Copying these payloads into legacy online formatters poses severe data leak risks when sensitive tokens, customer PII, or internal credentials are included.
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            We built JSON Formatter &amp; Mapper to deliver a completely safe, offline-capable developer workbench: instant syntax formatting, interactive collapsible tree visualizers, automatic quote/comma repair, JSONPath querying, and bidirectional serialization to CSV, YAML, and XML — with zero server tracking.
          </p>
        </div>

        {/* Our Privacy Guarantee */}
        <div className="p-6 md:p-8 bg-white dark:bg-[#0c1018] border border-slate-200 dark:border-white/10 rounded-3xl shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck size={20} className="text-emerald-600" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Our Privacy Guarantee
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Every data transformation is executed{' '}
            <strong className="text-slate-900 dark:text-white font-semibold">
              100% locally in your browser
            </strong>{' '}
            using client-side JavaScript and web workers. We do not log, transmit, or retain your JSON payloads on any remote server. Once the application loads, the tool functions completely offline without requiring an active internet connection.
          </p>
        </div>

        {/* Part of the Revoxera Ecosystem */}
        <div className="p-6 md:p-8 bg-white dark:bg-[#0c1018] border border-slate-200 dark:border-white/10 rounded-3xl shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            Part of the Revoxera Ecosystem
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
            JSON Master is part of the Revoxera developer utilities collection:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ECOSYSTEM_TOOLS.map((tool) => {
              if (tool.isCurrent) {
                return (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className="flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-xs font-semibold border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                    <div className="min-w-0">
                      <div className="truncate font-bold">{tool.name}</div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 truncate opacity-90">{tool.desc}</div>
                    </div>
                    <span className="ml-auto text-[10px] uppercase font-black text-emerald-700 dark:text-emerald-300 shrink-0">
                      Current
                    </span>
                  </Link>
                );
              }

              return (
                <a
                  key={tool.name}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 p-3.5 rounded-2xl border transition-all text-xs font-semibold border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/5 hover:border-slate-300 dark:hover:border-white/20 text-slate-700 dark:text-slate-300 group"
                >
                  <div className="min-w-0">
                    <div className="truncate group-hover:text-slate-900 dark:group-hover:text-white font-bold">{tool.name}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{tool.desc}</div>
                  </div>
                  <ExternalLink size={13} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quality Standards & Principles */}
        <div className="p-6 md:p-8 bg-white dark:bg-[#0c1018] border border-slate-200 dark:border-white/10 rounded-3xl shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Quality Standards &amp; Engineering Principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUALITY_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon size={16} className="text-emerald-600" />
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">{pillar.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </section>

      {/* BOTTOM ACTION BUTTONS */}
      <section className="flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-xs cursor-pointer"
        >
          Contact Us
        </Link>
        <Link
          href="/tools"
          className="px-5 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-semibold text-sm transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <span>Explore All 16+ Tools</span>
          <ArrowRight size={14} />
        </Link>
      </section>

    </div>
  );
}
