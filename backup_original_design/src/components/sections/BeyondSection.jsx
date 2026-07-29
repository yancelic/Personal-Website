import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

const cards = {
  en: [
    {
      eyebrow: "Music",
      title: "Soloist & guitarist",
      body: "Three solo performances. Each one a lesson in vulnerability and presence. Music isn't separate from my work in tech — it taught me that the best systems, like the best songs, have rhythm, tension, and release.",
      visual: "music",
    },
    {
      eyebrow: "Psychology",
      title: "Reading the unspoken",
      body: "Passionate about the science of human behavior — body language, cognitive biases, social dynamics. This lens makes me a better engineer and a better founder.",
      visual: "psy",
    },
    {
      eyebrow: "Philosophy",
      title: "The 15-minute theory",
      body: "I believe that 15 genuine minutes of conversation reveals more about a person than months of observation. Curiosity, not judgment, is the key.",
      visual: "clock",
    },
  ],
  tr: [
    {
      eyebrow: "Müzik",
      title: "Solist & gitarist",
      body: "Üç solo performans. Her biri kırılganlık ve varoluş üzerine bir ders. Müzik, teknik çalışmamdan ayrı değil — en iyi sistemlerin, en iyi şarkılar gibi ritim, gerilim ve çözüme sahip olduğunu bana öğretti.",
      visual: "music",
    },
    {
      eyebrow: "Psikoloji",
      title: "Söylenmeyeni okumak",
      body: "İnsan davranışı bilimine — beden dili, bilişsel önyargılar, sosyal dinamikler — tutkuluyum. Bu perspektif beni hem daha iyi bir mühendis hem de daha iyi bir kurucu yapıyor.",
      visual: "psy",
    },
    {
      eyebrow: "Felsefe",
      title: "15 dakika teorisi",
      body: "15 dakikalık samimi bir konuşmanın, aylarca gözlemden daha fazlasını ortaya çıkardığına inanıyorum. Merak, yargı değil, anahtar.",
      visual: "clock",
    },
  ],
};

/* Music equalizer bars */
const MusicVisual = () => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "46px", width: "80px", background: "var(--bg3)", padding: "4px 6px", borderRadius: "6px", boxShadow: "inset 0 2px 5px rgba(0,0,0,0.85)", border: "1px solid rgba(255,255,255,0.03)" }}>
    {[55, 80, 38, 95, 60, 75, 35, 90, 48].map((h, i) => (
      <div key={i} style={{
        flex: 1,
        background: i % 3 === 0 ? "var(--red)" : "rgba(255,255,255,0.12)",
        height: `${h}%`,
        boxShadow: i % 3 === 0 ? "0 0 6px var(--red)" : "none",
        animation: `musicBar ${0.7 + i * 0.1}s ${i * 0.07}s ease-in-out infinite alternate`,
        borderRadius: "1px"
      }} />
    ))}
  </div>
);

/* Concentric circle visual */
const PsyVisual = () => (
  <div style={{ position: "relative", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", background: "#08090b", borderRadius: "50%", border: "2px solid #1c1d24", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.9)", overflow: "hidden" }} className="crt-display">
    {[38, 26, 14].map((s, i) => (
      <div key={i} style={{
        position: "absolute",
        width: s, height: s,
        border: `1px solid ${i === 0 ? "var(--red)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "50%",
        opacity: i === 0 ? 0.7 : 0.25,
        boxShadow: i === 0 ? "0 0 4px var(--red-glow)" : "none"
      }} />
    ))}
    <div style={{ width: 4, height: 4, background: "var(--red)", borderRadius: "50%", position: "relative", zIndex: 1, boxShadow: "0 0 6px var(--red)" }} />
  </div>
);

/* Clock / 15 visual */
const ClockVisual = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "var(--bg3)", padding: "6px 12px", borderRadius: "6px", border: "1.5px solid #1c1d24", boxShadow: "inset 0 2px 5px rgba(0,0,0,0.85)" }} className="crt-display">
    <span style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 900, color: "var(--red)", textShadow: "0 0 8px var(--red)", lineHeight: 1, letterSpacing: "-0.04em" }}>15</span>
    <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>min</span>
  </div>
);

const visuals = { music: <MusicVisual />, psy: <PsyVisual />, clock: <ClockVisual /> };

export default function BeyondSection({ lang }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const items = cards[lang];

  return (
    <section id="beyond">
      {/* Header row */}
      <motion.div
        ref={ref}
        className="beyond-header"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="beyond-title-block">
          <div className="section-label" style={{ marginBottom: "1.2rem" }}>
            {lang === "en" ? "Beyond Code" : "Kodun Ötesi"}
          </div>
          <h2 className="beyond-section-title">
            {lang === "en" ? <>The <em>human</em> side</> : <>İnsan <em>tarafı</em></>}
          </h2>
        </div>
        <div className="beyond-section-count">— 3 {lang === "en" ? "dimensions" : "boyut"}</div>
      </motion.div>

      {/* Stacked horizontal cards */}
      <div className="beyond-stack">
        {items.map((card, i) => (
          <motion.div
            key={i}
            className="beyond-card"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.15, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* Left strip: eyebrow + visual */}
            <div className="beyond-card-left">
              <div className="hardware-screw" style={{ position: "absolute", top: "12px", left: "12px", opacity: 0.4 }} />
              <div className="hardware-screw" style={{ position: "absolute", top: "12px", right: "12px", opacity: 0.4 }} />
              
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="led-light red-on" />
                <div className="beyond-card-eyebrow">{card.eyebrow}</div>
              </div>
              <div className="beyond-card-visual">{visuals[card.visual]}</div>
              
              <div className="hardware-screw" style={{ position: "absolute", bottom: "12px", left: "12px", opacity: 0.4 }} />
              <div className="hardware-screw" style={{ position: "absolute", bottom: "12px", right: "12px", opacity: 0.4 }} />
            </div>
            {/* Right: title + body */}
            <div className="beyond-card-right">
              <div className="beyond-card-title">{card.title}</div>
              <p className="beyond-card-body">{card.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
