import { useRef } from "react";
import { motion } from "framer-motion";
import DecryptedText from "../ReactBits/DecryptedText";
import { AcademicIcon, SparkIcon, BrainIcon, MusicIcon } from "../common/Icons";

const content = {
  en: {
    sectionNum: "01 // ABOUT",
    title: "ENGINEER, ENTREPRENEUR, SOLOIST.",
    subtitle: "CS student, Zorus co-founder, vocalist, psychology enthusiast.",
    cards: [
      {
        bg: "var(--neo-white)",
        col: "neo-col-8",
        icon: <AcademicIcon size={26} />,
        title: "Selçuk University, Computer Engineering",
        text: "I study CS at Selçuk University while building our startup Zorus with a close friend. Right now, our focus is entirely on developing our first application, Hoppozorus.",
        tag: "EDUCATION & VENTURES",
        tagColor: "var(--neo-yellow)"
      },
      {
        bg: "var(--neo-pink)",
        textColor: "#fff",
        col: "neo-col-4",
        icon: <SparkIcon size={26} color="#fff" />,
        title: "The 15-Minute Theory",
        text: "I believe a genuine 15-minute conversation reveals far more than months of surface-level observation. Listening with real curiosity rather than judgment is a mindset I bring to every problem I solve.",
        tag: "PHILOSOPHY",
        tagColor: "#000",
        tagText: "#fff"
      },
      {
        bg: "var(--neo-cyan)",
        col: "neo-col-4",
        icon: <BrainIcon size={26} />,
        title: "Body Language & Communication",
        text: "I have always found it fascinating how much people reveal through their body language and facial expressions without saying a single word.",
      },
      {
        bg: "var(--neo-lime)",
        col: "neo-col-8",
        icon: <MusicIcon size={26} />,
        title: "Soloist & Guitarist",
        text: "3 stage performances so far. I play guitar and sing, listen to a lot of Duman. Music is where I step away from screens and recharge.",
      }
    ],
    stats: [
      { num: "3",  sup: "×", label: "STAGE PERFORMANCES" },
      { num: "1",  sup: "✦", label: "STARTUP CO-FOUNDED" },
      { num: "15", sup: "MIN", label: "TO CONNECT WITH PEOPLE" },
    ]
  },
  tr: {
    sectionNum: "01 // HAKKIMDA",
    title: "MÜHENDİS, GİRİŞİMCİ, SOLİST.",
    subtitle: "Bilgisayar mühendisliği öğrencisi, Zorus kurucu ortağı, solist, insan psikolojisi meraklısı.",
    cards: [
      {
        bg: "var(--neo-white)",
        col: "neo-col-8",
        icon: <AcademicIcon size={26} />,
        title: "Selçuk Üniversitesi, Bilgisayar Mühendisliği",
        text: "Selçuk Üniversitesi'nde Bilgisayar Mühendisliği okuyorum. Bir yandan da arkadaşımla kurduğumuz Zorus şirketi ve ilk ürünümüz Hoppozorus üzerinde çalışıyorum.",
        tag: "EĞİTİM & GİRİŞİM",
        tagColor: "var(--neo-yellow)"
      },
      {
        bg: "var(--neo-pink)",
        textColor: "#fff",
        col: "neo-col-4",
        icon: <SparkIcon size={26} color="#fff" />,
        title: "15 Dakika Teorisi",
        text: "15 dakikalık samimi bir konuşmanın, aylarca uzaktan gözlem yapmaktan çok daha fazlasını ortaya çıkardığına inanıyorum. Yargılamadan, sadece merak ederek dinlemek hem insan ilişkilerinde hem de kod yazarken karşılaştığım sorunları çözmemi sağlıyor.",
        tag: "FELSEFE",
        tagColor: "#000",
        tagText: "#fff"
      },
      {
        bg: "var(--neo-cyan)",
        col: "neo-col-4",
        icon: <BrainIcon size={26} />,
        title: "Beden Dili & İletişim",
        text: "İnsanların söylemedikleri şeyleri vücut dili ve mimik hareketleriyle nasıl dışa vurduğunu gözlemlemek bana her zaman ilginç geliyor.",
      },
      {
        bg: "var(--neo-lime)",
        col: "neo-col-8",
        icon: <MusicIcon size={26} />,
        title: "Solist & Gitarist",
        text: "3 sahne performansı verdim. Gitar çalıyorum ve şarkı söylüyorum, bol Duman dinliyorum. Müzik benim için ekran başından uzaklaşıp nefes aldığım alan.",
      }
    ],
    stats: [
      { num: "3",  sup: "×", label: "SAHNE PERFORMANSI" },
      { num: "1",  sup: "✦", label: "KURULAN GİRİŞİM" },
      { num: "15", sup: "DK", label: "İNSANLARLA BAĞ KURMA" },
    ]
  }
};

export default function AboutSection({ lang }) {
  const t = content[lang];

  return (
    <section id="about" className="neo-section">
      {/* Section Header */}
      <div className="neo-section-header">
        <div className="neo-section-num">{t.sectionNum}</div>
        <h2 className="neo-section-title">{t.title}</h2>
      </div>

      {/* Bento Grid Layout */}
      <div className="neo-bento-grid" style={{ marginBottom: "36px" }}>
        {t.cards.map((card, idx) => (
          <motion.div
            key={idx}
            className={`neo-box neo-box-interactive neo-bento-card ${card.col}`}
            style={{
              backgroundColor: card.bg,
              color: card.textColor || "var(--neo-black)"
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 300, damping: 24, delay: idx * 0.1 }}
          >
            <div>
              <div className="neo-bento-icon" style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                {card.icon}
              </div>
              {card.tag && (
                <div
                  className="neo-badge"
                  style={{
                    backgroundColor: card.tagColor,
                    color: card.tagText || "var(--neo-black)",
                    marginBottom: "14px"
                  }}
                >
                  {card.tag}
                </div>
              )}
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "8px" }}>
                {card.title}
              </h3>
              <p style={{ opacity: 0.9, fontSize: "1.05rem", lineHeight: 1.5 }}>
                {card.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Cards Row */}
      <div className="neo-bento-grid">
        {t.stats.map((stat, i) => (
          <motion.div
            key={i}
            className="neo-box neo-col-4"
            style={{
              padding: "24px",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              background: "var(--neo-yellow)"
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.1 }}
          >
            <div
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 900,
                fontSize: "3.2rem",
                lineHeight: 1,
                display: "flex",
                alignItems: "baseline"
              }}
            >
              <DecryptedText text={stat.num} speed={50} />
              <span style={{ color: "var(--neo-pink)", fontSize: "2rem", marginLeft: "4px" }}>
                {stat.sup}
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 800,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                lineHeight: 1.3
              }}
            >
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
