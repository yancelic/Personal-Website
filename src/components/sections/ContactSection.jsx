import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon, LinkedinIcon, InstagramIcon, CopyIcon, SparkIcon, MailIcon } from "../common/Icons";

const socials = [
  { label: "GitHub",    href: "https://github.com/yancelic",                   icon: <GithubIcon size={15} color="#000" /> },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/myankilic/",         icon: <LinkedinIcon size={15} color="#000" /> },
  { label: "Instagram", href: "https://instagram.com/yankeelic",                icon: <InstagramIcon size={15} color="#000" strokeWidth={2} /> },
];

const content = {
  en: {
    sectionNum: "05 // CONTACT",
    title: "Let's Talk",
    quote: "Open to interesting projects, collaborations, and conversations that don't fit neatly into a form.",
    emailText: "myanki.work@gmail.com",
    copyBtn: "Copy Email",
    copiedText: "Copied!",
    formTitle: "// DIRECT MESSAGE",
    nameLabel: "Your Name",
    emailLabel: "Your Email",
    msgLabel: "Your Message",
    submitBtn: "Send Message",
    submittedMsg: "Got it — Thank you!",
    directEmail: "// DIRECT EMAIL",
    socialLabel: "// SOCIAL CHANNELS",
    balloonMsg: "Email address copied to clipboard!",
  },
  tr: {
    sectionNum: "05 // İLETİŞİM",
    title: "Konuşalım",
    quote: "İlginç projelere, iş birliklerine ve forma tam sığmayan konuşmalara açığım.",
    emailText: "myanki.work@gmail.com",
    copyBtn: "E-Postayı Kopyala",
    copiedText: "Kopyalandı!",
    formTitle: "// DİREKT MESAJ",
    nameLabel: "Adınız",
    emailLabel: "E-Posta Adresiniz",
    msgLabel: "Mesajınız",
    submitBtn: "Gönder",
    submittedMsg: "Aldım — Teşekkürler!",
    directEmail: "// DİREKT E-POSTA",
    socialLabel: "// SOSYAL MEDYA",
    balloonMsg: "E-posta adresi panoya kopyalandı!",
  }
};

export default function ContactSection({ lang }) {
  const t = content[lang];
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleCopy = () => {
    navigator.clipboard.writeText(t.emailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="xp-section">
      {/* Section header */}
      <div className="xp-section-header">
        <span className="xp-section-num">{t.sectionNum}</span>
        <h2 className="xp-section-title">{t.title}</h2>
      </div>

      <div className="xp-contact-grid">

        {/* Left: Email & Socials — XP window panel */}
        <motion.div
          className="xp-window"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.32 }}
        >
          {/* Window title bar */}
          <div className="xp-titlebar">
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="xp-titlebar-icon">✉</span>
              <span className="xp-titlebar-text">Contact — {t.title}</span>
            </div>
            <div className="xp-window-controls">
              <div className="xp-wc-btn">_</div>
              <div className="xp-wc-btn">□</div>
              <div className="xp-wc-btn close-btn">✕</div>
            </div>
          </div>

          <div className="xp-client-area" style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "14px" }}>
            {/* Email block */}
            <div>
              <div className="xp-badge" style={{ marginBottom: "8px", fontSize: "10px" }}>
                {t.directEmail}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "#1B6FDE",
                  marginBottom: "6px",
                  wordBreak: "break-all",
                }}
              >
                {t.emailText}
              </div>
              <p style={{ fontSize: "12px", color: "var(--xp-text-muted)", marginBottom: "10px", lineHeight: "1.5" }}>
                {t.quote}
              </p>
              <button
                className="xp-btn xp-btn-primary"
                onClick={handleCopy}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <CopyIcon size={13} color="#fff" />
                {copied ? t.copiedText : t.copyBtn}
              </button>
            </div>

            <hr className="xp-rule" />

            {/* Social links */}
            <div>
              <div className="xp-badge" style={{ marginBottom: "8px", fontSize: "10px" }}>
                {t.socialLabel}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="xp-social-btn"
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                      {s.icon}
                      <span>{s.label}</span>
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--xp-text-muted)" }}>↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Contact form — XP dialog style */}
        <motion.form
          className="xp-window"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.32 }}
        >
          {/* Form title bar */}
          <div className="xp-titlebar">
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="xp-titlebar-icon">📝</span>
              <span className="xp-titlebar-text">{t.formTitle}</span>
            </div>
            <div className="xp-window-controls">
              <div className="xp-wc-btn">_</div>
              <div className="xp-wc-btn">□</div>
              <div className="xp-wc-btn close-btn">✕</div>
            </div>
          </div>

          <div className="xp-client-area" style={{ padding: "14px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="xp-input-group">
              <label className="xp-label">{t.nameLabel}:</label>
              <input
                type="text"
                required
                className="xp-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Alex Turing"
              />
            </div>

            <div className="xp-input-group">
              <label className="xp-label">{t.emailLabel}:</label>
              <input
                type="email"
                required
                className="xp-input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="e.g. alex@example.com"
              />
            </div>

            <div className="xp-input-group">
              <label className="xp-label">{t.msgLabel}:</label>
              <textarea
                required
                rows={5}
                className="xp-textarea"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project or idea..."
              />
            </div>
          </div>

          {/* Dialog footer with submit */}
          <div className="xp-dialog-footer">
            <button
              type="submit"
              className="xp-btn xp-btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <MailIcon size={13} color="#fff" />
              {submitted ? t.submittedMsg : t.submitBtn}
            </button>
          </div>
        </motion.form>

      </div>

      {/* XP Balloon notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            className="xp-balloon"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <span className="xp-balloon-icon">📋</span>
            <span>{t.balloonMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
