import Link from 'next/link';
import { 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  Lock, 
  Layers, 
  Wand2, 
  ArrowLeft,
  Heart
} from 'lucide-react';

export const metadata = {
  title: 'About Us | JSON Formatter & Mapper',
  description: 'Discover the story behind JSON Formatter & Mapper. Learn about our developer-first mission, our strict client-side privacy architecture, and the future of data mapping.',
  keywords: 'about json formatter, revoxera, JSON mapper, developer tools, privacy first json tool, client side formatter',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen cyber-grid pb-20 relative overflow-hidden">
      <div className="scanline" />

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 max-w-[1200px] relative z-10 animate-fade-in">
        {/* Back navigation */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-primary hover:text-white transition-colors uppercase group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Workspace
          </Link>
        </div>

        {/* Hero Section */}
        <section className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
            <span className="text-[9px] font-black tracking-[0.3em] text-primary uppercase flex items-center gap-2 justify-center">
              <Sparkles size={10} /> Operational Manifesto & Genesis
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent">
            DECODING THE <span className="text-primary drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]">FUTURE</span> OF DATA
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed">
            JSON Formatter & Mapper is a next-generation developer utility designed to format, validate, inspect, and transform complex JSON structures with unmatched performance, gorgeous glassmorphic aesthetics, and a strict local-first privacy architecture.
          </p>
        </section>

        {/* Story Section - Glass Card */}
        <div className="glass-panel rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl mb-12 relative overflow-hidden hologram-effect">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full filter blur-[80px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <div className="lg:col-span-4 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Terminal size={24} />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white uppercase font-mono">
                [01] The Genesis
              </h2>
              <p className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
                Origins & Evolution
              </p>
            </div>
            
            <div className="lg:col-span-8 space-y-6 text-slate-300 font-light leading-relaxed text-sm md:text-base">
              <p>
                Every developer knows the pain of working with poorly formatted data. In modern software engineering, JSON (JavaScript Object Notation) has become the undisputed lingua franca of API communication, configuration systems, and web data persistence. Yet, for years, the tools available to inspect and format this critical data format remained stuck in the past.
              </p>
              <p>
                Most online JSON beautifiers were built in the early 2010s. They are cluttered with intrusive display advertisements, slow down or crash entirely when pasting moderately large payloads (e.g., above 5MB), and—most alarmingly—send your sensitive data to remote servers for processing.
              </p>
              <p>
                In early 2025, a small team of software engineers and UI designers at Revoxera set out to build a solution. We asked a simple question: Why can't developer utilities be as beautiful, fast, and secure as the applications developers build themselves?
              </p>
              <p>
                The result is JSON Formatter & Mapper. We didn't just want to build another standard formatting text box. We wanted to build a professional-grade workspace where developers could visualize, debug, restructure, and transform data streams instantly. By leveraging modern browser APIs, reactive frameworks, and web assembly parsers, we created an interface that feels less like a basic website and more like a high-performance desktop environment.
              </p>
            </div>
          </div>
        </div>

        {/* Three Column Features / Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Pillar 1 */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-6">
              <Lock size={20} />
            </div>
            <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">Client-Side Sandbox</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Your data is completely private. All operations run strictly inside your web browser sandbox. No uploads, no backend logs, no tracking. GDPR & HIPAA compliant by design.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-6">
              <Cpu size={20} />
            </div>
            <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">Flux Engine Speed</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Built on custom parsers to compile, format, and convert large data payloads with zero lag. Experience instantaneous compilation rates and 60fps hierarchical tree views.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="glass-panel rounded-3xl p-8 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
              <Wand2 size={20} />
            </div>
            <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">Smart Auto-Repair</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Pasting messy log files or trailing comma configurations? Our parser cleans up and recovers invalid formats automatically, eliminating manual correction delays.
            </p>
          </div>
        </div>

        {/* Philosophy Section - Detailed Content */}
        <div className="glass-panel rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl mb-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <ShieldCheck size={24} />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white uppercase font-mono">
                [02] Trust & Safety
              </h2>
              <p className="text-[10px] font-black tracking-[0.2em] text-accent uppercase">
                Privacy-First Architecture
              </p>
            </div>
            
            <div className="lg:col-span-8 space-y-6 text-slate-300 font-light leading-relaxed text-sm md:text-base">
              <p>
                In an era where cybersecurity breaches are commonplace and corporate data compliance (such as GDPR, HIPAA, and SOC 2) is highly scrutinized, pasting proprietary system configurations, user payloads, or financial database dumps into random online utilities is a massive security risk.
              </p>
              <p>
                Our design is founded on a strict client-side execution philosophy. When you paste JSON into our workspace, the data is never uploaded to our servers. All parsing, validation, formatting, minification, and conversion happens entirely within your browser's V8 Javascript engine.
              </p>
              <p>
                To achieve this, we decoupled the user interface from any backend processing. The application is served as static web assets that execute locally in your browser sandbox. This architecture offers two main benefits:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-slate-400 text-xs md:text-sm">
                <li><strong className="text-white">Absolute Privacy:</strong> Your data is protected by the same security boundaries as your web browser. No external logs are kept, no third-party APIs ingest your data, and your intellectual property remains yours alone.</li>
                <li><strong className="text-white">Zero-Latency Operation:</strong> Because there are no network round-trips required to format or transform your data, operations are executed at CPU-bound speed. Minification of a 10MB file happens in single-digit milliseconds, providing a fluid, instantaneous experience.</li>
              </ul>
              <p>
                By selecting a client-side execution path, we ensure that whether you are working on a high-security fintech API or a private hobby project, your data is completely secure.
              </p>
            </div>
          </div>
        </div>

        {/* Engineering Section - Detailed Content */}
        <div className="glass-panel rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl mb-12 relative overflow-hidden hologram-effect">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <div className="lg:col-span-4 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <Layers size={24} />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white uppercase font-mono">
                [03] Under the Hood
              </h2>
              <p className="text-[10px] font-black tracking-[0.2em] text-amber-500 uppercase">
                The Flux Engine
              </p>
            </div>
            
            <div className="lg:col-span-8 space-y-6 text-slate-300 font-light leading-relaxed text-sm md:text-base">
              <p>
                Underpinning the JSON Formatter & Mapper is our proprietary data engine. Standard browser parsers use <code>JSON.parse()</code>, which fails immediately when encountering the smallest syntax errors—like a missing comma, a trailing comma, or single-quoted keys. When this happens, typical formatters simply throw an error message and refuse to render.
              </p>
              <p>
                We engineered an automated JSON Repair Engine that intelligently sanitizes and corrects malformed syntax on the fly. When a developer pastes code from log outputs, stack traces, or raw network dumps, our engine scans for common syntax anomalies. It repairs missing quotes, strips trailing delimiters, converts unquoted keys, and resolves nesting errors, allowing you to format and analyze data that would break other tools.
              </p>
              <p>
                Additionally, the interface features a dynamic Tree Viewer that allows developers to explore complex data structures hierarchically. Traditional tree views lag significantly with large depths. Our custom Tree Viewer renders nodes lazily, ensuring smooth 60fps scrolling even when dealing with thousands of nested properties. With integrated JSONPath querying and regex filtering, developers can query deep objects instantly, retrieving specific keys or array indices without having to search manually through megabytes of text.
              </p>
            </div>
          </div>
        </div>

        {/* Double grid: Values and Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Values */}
          <div className="glass-panel rounded-[40px] p-8 md:p-10 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Heart size={20} />
                </div>
                <h3 className="text-xl font-bold text-white uppercase font-mono">[04] Core Values</h3>
              </div>
              <div className="space-y-4 text-slate-300 font-light text-sm leading-relaxed">
                <p>
                  As builders of developer software, we hold ourselves to a strict set of values:
                </p>
                <ul className="space-y-4">
                  <li>
                    <strong className="text-white block font-semibold text-sm uppercase tracking-wider mb-1">Ad-Free Focus</strong>
                    We promise never to clutter your workspace with flashing display ads, sponsored banners, or popups. A clean workspace leads to a clean mind and focused debugging.
                  </li>
                  <li>
                    <strong className="text-white block font-semibold text-sm uppercase tracking-wider mb-1">Open & Accessible</strong>
                    We believe developer tools should be accessible to everyone. Our formatting, minification, TypeScript mapping, and CSV conversion protocols are fully free to use, with no paywalls or tiered limits.
                  </li>
                  <li>
                    <strong className="text-white block font-semibold text-sm uppercase tracking-wider mb-1">Continuous Iteration</strong>
                    We continuously update our tools to support modern data standards, new language interfaces, and improved compiler engines. Our development roadmap is directly influenced by user requests.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="glass-panel rounded-[40px] p-8 md:p-10 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-xl font-bold text-white uppercase font-mono">[05] Future Vision</h3>
              </div>
              <div className="space-y-4 text-slate-300 font-light text-sm leading-relaxed">
                <p>
                  We are just getting started. The JSON Formatter & Mapper is the cornerstone of a larger ecosystem of developer tools we are building at Revoxera. Our roadmap for the upcoming quarters includes:
                </p>
                <ul className="space-y-4">
                  <li>
                    <strong className="text-white block font-semibold text-sm uppercase tracking-wider mb-1">JSON Schema Auto-Inference</strong>
                    Automatically generate comprehensive JSON Schema declarations from pasted JSON inputs to streamline API validation workflows.
                  </li>
                  <li>
                    <strong className="text-white block font-semibold text-sm uppercase tracking-wider mb-1">Collaborative Playgrounds</strong>
                    Secure, end-to-end encrypted sharing links that allow multiple developers to view and inspect formatted JSON instances in real-time.
                  </li>
                  <li>
                    <strong className="text-white block font-semibold text-sm uppercase tracking-wider mb-1">Advanced Diffing Tools</strong>
                    A side-by-side graphical comparison layout that highlights structural and property changes between two JSON payloads.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="glass-panel rounded-[40px] p-8 md:p-12 border border-white/10 text-center relative overflow-hidden hologram-effect">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 pointer-events-none" />
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase mb-4 tracking-tight">
            Ready to Format Your Data?
          </h2>
          <p className="text-sm text-slate-400 font-light max-w-xl mx-auto mb-8 leading-relaxed">
            Experience the zero-latency, privacy-first formatting and mapping environment. Restore structure to your data streams instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/" 
              className="px-8 py-4 rounded-2xl bg-primary text-black text-xs font-black tracking-widest transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:scale-105 uppercase"
            >
              Open Workspace
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-[10px] font-black tracking-widest transition-all border border-white/10 text-white uppercase"
            >
              Star on GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
