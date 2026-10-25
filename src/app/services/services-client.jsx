'use client';

import Link from 'next/link';
import {
  Sparkles,
  ExternalLink,
  CircleCheck,
  Palette,
  Type,
  Database,
  FileCode,
  Rocket,
  Lock,
  Clock,
  ShieldCheck,
  ArrowRight,
  Zap,
  Brackets,
} from 'lucide-react';

const STATS = [
  { value: '0 Bytes', label: 'Data Retention', sub: '100% Local-First & Private' },
  { value: '100% Free', label: 'Cost', sub: 'No Subscriptions or Paywalls' },
  { value: '< 1ms', label: 'Latency', sub: 'In-Browser Execution' },
  { value: 'No Sign-Up', label: 'Access', sub: 'Instant Online Availability' },
];

const PLATFORMS = [
  {
    title: 'HTML Color Codes & Picker',
    tagline: 'HEX, RGB, HSL & OKLCH Color Tools & Generator',
    category: 'Color Studio',
    categoryColor: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    icon: Palette,
    iconColor: 'text-emerald-600',
    description: 'Professional color palette generator and picker with multi-format code output, WCAG accessibility contrast auditing, and shade generation.',
    features: [
      'Multi-format converter (HEX, RGB, HSL, HSV, CMYK, OKLCH)',
      'Real-time WCAG 2.1 AA/AAA contrast ratio checker',
      'Harmonic palette generation (complementary, triadic, analogous)',
      'One-click CSS variables, Tailwind config & SCSS exports',
      'Zero server tracking with instantaneous client-side updates',
    ],
    link: 'https://colorcode.revoxera.com/',
    buttonLabel: 'Open ColorCode Tool',
    isExternal: true,
  },
  {
    title: 'CaseConverter Text Engine',
    tagline: '11 Text Transformation Modes & Clean Developer Casings',
    category: 'Text Engine',
    categoryColor: 'bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    icon: Type,
    iconColor: 'text-teal-600',
    description: 'Transform text between Title Case, camelCase, snake_case, PascalCase, kebab-case, and UPPER CASE with real-time character counters and style guide compliance.',
    features: [
      '11 case transformations including Title Case (APA & Chicago)',
      'Developer identifier refactoring (camelCase, snake_case, kebab-case)',
      'Live character, word, sentence, and line count telemetry',
      'One-click clipboard copy, .txt file download & shareable links',
      '100% client-side execution with offline browser support',
    ],
    link: 'https://caseconverter.revoxera.com/',
    buttonLabel: 'Open CaseConverter',
    isExternal: true,
  },
  {
    title: 'SQL Beast Formatter & Beautifier',
    tagline: 'Multi-Dialect Database Query Formatter & Analyzer',
    category: 'Database Tool',
    categoryColor: 'bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    icon: Database,
    iconColor: 'text-blue-600',
    description: 'Format, beautify, and standardize complex SQL queries across major database dialects with customizable indenting, keyword casing, and AST analysis.',
    features: [
      'Multi-dialect support: PostgreSQL, MySQL, BigQuery, Snowflake, SQLite',
      'Customizable keyword casing (UPPERCASE vs lowercase clauses)',
      'Custom tab spacing, 2/4 space indentation, and comma alignment',
      'Minification mode for compact network payload transmission',
      '100% private in-browser AST parsing without database connections',
    ],
    link: 'https://sqlformatter.revoxera.com/',
    buttonLabel: 'Open SQL Beast Tool',
    isExternal: true,
  },
  {
    title: 'JSON Formatter & Mapper',
    tagline: 'Interactive Schema Mapper, Validator & Tree Visualizer',
    category: 'Data Pipeline',
    categoryColor: 'bg-purple-50 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    icon: Brackets,
    iconColor: 'text-emerald-600',
    description: 'Inspect, validate, format, and map nested JSON objects with collapsible tree nodes, JSONPath queries, schema verification, and multi-format converters.',
    features: [
      'Interactive collapsible tree visualizer with search filter',
      'JSON syntax validation with precise line & column error markers',
      'Schema mapping and path extractor (JSONPath & dot notation)',
      'Bidirectional converters: JSON to CSV, YAML, XML, and TypeScript',
      'Local-first client memory parsing — sensitive data stays on device',
    ],
    link: '/json-formatter',
    buttonLabel: 'Launch JSON Formatter',
    isCurrent: true,
    isExternal: false,
  },
  {
    title: 'AI Prompt Generator',
    tagline: 'Engineering-Grade System Prompt & Meta-Prompt Builder',
    category: 'AI Engineering',
    categoryColor: 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    icon: Rocket,
    iconColor: 'text-amber-600',
    description: 'Craft, structure, and optimize prompts for LLMs (Claude, GPT-4o, Gemini) with few-shot examples, role definitions, and token optimization.',
    features: [
      'Role, task, context, constraint, and output format scaffolding',
      'Meta-prompt optimizer to refine vague instructions into high-precision prompts',
      'Token estimator across Claude 3.5, GPT-4o, and Gemini models',
      'Curated prompt templates for coding, data analysis, and copywriting',
      'Clean Markdown and XML tag code block formatting',
    ],
    link: 'https://ai-prompt.revoxera.com/',
    buttonLabel: 'Open AI Prompt Generator',
    isExternal: true,
  },
];

