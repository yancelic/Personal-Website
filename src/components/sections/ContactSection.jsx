import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon, LinkedinIcon, InstagramIcon, CopyIcon, SparkIcon, MailIcon } from "../common/Icons";

const socials = [
  { label: "GITHUB", href: "https://github.com/yancelic", icon: <GithubIcon size={18} color="#0D0D11" />, color: "var(--neo-yellow)" },
  { label: "LINKEDIN", href: "https://www.linkedin.com/in/myankilic/", icon: <LinkedinIcon size={18} color="#0D0D11" />, color: "var(--neo-cyan)" },
  { label: "INSTAGRAM", href: "https://instagram.com/yankeelic", icon: <InstagramIcon size={18} color="#fff" />, color: "var(--neo-pink)", textColor: "#fff" },
];

const content = {
  en: {
    sectionNum: "05 // INITIATE CONTACT",
    title: "LET'S BUILD SOMETHING REMARKABLE",
    quote: "I'm always open to ambitious projects, startup ventures, and ideas that don't quite fit in a box.",
    emailText: "myanki.work@gmail.com",
    copyBtn: "COPY EMAIL",
    copiedText: "COPIED TO CLIPBOARD!",
    formTitle: "DIRECT MESSAGE // HIT ME UP",
    nameLabel: "YOUR NAME",
    emailLabel: "YOUR EMAIL",
    msgLabel: "YOUR MESSAGE",
    submitBtn: "SEND MESSAGE",
    submittedMsg: "MESSAGE SENT! THANK YOU!"
  },
  tr: {
    sectionNum: "05 // İLETİŞİME GEÇ",
    title: "BİRLİKTE OLAĞANÜSTÜ BİR ŞEY İNŞA EDELİM",
    quote: "Her zaman iddialı projelere, girişimlere ve bir kutuya tam sığmayan fikirlere açığım.",
    emailText: "myanki.work@gmail.com",
    copyBtn: "E-POSTAYI KOPYALA",
    copiedText: "PANOTE KOPYALANDI!",
    formTitle: "DİREKT MESAJ // BANA ULAŞIN",
    nameLabel: "ADINIZ",
    emailLabel: "E-POSTA ADRESİNİZ",
    msgLabel: "MESAJINIZ",
    submitBtn: "MESAJI GÖNDER",
    submittedMsg: "MESAJ GÖNDERİLDİ! TEŞEKKÜRLER!"
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
    <section id="contact" className="neo-section">
      {/* Section Header */}
      <div className="neo-section-header">
        <div className="neo-section-num">{t.sectionNum}</div>
        <h2 className="neo-section-title">{t.title}</h2>
      </div>

      <div className="neo-contact-wrap">
        {/* Left Side: Email & Social Hub */}
        <motion.div
          className="neo-box"
          style={{ padding: "32px", background: "var(--neo-yellow)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "24px" }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div>
            <div className="neo-badge neo-black" style={{ marginBottom: "16px" }}>
              // DIRECT EMAIL
            </div>

            <h3 style={{ fontFamily: "var(--font-syne)", fontSize: "2rem", fontWeight: 800, lineHeight: 1.1, marginBottom: "12px" }}>
              {t.emailText}
            </h3>

            <p style={{ fontWeight: 600, fontSize: "1.05rem", opacity: 0.9, marginBottom: "24px", lineHeight: 1.5 }}>
              {t.quote}
            </p>

            <motion.button
              className="neo-btn neo-btn-pink"
              onClick={handleCopy}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <CopyIcon size={18} color="#fff" />
              <span>{copied ? t.copiedText : t.copyBtn}</span>
            </motion.button>
          </div>

          {/* Social Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="neo-label" style={{ fontSize: "0.8rem", textTransform: "uppercase" }}>
              // SOCIAL CHANNELS
            </div>
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="neo-social-btn"
                style={{ background: s.color, color: s.textColor || "var(--neo-black)", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                whileHover={{ x: 6 }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                  {s.icon}
                  <span>{s.label}</span>
                </span>
                <span>↗</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Interactive Form */}
        <motion.form
          className="neo-box"
          style={{ padding: "32px", background: "var(--neo-white)", display: "flex", flexDirection: "column", gap: "20px" }}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="neo-badge neo-cyan" style={{ alignSelf: "flex-start" }}>
            {t.formTitle}
          </div>

          <div className="neo-input-group">
            <label className="neo-label">{t.nameLabel}</label>
            <input
              type="text"
              required
              className="neo-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Alex Turing"
            />
          </div>

          <div className="neo-input-group">
            <label className="neo-label">{t.emailLabel}</label>
            <input
              type="email"
              required
              className="neo-input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="e.g. alex@example.com"
            />
          </div>

          <div className="neo-input-group">
            <label className="neo-label">{t.msgLabel}</label>
            <textarea
              required
              rows={4}
              className="neo-textarea"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about your project or idea..."
            />
          </div>

          <motion.button
            type="submit"
            className="neo-btn"
            style={{ width: "100%", background: "var(--neo-lime)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
          >
            <MailIcon size={18} />
            <span>{submitted ? t.submittedMsg : t.submitBtn}</span>
          </motion.button>
        </motion.form>
      </div>

      {/* Copy Email Notification Toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            className="neo-toast"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <SparkIcon size={16} />
            <span>{t.copiedText}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
