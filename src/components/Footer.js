"use client";

import { useState, useEffect } from "react";
import { GitBranch, X as XIcon, Link2, Radio, Mail, Terminal, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

const FOOTER_LINKS = {
  "JSON Tools": [
    { label: "JSON Formatter", href: "/json-formatter" },
    { label: "JSON Validator", href: "/json-validator" },
    { label: "JSON Tree Viewer", href: "/json-viewer" },
    { label: "JSON Compare", href: "/json-compare" },
    { label: "JSON Editor", href: "/json-editor" },
    { label: "API Response Viewer", href: "/api-response-viewer" },
    { label: "View All Tools →", href: "/tools" },
  ],
  "Resources": [
    { label: "What is JSON Schema?", href: "/guides/what-is-json-schema" },
    { label: "JSON vs YAML Guide", href: "/guides/json-vs-yaml" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ],
  "Legal": [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

const COMPANY_TOOLS = [
  { label: "AI Prompt Generator", href: "https://aiprompt.revoxera.com" },
  { label: "SQL Formatter", href: "https://sqlformatter.revoxera.com" },
  { label: "JSON Formatter", href: "https://jsonformatter.revoxera.com" },
  { label: "Color Code Tool", href: "https://colorcode.revoxera.com" },
  { label: "Case Converter", href: "https://caseconverter.revoxera.com" },
];

const SOCIAL = [
  { icon: <XIcon className="w-4 h-4" />, href: "https://x.com/revoxera", label: "X (Twitter)" },
  { icon: <GitBranch className="w-4 h-4" />, href: "https://github.com/revoxera", label: "GitHub" },
  { icon: <Link2 className="w-4 h-4" />, href: "https://www.linkedin.com/in/revoxera-digital", label: "LinkedIn" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isLight, setIsLight] = useState(false);

  // Detect theme changes
  useEffect(() => {
    const check = () => setIsLight(document.documentElement.classList.contains("light"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  const bgImage = isLight ? "url('/footer_neural_bg_light.png')" : "url('/footer_neural_bg.png')";
  const bgOpacity = isLight ? 0.35 : 0.18;
  const rootBg = isLight ? "#f1f5f9" : "#010409";
  const topBorderGradient = isLight
    ? "linear-gradient(90deg, transparent 0%, #ea580c 30%, #16a34a 70%, transparent 100%)"
    : "linear-gradient(90deg, transparent 0%, var(--primary) 30%, var(--accent) 70%, transparent 100%)";

  return (
    <footer
      className="footer-root w-full relative overflow-hidden"
      style={{ backgroundColor: rootBg }}
    >
      {/* ── NEURAL BACKGROUND IMAGE ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none transition-opacity duration-500"
        style={{ backgroundImage: bgImage, opacity: bgOpacity }}
      />

      {/* ── GRADIENT OVERLAYS ── */}
      {/* Top fade from page bg */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, ${rootBg} 0%, transparent 100%)` }}
      />
      {/* Bottom fill */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${rootBg} 0%, transparent 100%)` }}
      />
      {/* Radial center darkening (dark) / lightening (light) */}
      {!isLight && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(1,4,9,0.65) 100%)" }}
        />
      )}

      {/* ── TOP COLOR BORDER ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{ background: topBorderGradient, opacity: isLight ? 0.7 : 0.6 }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12">

        {/* ══ TOP ROW: Brand + Newsletter ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">

          {/* Brand block */}
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-300">
                <img src="/logo.png" alt="Revoxera Logo" className="w-full h-full object-cover" />
              </div>
              <span
                className="text-xl font-black tracking-tight"
                style={{ color: isLight ? "#0f172a" : "#f9fafb" }}
              >
                REVOXERA
              </span>
            </Link>

            <p
              className="text-sm leading-relaxed max-w-sm"
              style={{ color: isLight ? "#475569" : "#6b7280" }}
            >
              Precision-crafted developer tools designed to streamline your daily programming, formatting, and data workflow — free, fast, and open.
            </p>

            {/* Email contact */}
            <a
              href="mailto:support@revoxera.com"
              className="footer-contact-card inline-flex items-center gap-3 rounded-2xl px-4 py-3 group transition-all duration-300 hover:-translate-y-0.5"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                style={{ backgroundColor: "rgba(255,95,0,0.12)" }}
              >
                <Mail size={14} className="text-primary" />
              </div>
              <div>
                <p
                  className="text-[13px] font-semibold"
                  style={{ color: isLight ? "#1e293b" : "#e5e7eb" }}
                >
                  support@revoxera.com
                </p>
                <p
                  className="text-[11px] mt-0.5"
                  style={{ color: isLight ? "#64748b" : "#4b5563" }}
                >
                  24/7 email support
                </p>
              </div>
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-2 pt-1">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="footer-social-btn w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter card */}
          <div className="footer-newsletter-card rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Terminal size={15} className="text-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-primary">Sync with Hivemind</span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: isLight ? "#475569" : "#6b7280" }}
            >
              Join our weekly dev newsletter — top prompt sequences, JSON tricks, model configs, and API guides delivered to your inbox.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-sm font-bold text-accent">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                You&apos;re synced! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="footer-input flex-1 rounded-xl px-4 py-2.5 text-xs font-mono outline-none"
                  suppressHydrationWarning
                />
                <button
                  type="submit"
                  className="footer-subscribe-btn rounded-xl px-5 py-2.5 text-xs font-black uppercase tracking-widest flex items-center gap-1.5 shrink-0 hover:opacity-90 active:scale-95 transition-all"
                >
                  Subscribe <ArrowRight size={13} />
                </button>
              </form>
            )}
            <p
              className="text-[10px]"
              style={{ color: isLight ? "#94a3b8" : "#4b5563" }}
            >
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div
          className="h-px mb-12"
          style={{ backgroundColor: isLight ? "rgba(15,23,42,0.1)" : "rgba(255,255,255,0.06)" }}
        />

        {/* ══ LINK COLUMNS ══ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary">
                <Radio className="w-3 h-3 opacity-70" />
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="footer-nav-link text-xs font-medium transition-colors duration-200 hover:text-primary"
                      style={{ color: isLight ? "#475569" : "#6b7280" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Company Tools Column */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary">
              <Radio className="w-3 h-3 opacity-70" />
              More Tools
            </h4>
            <ul className="space-y-2.5">
              {COMPANY_TOOLS.map((tool) => (
                <li key={tool.label}>
                  <a
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-nav-link text-xs font-medium transition-colors duration-200 hover:text-primary"
                    style={{ color: isLight ? "#475569" : "#6b7280" }}
                  >
                    {tool.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div
          className="h-px mb-8"
          style={{ backgroundColor: isLight ? "rgba(15,23,42,0.1)" : "rgba(255,255,255,0.06)" }}
        />

        {/* ══ BOTTOM BAR ══ */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-center sm:text-left"
            style={{ color: isLight ? "#94a3b8" : "#4b5563" }}
            suppressHydrationWarning
          >
            © {new Date().getFullYear()} Revoxera. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Status badge */}
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: isLight ? "rgba(16,185,129,0.1)" : "rgba(16,185,129,0.08)",
                border: `1px solid ${isLight ? "rgba(16,185,129,0.3)" : "rgba(16,185,129,0.2)"}`,
                color: isLight ? "#059669" : "#10b981",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </span>
            {/* Badge */}
            <span
              className="inline-flex items-center gap-1 text-[11px]"
              style={{ color: isLight ? "#94a3b8" : "#4b5563" }}
            >
              <Shield size={11} className="text-primary/40" />
              100% Free & Open
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
