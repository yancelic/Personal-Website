import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import RotatingText from "../ReactBits/RotatingText";
import TextType from "../ReactBits/TextType";

const content = {
  en: {
    label: "Computer Engineer · Entrepreneur · Artist",
    subtitle: "Building things that matter — with code, music, and the quiet power of 15 minutes.",
    cta1: "Explore Zorus",
    cta2: "Let's Talk",
    scroll: "Scroll",
    roles: ["Engineer", "Entrepreneur", "Artist"],
  },
  tr: {
    label: "Bilgisayar Mühendisi · Girişimci · Sanatçı",
    subtitle: "Kodun, müziğin ve 15 dakikanın sessiz gücüyle; fark yaratan değerler inşa etmek.",
    cta1: "Zorus'u Keşfet",
    cta2: "Konuşalım",
    scroll: "Kaydır",
    roles: ["Mühendis", "Girişimci", "Sanatçı"],
  },
};

export default function HeroSection({ lang }) {
  const t = content[lang];

  return (
    <section id="hero">
      {/* Faint grid */}
      <div className="hero-bg-grid" />

      {/* Top bar — role badge + index */}
      <motion.div
        className="hero-topbar"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="hardware-screw" />
          <div className="hero-role-badge crt-display" style={{ border: "2px solid #1a1a20", borderRadius: "6px" }}>
            <RotatingText texts={t.roles} interval={3500} />
          </div>
        </div>
        <div className="hero-index" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>Selçuk University · 2024</span>
          <div className="hardware-screw" />
        </div>
      </motion.div>

      {/* Giant typographic name */}
      <div className="hero-name-block">
        <motion.span
          className="hero-name-line italic"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Yankı
        </motion.span>
        <motion.span
          className="hero-name-line"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          Muhsin
        </motion.span>
        <motion.span
          className="hero-name-line outline"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          Kılıç
        </motion.span>
      </div>

      {/* Bottom bar — subtitle + CTA */}
      <motion.div
        className="hero-bottom"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <p className="hero-subtitle">
          <TextType text={t.subtitle} speed={28} />
        </p>
        <div className="hero-cta">
          <a
            href="#zorus"
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); document.getElementById("zorus")?.scrollIntoView({ behavior: "smooth" }); }}
          >{t.cta1}</a>
          <a
            href="#contact"
            className="btn-outline"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
          >{t.cta2}</a>
        </div>
      </motion.div>

      {/* Scroll hint slider */}
      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <div className="scroll-slider-well">
          <motion.div 
            className="scroll-slider-handle"
            animate={{ y: [2, 16, 2] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
        <span>{t.scroll}</span>
      </motion.div>
    </section>
  );
}
