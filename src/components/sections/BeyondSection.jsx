import { useState } from "react";
import { motion } from "framer-motion";

const cards = {
  en: {
    sectionNum: "04 // HUMAN DIMENSION",
    title: "BEYOND CODE",
    subtitle: "Music, human psychology, and the 15-minute connection philosophy.",
    items: [
      {
        bg: "var(--neo-yellow)",
        tag: "MUSIC & GUITAR",
        title: "Soloist & Guitarist",
        text: "3 solo performances on stage. Music taught me that great code, like great songs, requires rhythm, tension, and resolution.",
        visual: "cassette"
      },
      {
        bg: "var(--neo-pink)",
        textColor: "#fff",
        tag: "HUMAN PSYCHOLOGY",
        title: "Reading the Unspoken",
        text: "Passionate about body language, cognitive dynamics, and social signals. Understanding people makes better engineers.",
        visual: "radar"
      },
      {
        bg: "var(--neo-cyan)",
        tag: "PHILOSOPHY",
        title: "The 15-Minute Rule",
        text: "15 genuine minutes of listening and observation can reveal more than months of surface-level small talk.",
        visual: "clock"
      }
    ]
  },
  tr: {
    sectionNum: "04 // İNSAN BOYUTU",
    title: "KODUN ÖTESİ",
    subtitle: "Müzik, insan psikolojisi ve 15 dakikalık bağ kurma felsefesi.",
    items: [
      {
        bg: "var(--neo-yellow)",
        tag: "MÜZİK & GİTAR",
        title: "Solist & Gitarist",
        text: "Sahnede 3 solo performans. Müzik bana en iyi yazılımların tıpkı şarkılar gibi ritim ve çözüme ihtiyaç duyduğunu öğretti.",
        visual: "cassette"
      },
      {
        bg: "var(--neo-pink)",
        textColor: "#fff",
        tag: "İNSAN PSİKOLOJİSİ",
        title: "Söylenmeyeni Okumak",
        text: "Beden dili, bilişsel önyargılar ve sosyal sinyallere tutkuluyum. İnsanları anlamak daha iyi mühendisler yetiştirir.",
        visual: "radar"
      },
      {
        bg: "var(--neo-cyan)",
        tag: "FELSEFE",
        title: "15 Dakika Kuralı",
        text: "15 dakikalık samimi bir dinleme ve gözlem, aylarca süren yüzeysel sohbetten daha derin bir bağ kurabilir.",
        visual: "clock"
      }
    ]
  }
};

function CassetteVisual() {
  const [isPlaying, setIsPlaying] = useState(true);
  return (
    <div 
      className="neo-box"
      style={{
        padding: "12px 18px",
        background: "var(--neo-black)",
        color: "var(--neo-yellow)",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        borderRadius: "10px",
        cursor: "pointer"
      }}
      onClick={() => setIsPlaying(!isPlaying)}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        <div className={`neo-reel ${isPlaying ? "neo-reel-spin" : ""}`}>
          <div style={{ width: "8px", height: "8px", background: "var(--neo-yellow)", borderRadius: "50%" }} />
        </div>
        <div className={`neo-reel ${isPlaying ? "neo-reel-spin" : ""}`}>
          <div style={{ width: "8px", height: "8px", background: "var(--neo-yellow)", borderRadius: "50%" }} />
        </div>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 800 }}>
        {isPlaying ? "▶ PLAYING // 44.1kHz" : "⏸ PAUSED"}
      </div>
    </div>
  );
}

function RadarVisual() {
  return (
    <div 
      className="neo-box"
      style={{
        padding: "12px 18px",
        background: "var(--neo-white)",
        color: "var(--neo-black)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        borderRadius: "10px"
      }}
    >
      <div 
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          border: "3px solid var(--neo-pink)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "pulseBlink 1.2s infinite ease-in-out"
        }}
      >
        <div style={{ width: "8px", height: "8px", background: "var(--neo-pink)", borderRadius: "50%" }} />
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: "0.85rem" }}>
        SIGNAL DETECTED // 100%
      </span>
    </div>
  );
}

function ClockVisual() {
  return (
    <div 
      className="neo-box"
      style={{
        padding: "10px 16px",
        background: "var(--neo-black)",
        color: "var(--neo-lime)",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        borderRadius: "10px"
      }}
    >
      <span style={{ fontFamily: "var(--font-syne)", fontWeight: 900, fontSize: "1.8rem", lineHeight: 1 }}>
        15
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: "0.8rem" }}>
        MIN / CONVERSATION
      </span>
    </div>
  );
}

export default function BeyondSection({ lang }) {
  const t = cards[lang];

  return (
    <section id="beyond" className="neo-section">
      {/* Section Header */}
      <div className="neo-section-header">
        <div className="neo-section-num">{t.sectionNum}</div>
        <h2 className="neo-section-title">{t.title}</h2>
      </div>

      {/* Stacked Brutalist Cards */}
      <div className="neo-bento-grid">
        {t.items.map((item, idx) => (
          <motion.div
            key={idx}
            className="neo-box neo-box-interactive neo-col-4"
            style={{
              backgroundColor: item.bg,
              color: item.textColor || "var(--neo-black)",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "20px"
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 24, delay: idx * 0.15 }}
          >
            <div>
              <div 
                className="neo-badge" 
                style={{ 
                  background: "var(--neo-white)", 
                  color: "#000",
                  marginBottom: "16px"
                }}
              >
                //{item.tag}
              </div>

              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "10px" }}>
                {item.title}
              </h3>

              <p style={{ opacity: 0.9, fontSize: "1.05rem", lineHeight: 1.5 }}>
                {item.text}
              </p>
            </div>

            <div>
              {item.visual === "cassette" && <CassetteVisual />}
              {item.visual === "radar" && <RadarVisual />}
              {item.visual === "clock" && <ClockVisual />}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
