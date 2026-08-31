import { motion } from "framer-motion";
import RotatingText from "../ReactBits/RotatingText";
import TextType from "../ReactBits/TextType";
import { SparkIcon, AcademicIcon, MusicIcon, BrainIcon, RocketIcon, MailIcon } from "../common/Icons";

const content = {
  en: {
    badge: "CS STUDENT @ SELÇUK // CO-FOUNDER @ ZORUS",
    subtitle: "I build apps, work on AI, make music, and think way too much about how people communicate.",
    cta1: "Explore Zorus",
    cta2: "Let's Talk",
    statusTitle: "RIGHT NOW",
    statusText: "Working on Zorus (Hoppozorus) & diving deeper into AI",
    roles: ["CS STUDENT", "CO-FOUNDER @ ZORUS", "SOLOIST & GUITARIST"],
    stickers: [
      { text: "15-MIN THEORY", icon: <SparkIcon size={13} />, rotate: "-3deg" },
      { text: "SELÇUK CS",     icon: <AcademicIcon size={13} />, rotate: "2deg" },
      { text: "MUSIC & GEAR",  icon: <MusicIcon size={13} />, rotate: "-2deg" },
      { text: "PSYCHOLOGY",   icon: <BrainIcon size={13} />, rotate: "3deg" },
    ],
    windowTitle: "Yankı Muhsin Kılıç — Personal Portfolio",
    aboutTag: "// ABOUT ME",
  },
  tr: {
    badge: "BİLGİSAYAR MÜHENDİSLİĞİ // ZORUS KURUCU ORTAĞI",
    subtitle: "Uygulama geliştiriyorum, yapay zeka üzerine çalışıyorum, müzik yapıyorum. Bir de insanların nasıl iletişim kurduğunu gereğinden fazla düşünüyorum.",
    cta1: "Zorus'u Keşfet",
    cta2: "Konuşalım",
    statusTitle: "ŞU AN",
    statusText: "Zorus (Hoppozorus) üzerinde çalışıyorum, yapay zeka tarafında ilerliyorum",
    roles: ["BİLGİSAYAR MÜHENDİSLİĞİ ÖĞRENCİSİ", "ZORUS KURUCU ORTAĞI", "SOLİST & GİTARİST"],
    stickers: [
      { text: "15 DAKİKA TEORİSİ", icon: <SparkIcon size={13} />, rotate: "-3deg" },
      { text: "SELÇUK BİLG",       icon: <AcademicIcon size={13} />, rotate: "2deg" },
      { text: "MÜZİK & EKİPMAN",  icon: <MusicIcon size={13} />, rotate: "-2deg" },
      { text: "PSİKOLOJİ",         icon: <BrainIcon size={13} />, rotate: "3deg" },
    ],
    windowTitle: "Yankı Muhsin Kılıç — Kişisel Portföy",
    aboutTag: "// HAKKIMDA",
  },
};

export default function HeroSection({ lang }) {
  const t = content[lang];

  return (
    <section id="hero" className="xp-hero">

      {/* Top info row — badge + rotating roles */}
      <motion.div
        className="xp-hero-badge-row"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <span className="xp-badge xp-badge-blue">
          <SparkIcon size={12} color="#fff" />
          {t.badge}
        </span>
        <span className="xp-badge" style={{ fontWeight: "bold" }}>
          <RotatingText texts={t.roles} interval={3000} />
        </span>
      </motion.div>

      {/* Main window — XP chrome with title bar */}
      <motion.div
        className="xp-window"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
      >
        {/* XP Title Bar */}
        <div className="xp-titlebar">
          <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
            <span className="xp-titlebar-icon">⊞</span>
            <span className="xp-titlebar-text">{t.windowTitle}</span>
          </div>
          <div className="xp-window-controls">
            <div className="xp-wc-btn" title="Minimize">_</div>
            <div className="xp-wc-btn" title="Maximize">□</div>
            <div className="xp-wc-btn close-btn" title="Close">✕</div>
          </div>
        </div>

        {/* Client area */}
        <div className="xp-client-area" style={{ padding: "16px" }}>

          {/* Name block */}
          <div className="xp-hero-name-block" style={{ padding: "12px 0 16px" }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <div className="xp-hero-name">
                <span className="xp-hero-name-accent">YANKI </span>MUHSIN
              </div>
              <div className="xp-hero-name" style={{ color: "#555", WebkitTextStroke: "1.5px #333", WebkitTextFillColor: "transparent" }}>
                KILIÇ
              </div>
            </motion.div>
          </div>

          <hr className="xp-rule" />

          {/* Grid: subtitle + sidebar */}
          <div className="xp-hero-grid">

            {/* Left: subtitle + CTAs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", padding: "8px 0" }}>
              <div className="xp-badge" style={{ alignSelf: "flex-start", fontSize: "10px" }}>
                {t.aboutTag}
              </div>
              <p className="xp-hero-subtitle">
                <TextType text={t.subtitle} speed={22} />
              </p>
              <div className="xp-hero-cta-group">
                <a
                  href="#zorus"
                  className="xp-btn xp-btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("zorus")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <RocketIcon size={14} color="#fff" />
                  {t.cta1}
                </a>
                <a
                  href="#contact"
                  className="xp-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <MailIcon size={14} />
                  {t.cta2}
                </a>
              </div>
            </div>

            {/* Right sidebar: status + stickers */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>

              {/* Status box */}
              <div className="xp-status-box">
                <div className="xp-status-label">
                  <span className="xp-pulse-dot" />
                  {t.statusTitle}
                </div>
                <p className="xp-status-text">{t.statusText}</p>
              </div>

              {/* Draggable stickers box */}
              <div
                className="xp-groupbox"
                style={{ position: "relative", minHeight: "120px", overflow: "hidden" }}
              >
                <span className="xp-groupbox-label">Tags</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingTop: "4px" }}>
                  {t.stickers.map((stk, i) => (
                    <motion.div
                      key={i}
                      drag
                      dragConstraints={{ left: -8, right: 8, top: -8, bottom: 8 }}
                      className="xp-badge"
                      style={{
                        cursor: "grab",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        transform: `rotate(${stk.rotate})`,
                        userSelect: "none",
                      }}
                      whileTap={{ cursor: "grabbing", scale: 0.97 }}
                      whileHover={{ scale: 1.05, rotate: "0deg" }}
                    >
                      {stk.icon}
                      <span style={{ fontSize: "10px", fontWeight: "bold" }}>{stk.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
