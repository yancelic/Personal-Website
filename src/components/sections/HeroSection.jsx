import BlurText from "../ReactBits/BlurText";
import TextType from "../ReactBits/TextType";
import RotatingText from "../ReactBits/RotatingText";
import MagnetLines from "../ReactBits/MagnetLines";
import BorderGlow from "../ReactBits/BorderGlow";
import GlareHover from "../ReactBits/GlareHover";

const content = {
  en: {
    tag: "Computer Engineer",
    subtitle: "Building things that matter — with code, music, and the quiet power of 15 minutes.",
    cta1: "Explore Zorus",
    cta2: "Let's Talk",
    scroll: "Scroll to explore",
    roles: ["Engineer", "Entrepreneur", "Artist"],
  },
  tr: {
    tag: "Bilgisayar Mühendisi",
    subtitle: "Kodun, müziğin ve 15 dakikanın sessiz gücüyle; fark yaratan değerler inşa etmek.",
    cta1: "Zorus'u Keşfet",
    cta2: "Konuşalım",
    scroll: "Keşfetmek için kaydır",
    roles: ["Mühendis", "Girişimci", "Sanatçı"],
  },
};

export default function HeroSection({ lang }) {
  const t = content[lang];

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 3rem", position: "relative", overflow: "hidden" }}>
      {/* Magnet Lines background */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.6, pointerEvents: "none" }}>
        <MagnetLines rows={8} cols={14} lineColor="rgba(200,132,58,0.12)" magnetRadius={150} />
      </div>

      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 70% at 70% 50%, rgba(200,132,58,0.06) 0%, transparent 70%)",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px" }}>
        {/* Tag */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase",
          color: "var(--amber)", marginBottom: "2rem",
          animation: "fadeUp 0.8s 0.3s forwards", opacity: 0,
        }}>
          <span style={{ display: "block", width: "24px", height: "1px", background: "var(--amber)" }} />
          <RotatingText texts={t.roles} interval={4000} />
          <span style={{ opacity: 0.5 }}>·</span>
          {t.tag}
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(3.5rem, 9vw, 8rem)",
          fontWeight: 300,
          lineHeight: 0.9,
          letterSpacing: "-0.02em",
          color: "var(--cream)",
          marginBottom: "0.2em",
        }}>
          <BlurText text="Yankı" delay={0.2} duration={0.8} style={{ color: "var(--amber)", fontStyle: "italic", display: "block" }} />
          <BlurText text="Muhsin" delay={0.45} duration={0.8} style={{ display: "block" }} />
          <BlurText text="Kılıç" delay={0.7} duration={0.8} style={{ display: "block" }} />
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
          fontWeight: 300,
          fontStyle: "italic",
          color: "var(--cream-dim)",
          marginTop: "1.5rem",
          marginBottom: "2.5rem",
          maxWidth: "640px",
          animation: "fadeUp 0.9s 0.8s forwards",
          opacity: 0,
        }}>
          <TextType text={t.subtitle} speed={30} />
        </p>

        {/* CTA */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", animation: "fadeUp 0.9s 1s forwards", opacity: 0 }}>
          <BorderGlow
            borderRadius={2}
            glowRadius={25}
            edgeSensitivity={50}
            glowColor="33 61 51"
            animated={true}
            style={{ display: "inline-flex" }}
          >
            <a href="#zorus" className="btn-primary" style={{ margin: 0, height: "100%" }}>{t.cta1}</a>
          </BorderGlow>

          <GlareHover
            width="auto"
            height="auto"
            borderRadius="2px"
            glareColor="rgba(200, 132, 58, 0.3)"
            style={{ display: "inline-flex" }}
          >
            <a href="#contact" className="btn-outline" style={{ margin: 0, height: "100%" }}>{t.cta2}</a>
          </GlareHover>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute", bottom: "2.5rem", left: "3rem",
        display: "flex", alignItems: "center", gap: "12px",
        fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase",
        color: "var(--text-muted)",
        animation: "fadeIn 1s 1.5s forwards", opacity: 0,
      }}>
        <div className="scroll-line" />
        <span>{t.scroll}</span>
      </div>
    </section>
  );
}
