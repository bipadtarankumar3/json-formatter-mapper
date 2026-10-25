'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2, CodeXml, Zap, Send, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setErrorMsg('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 900);
  };

  return (
    <div className="w-full max-w-[850px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">

      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-500">
        <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-bold">Contact</span>
      </nav>

      {/* HEADER */}
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
          Contact Us
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
          Have a question, found a bug in a parser, or want to suggest a new feature? We would love to hear from you.
        </p>
      </header>

      {/* 3 TOP CONTACT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Card 1: Email */}
        <a
          href="mailto:support@revoxera.com"
          className="group p-6 bg-white dark:bg-[#0c1018] border border-slate-200 dark:border-white/10 rounded-3xl hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mb-4 text-lg">
            <Mail size={18} />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">Email Support</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">For bugs and general inquiries.</p>
          <p className="text-emerald-600 font-bold text-sm">support@revoxera.com</p>
          <p className="text-slate-400 dark:text-slate-500 text-[11px] mt-0.5">Response within 24–48 hours</p>
        </a>

        {/* Card 2: GitHub */}
        <a
          href="https://github.com/revoxera"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-6 bg-white dark:bg-[#0c1018] border border-slate-200 dark:border-white/10 rounded-3xl hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 flex items-center justify-center mb-4 text-lg">
            <CodeXml size={18} />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">GitHub Issues</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">Report bugs or contribute code.</p>
          <p className="text-emerald-600 font-bold text-sm">github.com/revoxera</p>
          <p className="text-slate-400 dark:text-slate-500 text-[11px] mt-0.5">Open source repository</p>
        </a>

        {/* Card 3: Ecosystem Services */}
        <Link
          href="/services"
          className="group p-6 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/40 rounded-3xl hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4 text-lg">
            <Zap size={18} />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">Ecosystem Services</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">Revoxera developer platforms suite.</p>
          <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">Explore Services →</p>
          <p className="text-slate-400 dark:text-slate-500 text-[11px] mt-0.5">Color, Case, SQL, JSON &amp; AI tools</p>
        </Link>
      </div>

      {/* MESSAGE FORM */}
      <div className="p-6 md:p-8 bg-white dark:bg-[#0c1018] border border-slate-200 dark:border-white/10 rounded-3xl shadow-xs">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Send Us a Message</h2>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <CheckCircle2 size={44} className="text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Message Transmitted Successfully</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
              Thank you for reaching out! Our engineering team will review your inquiry and reply via email shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs transition-all cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3.5 py-2.5 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 text-sm transition-all"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3.5 py-2.5 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Subject
              </label>
              <select
                id="contact-subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3.5 py-2.5 rounded-xl text-slate-900 dark:text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 text-sm transition-all cursor-pointer"
              >
                <option value="">Select a topic</option>
                <option value="bug">Bug Report / Syntax Parser Issue</option>
                <option value="feature">Feature Request (Converter, Indentation rules)</option>
                <option value="question">General Inquiry</option>
                <option value="collaboration">Open Source &amp; Collaboration</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Message *
              </label>
              <textarea
                id="contact-message"
                rows={4}
                placeholder="Describe your issue or suggestion in detail..."
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3.5 py-2.5 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 text-sm transition-all resize-y"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-xs text-sm cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
            >
              <Send size={15} />
              <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
            </button>
          </form>
        )}
      </div>

      {/* QUICK FOOTER NAV LINKS */}
      <div className="flex flex-wrap gap-2 mt-8">
        <Link
          href="/about"
          className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-xs"
        >
          About Us →
        </Link>
        <Link
          href="/services"
          className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-xs"
        >
          Services &amp; Platforms →
        </Link>
        <Link
          href="/privacy-policy"
          className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-xs"
        >
          Privacy Policy →
        </Link>
      </div>

    </div>
  );
}
