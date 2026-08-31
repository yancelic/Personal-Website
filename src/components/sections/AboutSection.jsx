import { motion } from "framer-motion";
import DecryptedText from "../ReactBits/DecryptedText";
import { AcademicIcon, SparkIcon, BrainIcon, MusicIcon } from "../common/Icons";

const content = {
  en: {
    sectionNum: "01 // ABOUT",
    title: "Engineer, Entrepreneur, Soloist.",
    subtitle: "CS student, Zorus co-founder, vocalist, psychology enthusiast.",
    cards: [
      {
        col: "xp-col-8",
        icon: <AcademicIcon size={20} />,
        title: "Selçuk University, Computer Engineering",
        text: "I study CS at Selçuk University while building our startup Zorus with a close friend. Right now, our focus is entirely on developing our first application, Hoppozorus.",
        tag: "EDUCATION & VENTURES",
        accent: "#D5E5F8",
      },
      {
        col: "xp-col-4",
        icon: <SparkIcon size={20} />,
        title: "The 15-Minute Theory",
        text: "I believe a genuine 15-minute conversation reveals far more than months of surface-level observation. Listening with real curiosity rather than judgment is a mindset I bring to every problem I solve.",
        tag: "PHILOSOPHY",
        accent: "#EDD5F8",
      },
      {
        col: "xp-col-4",
        icon: <BrainIcon size={20} />,
        title: "Body Language & Communication",
        text: "I have always found it fascinating how much people reveal through their body language and facial expressions without saying a single word.",
        tag: "PSYCHOLOGY",
        accent: "#D5F8E5",
      },
      {
        col: "xp-col-8",
        icon: <MusicIcon size={20} />,
        title: "Soloist & Guitarist",
        text: "3 stage performances so far. I play guitar and sing, listen to a lot of Duman. Music is where I step away from screens and recharge.",
        tag: "MUSIC",
        accent: "#F8F0D5",
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
    title: "Mühendis, Girişimci, Solist.",
    subtitle: "Bilgisayar mühendisliği öğrencisi, Zorus kurucu ortağı, solist, insan psikolojisi meraklısı.",
    cards: [
      {
        col: "xp-col-8",
        icon: <AcademicIcon size={20} />,
        title: "Selçuk Üniversitesi, Bilgisayar Mühendisliği",
        text: "Selçuk Üniversitesi'nde Bilgisayar Mühendisliği okuyorum. Bir yandan da arkadaşımla kurduğumuz Zorus şirketi ve ilk ürünümüz Hoppozorus üzerinde çalışıyorum.",
        tag: "EĞİTİM & GİRİŞİM",
        accent: "#D5E5F8",
      },
      {
        col: "xp-col-4",
        icon: <SparkIcon size={20} />,
        title: "15 Dakika Teorisi",
        text: "15 dakikalık samimi bir konuşmanın, aylarca uzaktan gözlem yapmaktan çok daha fazlasını ortaya çıkardığına inanıyorum. Yargılamadan, sadece merak ederek dinlemek hem insan ilişkilerinde hem de kod yazarken karşılaştığım sorunları çözmemi sağlıyor.",
        tag: "FELSEFE",
        accent: "#EDD5F8",
      },
      {
        col: "xp-col-4",
        icon: <BrainIcon size={20} />,
        title: "Beden Dili & İletişim",
        text: "İnsanların söylemedikleri şeyleri vücut dili ve mimik hareketleriyle nasıl dışa vurduğunu gözlemlemek bana her zaman ilginç geliyor.",
        tag: "PSİKOLOJİ",
        accent: "#D5F8E5",
      },
      {
        col: "xp-col-8",
        icon: <MusicIcon size={20} />,
        title: "Solist & Gitarist",
        text: "3 sahne performansı verdim. Gitar çalıyorum ve şarkı söylüyorum, bol Duman dinliyorum. Müzik benim için ekran başından uzaklaşıp nefes aldığım alan.",
        tag: "MÜZİK",
        accent: "#F8F0D5",
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
    <section id="about" className="xp-section">
      {/* Section header */}
      <div className="xp-section-header">
        <span className="xp-section-num">{t.sectionNum}</span>
        <h2 className="xp-section-title">{t.title}</h2>
      </div>

      {/* Bento-style XP panels */}
      <div className="xp-bento-grid" style={{ marginBottom: "10px" }}>
        {t.cards.map((card, idx) => (
          <motion.div
            key={idx}
            className={`xp-panel ${card.col}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.3, delay: idx * 0.07 }}
            style={{ minHeight: "160px" }}
          >
            {/* Panel blue header with icon and tag */}
            <div
              className="xp-panel-blue-header"
              style={{ background: card.accent, borderBottomColor: "#7F9DB9" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                {card.icon}
                <span style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", color: "#003" }}>
                  {card.tag}
                </span>
              </div>
            </div>
            <h3 style={{ fontSize: "13px", fontWeight: "bold", marginBottom: "6px", color: "var(--xp-text)" }}>
              {card.title}
            </h3>
            <p style={{ fontSize: "12px", color: "var(--xp-text-muted)", lineHeight: "1.55" }}>
              {card.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Stats row */}
      <div className="xp-stat-row">
        {t.stats.map((stat, i) => (
          <motion.div
            key={i}
            className="xp-stat-cell"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.28, delay: i * 0.08 }}
          >
            <div className="xp-stat-number">
              <DecryptedText text={stat.num} speed={50} />
              <span className="xp-stat-sup">{stat.sup}</span>
            </div>
            <div className="xp-stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
