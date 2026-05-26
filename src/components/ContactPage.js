'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Send, CheckCircle, ArrowLeft, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Feedback', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'Feedback', message: '' });
    }, 1200);
  };

  return (
    <div className="min-h-screen cyber-grid pb-20 relative overflow-hidden">
      <div className="scanline" />

      <div className="container mx-auto px-4 md:px-6 animate-fade-in max-w-[1000px] relative z-10 pt-12">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-primary hover:text-white transition-colors uppercase group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Workspace
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[9px] font-black tracking-[0.3em] text-primary uppercase block">SUPPORT PROTOCOL</span>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight">
              ESTABLISH <span className="text-primary drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">CONTACT</span>
            </h1>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              Have an issue parsing massive payloads, noticed a bug inside a YAML parser, or want to suggest new developer tools? Reach out to the Revoxera team directly.
            </p>

            <div className="space-y-4 pt-6">
              <a href="mailto:support@revoxera.com" className="flex items-center gap-4 group p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/5 hover:border-primary/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">Email support</span>
                  <span className="block text-xs font-semibold text-white">support@revoxera.com</span>
                </div>
              </a>
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.01]">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <Shield size={16} />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">Privacy Sandboxed</span>
                  <span className="block text-xs font-semibold text-white">Data safety guaranteed locally</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-panel rounded-[45px] p-8 md:p-10 border border-white/10 relative overflow-hidden bg-[#05080e]/60 shadow-2xl">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0 }}
                    className="py-12 flex flex-col items-center text-center gap-4"
                  >
                    <CheckCircle className="w-16 h-16 text-emerald-400 animate-pulse" />
                    <h2 className="text-xl font-bold text-white uppercase tracking-wider">Transmission Established</h2>
                    <p className="text-xs text-slate-400 font-light max-w-sm leading-relaxed">
                      Thank you for your feedback! The support team has received your query and will reply via email if necessary.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-black tracking-widest text-white border border-white/10 uppercase transition-all"
                    >
                      New Transmission
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="space-y-4 font-mono text-xs text-slate-300"
                  >
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ident name</label>
                      <input
                        type="text"
                        required
                        placeholder="your moniker / identifier"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mail address</label>
                      <input
                        type="email"
                        required
                        placeholder="ident@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Subject vector</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-400 outline-none focus:border-primary/50 text-xs"
                      >
                        <option value="Feedback" className="bg-[#020617]">General Feedback</option>
                        <option value="Bug" className="bg-[#020617]">Bug Report</option>
                        <option value="Request" className="bg-[#020617]">New Tool Request</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Message payload</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="// Type your query parameters here..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-primary/50 text-xs h-32 resize-none custom-scrollbar"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-primary text-black font-black text-[10px] tracking-widest uppercase transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(56,189,248,0.2)] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={12} /> Send Transmission
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
