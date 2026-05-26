import Link from 'next/link';
import { ArrowLeft, Scale } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | Platform Usage Agreements',
  description: 'Read the terms of service governing usage of the Revoxera JSON formatter workspace. Free, commercial, and open-source permissions details.',
  keywords: 'terms of service, terms and conditions, platform usage, developer tool licensing',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/terms-and-conditions',
  }
};

export default function TermsPage() {
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
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Scale size={22} />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tight font-mono">
              Terms & Conditions
            </h1>
            <p className="text-xs text-slate-500 font-mono uppercase">
              Last Updated: May 26, 2026
            </p>
          </header>

          <div className="text-xs md:text-sm text-slate-300 leading-relaxed space-y-6 font-light">
            <p>
              By accessing and utilizing the workspaces on this domain, you agree to comply with the terms and conditions outlined below.
            </p>

            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mt-8">
              1. Permitted Workspace Usage
            </h2>
            <p>
              Our utilities are fully open and free for personal, educational, open-source, or commercial engineering projects. There are no registration forms, bandwidth quotas, or usage limits.
            </p>

            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mt-8">
              2. Absolute Disclaimer of Warranties
            </h2>
            <p>
              The tools, validators, editor structures, and converters are provided on an **"AS IS"** basis, without warranty of any kind. While we write robust, client-tested V8 parsing pipelines, we do not guarantee that operations are free from errors or compilation delays.
            </p>

            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mt-8">
              3. Limitation of Liability
            </h2>
            <p>
              In no event shall Revoxera, its developers, or affiliates be held liable for any damages (including database query failures, loss of system properties, parsing bugs, or compile-time delays) arising from the use or inability to use this platform.
            </p>

            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mt-8">
              4. Code Ownership & Modifications
            </h2>
            <p>
              Our styling, layout patterns, and brand designs are proprietary properties of Revoxera. You may not re-brand, clone, or redistribute the source files of these online web tools without our explicit authorization.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
