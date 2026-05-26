import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Client-Side Security Sandbox Disclosures',
  description: 'Learn about our local-first privacy sandbox architecture. We do not store, log, or transmit your JSON, XML, or YAML data streams.',
  keywords: 'privacy policy, gdpr compliance, local data safety, client side sandbox',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/privacy-policy',
  }
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen cyber-grid pb-20 relative overflow-hidden">
      <div className="scanline" />

      <div className="container mx-auto px-4 md:px-6 animate-fade-in max-w-[800px] relative z-10 pt-12">
        {/* Back navigation */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-primary hover:text-white transition-colors uppercase group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Workspace
          </Link>
        </div>

        {/* Legal Document Card */}
        <article className="glass-panel rounded-[40px] p-8 md:p-12 border border-white/5 shadow-2xl relative bg-[#05080e]/60 select-text">
          <header className="border-b border-white/10 pb-8 mb-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Shield size={22} />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight font-mono">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 font-mono uppercase">
              Last Updated: May 26, 2026
            </p>
          </header>

          <div className="text-xs md:text-sm text-slate-300 leading-relaxed space-y-6 font-light">
            <p>
              At <strong>Revoxera JSON Formatter</strong>, we hold data safety and developer privacy as our highest priority values. This disclosure explains how our client-side sandbox handles formatting, conversion, and validation processes.
            </p>

            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mt-8">
              1. Local-First Sandboxing Philosophy
            </h2>
            <p>
              Unlike traditional developer utility portals, all utilities on this domain run **entirely client-side inside your browser V8 Javascript sandbox**. Paste payloads, XML trees, CSV records, and YAML logs do not upload to our servers. All compiler tokens and parser engines are loaded directly inside static assets in your web browser.
            </p>

            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mt-8">
              2. Data Storage Practices
            </h2>
            <p>
              Because processing runs client-side:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4 text-slate-400">
              <li>No user payloads, input configurations, or database records are stored in server logs.</li>
              <li>Optional browser features like "Session Logs" use local storage bindings in your browser. These values never transmit over the network and can be cleared instantly.</li>
            </ul>

            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mt-8">
              3. Proxy API Connections
            </h2>
            <p>
              When utilizing the **API Response Viewer**, requests are routed via a proxy endpoint to resolve CORS browser limits. The proxy node operates entirely in-memory: it acts as a pipe forwarding headers and values, caches nothing, keeps no logs of requests or payloads, and dispatches data immediately.
            </p>

            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mt-8">
              4. Cookies and Monitoring
            </h2>
            <p>
              We run standard analytics scripts (such as Google Analytics) to study site traffic trends. These scripts log general anonymous details (like viewport sizes, page routes, and general coordinates) but are restricted and incapable of accessing text fields or input sandboxes.
            </p>

            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mt-8">
              5. Legal Compliance (GDPR, HIPAA, SOC 2)
            </h2>
            <p>
              Because we never collect, ingest, or log personal developer payloads, our framework is GDPR, HIPAA, and CCPA compliant by default. You can inspect corporate database entries, customer records, and system dumps with zero compliance risk.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
