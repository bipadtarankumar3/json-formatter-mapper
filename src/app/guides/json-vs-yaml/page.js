import Link from 'next/link';
import { BookOpen, Clock, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'JSON vs YAML: Key Differences & Comparison Guide',
  description: 'Understand the differences between JSON and YAML. Compare syntax rules, readability, comments support, speed, and parsing compatibility.',
  alternates: {
    canonical: 'https://jsonformatter.revoxera.com/guides/json-vs-yaml',
  },
};

export default function JsonVsYamlGuide() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-[900px] text-slate-300 font-light leading-relaxed">
      <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-primary hover:text-white transition-colors uppercase group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Workspace
        </Link>
      </div>

      <article className="space-y-6">
        <header className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-wider border border-primary/20 bg-primary/5 text-primary uppercase">
            Data Comparisons
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            JSON vs YAML: Which is Better?
          </h1>
          <div className="flex items-center gap-4 text-xs opacity-50 font-bold uppercase">
            <span className="flex items-center gap-1"><BookOpen size={14} /> 6 Min Read</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock size={14} /> Published 2026</span>
          </div>
        </header>

        <div className="glass-panel rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl space-y-6">
          <h2 className="text-xl font-bold uppercase text-primary">Readability vs Structure</h2>
          <p>
            JSON (JavaScript Object Notation) and YAML (YAML Ain't Markup Language) are both human-readable data serialization standards. However, they serve slightly different niches in modern engineering.
          </p>

          <h2 className="text-xl font-bold uppercase text-primary">Side-by-Side Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
              <h3 className="text-primary font-bold uppercase mb-2">JSON Structure</h3>
              <pre className="text-emerald-400">
{`{
  "user": {
    "name": "Alex",
    "roles": [
      "developer",
      "admin"
    ]
  }
}`}
              </pre>
            </div>
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10">
              <h3 className="text-primary font-bold uppercase mb-2">YAML Structure</h3>
              <pre className="text-emerald-400">
{`user:
  name: Alex
  roles:
    - developer
    - admin`}
              </pre>
            </div>
          </div>

          <h2 className="text-xl font-bold uppercase text-primary">Key Differences</h2>
          <ul className="list-disc list-inside space-y-4 pl-2 text-xs text-slate-400">
            <li><strong className="text-white">Syntax:</strong> JSON uses strict curly brackets, quotes, and commas. YAML relies on indentation and whitespace, making it more compact but highly sensitive to spacing errors.</li>
            <li><strong className="text-white">Comments:</strong> YAML natively supports comments (`#`), making it perfect for configuration files (Docker, Kubernetes). JSON does not support comments.</li>
            <li><strong className="text-white">Performance:</strong> JSON parsers are significantly faster and built natively into web browsers, making it the preferred standard for API data transfers.</li>
          </ul>

          <div className="pt-6 border-t border-white/10 flex flex-col items-center">
            <Link 
              href="/json-to-yaml" 
              className="px-8 py-4 rounded-2xl bg-primary text-black text-xs font-black tracking-widest transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:scale-105 uppercase"
            >
              Launch JSON to YAML Converter →
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
