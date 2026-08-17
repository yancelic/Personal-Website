import { useRef } from "react";
import { motion } from "framer-motion";
import DecryptedText from "../ReactBits/DecryptedText";
import { AcademicIcon, SparkIcon, BrainIcon, MusicIcon } from "../common/Icons";

const content = {
  en: {
    sectionNum: "01 // BIO",
    title: "ENGINEER BY TRAINING, EXPLORER BY NATURE",
    subtitle: "Merging computer science, entrepreneurial vision, and human psychology.",
    cards: [
      {
        bg: "var(--neo-white)",
        col: "neo-col-8",
        icon: <AcademicIcon size={26} />,
        title: "Selçuk University Computer Engineering '24",
        text: "Co-founder of Zorus — a venture built at the intersection of intelligent systems, productivity, and real-world impact.",
        tag: "EDUCATION & VENTURES",
        tagColor: "var(--neo-yellow)"
      },
      {
        bg: "var(--neo-pink)",
        textColor: "#fff",
        col: "neo-col-4",
        icon: <SparkIcon size={26} color="#fff" />,
        title: "The 15-Minute Rule",
        text: "I believe you can deeply connect with almost anyone in just 15 minutes of genuine listening and observation.",
        tag: "PHILOSOPHY",
        tagColor: "#000",
        tagText: "#fff"
      },
      {
        bg: "var(--neo-cyan)",
        col: "neo-col-4",
        icon: <BrainIcon size={26} />,
        title: "Psychology & Body Language",
        text: "Great engineers understand people, not just algorithms. Deeply fascinated by non-verbal communication.",
        tag: "PASSION",
        tagColor: "var(--neo-yellow)"
      },
      {
        bg: "var(--neo-lime)",
        col: "neo-col-8",
        icon: <MusicIcon size={26} />,
        title: "Artist & Soloist",
        text: "Performed 3 times as a soloist. Guitar player, music enthusiast, and lover of deep, meaningful conversations.",
        tag: "CREATIVE SIDE",
        tagColor: "var(--neo-pink)",
        tagText: "#fff"
      }
    ],
    stats: [
      { num: "3",  sup: "×", label: "SOLO PERFORMANCES" },
      { num: "1",  sup: "✦", label: "STARTUP CO-FOUNDED" },
      { num: "15", sup: "MIN", label: "TO CONNECT WITH PEOPLE" },
    ]
  },
  tr: {
    sectionNum: "01 // BİYOGRAFİ",
    title: "EĞİTİMLE MÜHENDİS, DOĞAYLA KAŞİF",
    subtitle: "Bilgisayar bilimini, girişimci vizyonu ve insan psikolojisini bir araya getiriyorum.",
    cards: [
      {
        bg: "var(--neo-white)",
        col: "neo-col-8",
        icon: <AcademicIcon size={26} />,
        title: "Selçuk Üniversitesi Bilgisayar Mühendisliği '24",
        text: "Akıllı sistemler, verimlilik ve gerçek dünya etkisi üzerine kurulan Zorus girişiminin kurucu ortağı.",
        tag: "EĞİTİM & GİRİŞİM",
        tagColor: "var(--neo-yellow)"
      },
      {
        bg: "var(--neo-pink)",
        textColor: "#fff",
        col: "neo-col-4",
        icon: <SparkIcon size={26} color="#fff" />,
        title: "15 Dakika Kuralı",
        text: "Gerçek bir dinleme ve gözlemle, herkesle 15 dakikada derin bir bağ kurulabileceğine inanıyorum.",
        tag: "FELSEFE",
        tagColor: "#000",
        tagText: "#fff"
      },
      {
        bg: "var(--neo-cyan)",
        col: "neo-col-4",
        icon: <BrainIcon size={26} />,
        title: "Psikoloji & Beden Dili",
        text: "İyi mühendisler sadece algoritmaları değil, insanları da anlar. Beden diline ve iletişime tutkuluyum.",
        tag: "TUTKU",
        tagColor: "var(--neo-yellow)"
      },
      {
        bg: "var(--neo-lime)",
        col: "neo-col-8",
        icon: <MusicIcon size={26} />,
        title: "Sanatçı & Solist",
        text: "Solist olarak 3 kez sahne aldım. Gitarist, müzik sevdalısı ve derin sohbetlerin tutkunuyum.",
        tag: "YARATICI YÖN",
        tagColor: "var(--neo-pink)",
        tagText: "#fff"
      }
    ],
    stats: [
      { num: "3",  sup: "×", label: "SOLO PERFORMANS" },
      { num: "1",  sup: "✦", label: "KURULAN STARTUP" },
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
