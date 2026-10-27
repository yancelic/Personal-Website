import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon, LinkedinIcon, InstagramIcon, CopyIcon, MailIcon } from "../common/Icons";

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
    namePlaceholder: "Your Name",
    emailPlaceholder: "yourname@example.com",
    msgPlaceholder: "Tell me about your project or idea...",
    submitBtn: "Send Message",
    sendingBtn: "Sending...",
    submittedMsg: "Message sent! Thank you.",
    activationMsg: "First submission activation email sent! Please check your inbox to confirm.",
    errorMsg: "Failed to send message. Please email directly.",
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
    namePlaceholder: "Adınız Soyadınız",
    emailPlaceholder: "adiniz@ornek.com",
    msgPlaceholder: "Projenizden veya fikrinizden bahsedin...",
    submitBtn: "Gönder",
    sendingBtn: "Gönderiliyor...",
    submittedMsg: "Mesajınız iletildi! Teşekkürler.",
    activationMsg: "İlk gönderim aktivasyon maili iletildi! Lütfen gelen kutunuzu onaylayın.",
    errorMsg: "Mesaj gönderilemedi. Lütfen doğrudan e-posta atın.",
    directEmail: "// DİREKT E-POSTA",
    socialLabel: "// SOSYAL MEDYA",
    balloonMsg: "E-posta adresi panoya kopyalandı!",
  }
};

export default function ContactSection({ lang }) {
  const t = content[lang];
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'activation' | 'error'
  const [notification, setNotification] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [honey, setHoney] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(t.emailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honey) return; // bot detection
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setStatus("loading");

    try {
      const response = await fetch("https://formsubmit.co/ajax/myanki.work@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          _subject: lang === "tr" ? `Portfolyo İletişim Mesajı: ${form.name.trim()}` : `Portfolio Contact: ${form.name.trim()}`,
          _template: "table",
          _captcha: "false"
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && (data.success === "true" || data.success === true)) {
        setStatus("success");
        setNotification({
          icon: "✉️",
          text: t.submittedMsg,
        });
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => {
          setStatus("idle");
          setNotification(null);
        }, 5000);
      } else if (data.message && data.message.toLowerCase().includes("activation")) {
        setStatus("activation");
        setNotification({
          icon: "ℹ️",
          text: t.activationMsg,
        });
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => {
          setStatus("idle");
          setNotification(null);
        }, 8000);
      } else {
        setStatus("error");
        setNotification({
          icon: "⚠️",
          text: t.errorMsg,
        });
        setTimeout(() => {
          setStatus("idle");
          setNotification(null);
        }, 6000);
      }
    } catch (err) {
      console.error("Mail send error:", err);
      setStatus("error");
      setNotification({
        icon: "⚠️",
        text: t.errorMsg,
      });
      setTimeout(() => {
        setStatus("idle");
        setNotification(null);
      }, 6000);
    }
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
            {/* Anti-spam honeypot */}
            <input
              type="text"
              name="_honey"
              value={honey}
              onChange={(e) => setHoney(e.target.value)}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="xp-input-group">
              <label className="xp-label" htmlFor="contact-name">{t.nameLabel}:</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                disabled={status === "loading"}
                className="xp-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={t.namePlaceholder}
              />
            </div>

            <div className="xp-input-group">
              <label className="xp-label" htmlFor="contact-email">{t.emailLabel}:</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                disabled={status === "loading"}
                className="xp-input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={t.emailPlaceholder}
              />
            </div>

            <div className="xp-input-group">
              <label className="xp-label" htmlFor="contact-message">{t.msgLabel}:</label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                disabled={status === "loading"}
                className="xp-textarea"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={t.msgPlaceholder}
              />
            </div>
          </div>

          {/* Dialog footer with submit & status */}
          <div className="xp-dialog-footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <div style={{
              fontSize: "11px",
              fontFamily: "var(--font-ui)",
              color: status === "error" ? "#C00" : status === "success" ? "#0A7500" : status === "activation" ? "#1B6FDE" : "var(--xp-text-muted)",
              lineHeight: "1.3",
              flex: 1
            }}>
              {status === "loading" && (lang === "tr" ? "İletiliyor..." : "Sending...")}
              {status === "success" && `✓ ${t.submittedMsg}`}
              {status === "activation" && `ℹ️ ${t.activationMsg}`}
              {status === "error" && `⚠️ ${t.errorMsg}`}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="xp-btn xp-btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                opacity: status === "loading" ? 0.7 : 1,
                cursor: status === "loading" ? "wait" : "pointer"
              }}
            >
              <MailIcon size={13} color="#fff" />
              {status === "loading" ? t.sendingBtn : status === "success" ? t.submittedMsg : t.submitBtn}
            </button>
          </div>
        </motion.form>

      </div>

      {/* XP Balloon notification */}
      <AnimatePresence>
        {(copied || notification) && (
          <motion.div
            className="xp-balloon"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <span className="xp-balloon-icon">
              {copied ? "📋" : notification?.icon || "✉️"}
            </span>
            <span>{copied ? t.balloonMsg : notification?.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
