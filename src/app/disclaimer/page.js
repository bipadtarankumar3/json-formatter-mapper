import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Disclaimer | Platform Warranties & Liability Disclosures',
  description: 'Review platform warranty limits, parsing data accuracy exclusions, and system security expectations on Revoxera JSON Formatter.',
  keywords: 'disclaimer, tool warranty, accuracy exclusions, data security disclosures',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/disclaimer',
  }
};

export default function DisclaimerPage() {
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
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <AlertCircle size={22} />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight font-mono">
              Disclaimer
            </h1>
            <p className="text-xs text-slate-500 font-mono uppercase">
              Last Updated: May 26, 2026
            </p>
          </header>

          <div className="text-xs md:text-sm text-slate-300 leading-relaxed space-y-6 font-light">
            <p>
              The information and tools provided by <strong>Revoxera JSON Formatter</strong> are intended for general developer utility and testing purposes only.
            </p>

            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mt-8">
              1. Information Accuracy Disclosures
            </h2>
            <p>
              While we strive to maintain high standards of code correctness, we make no representation or warranty of any kind, express or implied, regarding the accuracy, completeness, or reliability of parsed outputs (such as XML mappings or TypeScript interfaces). You are encouraged to verify critical generated models before compiling them in production codebases.
            </p>

            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mt-8">
              2. Third-Party Endpoints & CORS Proxy
            </h2>
            <p>
              Our API Response Viewer supports making HTTP requests to external, third-party URLs. Revoxera has no control over, and assumes no responsibility for, the content, headers, latency, or security practices of these external destinations. Routing through our proxy occurs at your discretion.
            </p>

            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mt-8">
              3. Data Loss Risks
            </h2>
            <p>
              All formatting, validation, and editing structures run client-side. We do not store or backup your session histories. Refreshing your web browser page or clearing session state will result in local logs being deleted. You are responsible for maintaining backups of original raw data files.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