const ARCHITECTURE_STANDARDS = [
  {
    icon: Lock,
    title: 'Zero Data Retention',
    desc: 'All tools process inputs entirely inside your local browser memory. No code snippets, colors, SQL queries, or text are transmitted to remote servers.',
    color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50',
  },
  {
    icon: Clock,
    title: 'Sub-Millisecond Speed',
    desc: 'Transformations run synchronously using compiled regex and JavaScript automata without API network latency or background queue delays.',
    color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50',
  },
  {
    icon: ShieldCheck,
    title: 'Free & Accessible',
    desc: 'Every utility is free forever with no account creation, no credit cards, and no invasive tracking cookies.',
    color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/50',
  },
];

export default function ServicesClient() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10 md:py-16">

      {/* BREADCRUMBS */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8" aria-label="Breadcrumbs">
        <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-bold">Services &amp; Ecosystem Platforms</span>
      </nav>

      {/* HERO SECTION */}
      <section className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/70 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-5">
          <Sparkles size={14} className="text-emerald-600" />
          <span>Revoxera Production Suite</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-5 leading-[1.15]">
          Developer Tools &amp;{' '}
          <span className="text-emerald-600">
            Web Services
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8">
          A dedicated collection of high-performance developer utilities engineered for speed, privacy, and precision formatting. 100% free, browser-based, and zero data logging.
        </p>

        {/* STATS MATRIX */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#0c1018] border border-slate-200/80 dark:border-white/10 text-center shadow-xs"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {s.value}
              </div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
                {s.label}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED DEVELOPER PLATFORMS */}
      <section className="max-w-6xl mx-auto mb-20 md:mb-28">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            Featured Developer Platforms
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm max-w-xl mx-auto">
            Click any platform below to launch its dedicated online workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            return (
              <div
                key={platform.title}
                className="bg-white dark:bg-[#0c1018] border border-slate-200 dark:border-white/10 hover:border-emerald-500/80 dark:hover:border-emerald-500/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                      <Icon size={24} className={platform.iconColor} />
                    </div>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${platform.categoryColor}`}>
                      {platform.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 transition-colors">
                    {platform.title}
                  </h3>

                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    {platform.tagline}
                  </p>

                  <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed mb-6">
                    {platform.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-white/5 mb-6">
                    {platform.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <CircleCheck size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {platform.isExternal ? (
                  <a
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs group-hover:shadow-md cursor-pointer"
                  >
                    <span>{platform.buttonLabel}</span>
                    <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <Link
                    href={platform.link}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs group-hover:shadow-md cursor-pointer"
                  >
                    <span>{platform.buttonLabel}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FLAGSHIP BANNER */}
      <section className="max-w-6xl mx-auto mb-16 p-8 md:p-12 rounded-3xl bg-slate-900 dark:bg-[#0c1018] text-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-slate-800 dark:border-white/10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-4">
            <Zap size={14} />
            <span>Flagship Data Pipeline Utility</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            JSON Master — 16+ Precision Data Transformation Engines
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
            Transform raw JSON logs, inspect collapsible hierarchical trees, validate schema structures, compare side-by-side differences, and convert to CSV, YAML, or XML without your data ever leaving your browser.
          </p>

          <div className="flex flex-wrap gap-2 text-xs text-emerald-300">
            <span>• Interactive Tree Visualizer</span>
            <span>• Schema Syntax Shield</span>
            <span>• 100% In-Browser Privacy Guarantee</span>
          </div>
        </div>

        <Link
          href="/json-formatter"
          className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 w-full md:w-auto cursor-pointer"
        >
          <span>Use JSON Formatter Tool</span>
          <ArrowRight size={14} />
        </Link>
      </section>

      {/* UNIVERSAL ARCHITECTURE & PRIVACY STANDARDS */}
      <section className="max-w-5xl mx-auto mb-16 p-6 md:p-10 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-3xl">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight text-center mb-8">
          Universal Architecture &amp; Privacy Standards
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARCHITECTURE_STANDARDS.map((std) => {
            const Icon = std.icon;
            return (
              <div
                key={std.title}
                className="p-5 bg-white dark:bg-[#0c1018] rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs"
              >
                <div className={`w-10 h-10 rounded-xl ${std.color} flex items-center justify-center mb-3`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5">
                  {std.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  {std.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
