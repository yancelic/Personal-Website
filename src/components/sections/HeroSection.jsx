import { motion } from "framer-motion";
import RotatingText from "../ReactBits/RotatingText";
import TextType from "../ReactBits/TextType";
import { SparkIcon, AcademicIcon, MusicIcon, BrainIcon, RocketIcon, MailIcon } from "../common/Icons";

const content = {
  en: {
    badge: "CS STUDENT @ SELÇUK // CO-FOUNDER @ ZORUS",
    subtitle: "I build apps, work on AI, make music, and think way too much about how people communicate.",
    cta1: "EXPLORE ZORUS",
    cta2: "LET'S TALK",
    statusTitle: "RIGHT NOW",
    statusText: "Working on Zorus (Hoppozorus) & diving deeper into AI",
    roles: ["CS STUDENT", "CO-FOUNDER @ ZORUS", "SOLOIST & GUITARIST"],
    stickers: [
      { text: "15-MIN THEORY", icon: <SparkIcon size={14} />, color: "var(--neo-yellow)", rotate: "-4deg" },
      { text: "SELÇUK CS", icon: <AcademicIcon size={14} />, color: "var(--neo-pink)", colorText: "#fff", rotate: "3deg" },
      { text: "MUSIC & GEAR", icon: <MusicIcon size={14} />, color: "var(--neo-cyan)", rotate: "-2deg" },
      { text: "PSYCHOLOGY", icon: <BrainIcon size={14} />, color: "var(--neo-lime)", rotate: "5deg" },
    ]
  },
  tr: {
    badge: "BİLGİSAYAR MÜHENDİSLİĞİ // ZORUS KURUCU ORTAĞI",
    subtitle: "Uygulama geliştiriyorum, yapay zeka üzerine çalışıyorum, müzik yapıyorum. Bir de insanların nasıl iletişim kurduğunu gereğinden fazla düşünüyorum.",
    cta1: "ZORUS'U KEŞFET",
    cta2: "KONUŞALIM",
    statusTitle: "ŞU AN",
    statusText: "Zorus (Hoppozorus) üzerinde çalışıyorum, yapay zeka tarafında ilerliyorum",
    roles: ["BİLGİSAYAR MÜHENDİSLİĞİ ÖĞRENCİSİ", "ZORUS KURUCU ORTAĞI", "SOLİST & GİTARİST"],
    stickers: [
      { text: "15 DAKİKA TEORİSİ", icon: <SparkIcon size={14} />, color: "var(--neo-yellow)", rotate: "-4deg" },
      { text: "SELÇUK BİLG", icon: <AcademicIcon size={14} />, color: "var(--neo-pink)", colorText: "#fff", rotate: "3deg" },
      { text: "MÜZİK & EKİPMAN", icon: <MusicIcon size={14} />, color: "var(--neo-cyan)", rotate: "-2deg" },
      { text: "PSİKOLOJİ", icon: <BrainIcon size={14} />, color: "var(--neo-lime)", rotate: "5deg" },
    ]
  },
};

export default function HeroSection({ lang }) {
  const t = content[lang];

  return (
    <section id="hero" className="neo-hero">
      {/* Top Badge & Sticker Bar */}
      <motion.div
        className="neo-hero-top"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="neo-badge neo-yellow" style={{ fontSize: "0.85rem", padding: "8px 16px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <SparkIcon size={16} />
          <span>{t.badge}</span>
        </div>

        {/* Rotating Roles Badge */}
        <div className="neo-badge neo-pink" style={{ fontSize: "0.85rem", padding: "8px 16px" }}>
          <RotatingText texts={t.roles} interval={3000} />
        </div>
      </motion.div>

      {/* Main Name & Title Block */}
      <div className="neo-hero-title-wrap">
        <motion.h1
          className="neo-hero-name highlight-yellow"
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: -1 }}
          transition={{ type: "spring", stiffness: 350, damping: 22, delay: 0.2 }}
        >
          YANKI
        </motion.h1>

        <motion.h1
          className="neo-hero-name"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.35 }}
        >
          MUHSIN
        </motion.h1>

        <motion.h1
          className="neo-hero-name outline-text"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.5 }}
        >
          KILIÇ
        </motion.h1>
      </div>

      {/* Hero Grid - Cards & Interactive Elements */}
      <div className="neo-hero-grid">
        {/* Main Subtitle & CTA Card */}
        <motion.div
          className="neo-box neo-hero-card-main"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.6 }}
        >
          <div>
            <div 
              className="neo-badge neo-cyan" 
              style={{ marginBottom: "16px", display: "inline-flex" }}
            >
              // ABOUT ME
            </div>
            <p className="neo-hero-subtitle">
              <TextType text={t.subtitle} speed={22} />
            </p>
          </div>

          <div className="neo-hero-cta-group">
            <motion.a
              href="#zorus"
              className="neo-btn"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("zorus")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <RocketIcon size={18} />
              <span>{t.cta1}</span>
            </motion.a>

            <motion.a
              href="#contact"
              className="neo-btn neo-btn-pink"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <MailIcon size={18} />
              <span>{t.cta2}</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Sidebar Status & Interactive Drag Stickers Card */}
        <motion.div
          className="neo-hero-sidebar"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 24, delay: 0.75 }}
        >
          {/* Status Box */}
          <div className="neo-box neo-sidebar-card neo-lime">
            <div style={{ display: "flex", alignItems: "center", justifyBetween: "space-between", gap: "8px" }}>
              <span className="neo-pulse-dot" style={{ background: "#000" }} />
              <span className="neo-label" style={{ color: "#000" }}>{t.statusTitle}</span>
            </div>
            <p style={{ fontWeight: 800, fontSize: "1.05rem", lineHeight: 1.4 }}>
              {t.statusText}
            </p>
          </div>

          {/* Draggable Interactive Stickers */}
          <div 
            className="neo-box neo-sidebar-card"
            style={{ position: "relative", minHeight: "160px", background: "var(--neo-bg-alt)", overflow: "hidden" }}
          >
            <span className="neo-label" style={{ fontSize: "0.75rem", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
              <SparkIcon size={14} />
              <span>SÜRÜKLE & KEŞFET</span>
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {t.stickers.map((stk, i) => (
                <motion.div
                  key={i}
                  drag
                  dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
                  className="neo-sticker"
                  style={{
                    backgroundColor: stk.color,
                    color: stk.colorText || "var(--neo-black)",
                    transform: `rotate(${stk.rotate})`,
                    cursor: "grab",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                  whileHover={{ scale: 1.1, rotate: 0 }}
                  whileTap={{ cursor: "grabbing", scale: 0.95 }}
                >
                  {stk.icon}
                  <span>{stk.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
