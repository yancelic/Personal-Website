import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import DecryptedText from "../ReactBits/DecryptedText";

const content = {
  en: {
    label: "Who I Am",
    title: <>Engineer <em>by training,</em><br />explorer by nature</>,
    p1: <>I'm <strong>Yankı Muhsin Kılıç</strong>, a Computer Engineering student at Selçuk University and co-founder of <strong>Zorus</strong> — a venture built at the intersection of intelligent systems and real-world problem solving.</>,
    p2: <>My technical interests span <strong>Machine Learning</strong>, <strong>Game Development</strong>, and <strong>App Development</strong>. But I believe great engineers understand people, not just systems.</>,
    p3: <>That's why I'm equally passionate about <strong>Psychology</strong> and <strong>body language</strong>. I've performed as a soloist three times, and I play guitar. I'm outgoing, I love deep conversations, and I'm a firm believer that you can understand almost anyone in just 15 minutes — if you listen right.</>,
    stats: [
      { num: "3",  sup: "×", label: "Solo\nPerformances" },
      { num: "1",  sup: "✦", label: "Startup\nCo-founded" },
      { num: "15", sup: "′", label: "Minutes\nto connect" },
    ],
  },
  tr: {
    label: "Ben Kimim",
    title: <>Eğitimle <em>mühendis,</em><br />doğayla kaşif</>,
    p1: <>Ben <strong>Yankı Muhsin Kılıç</strong>, Selçuk Üniversitesi'nde Bilgisayar Mühendisliği öğrencisi ve <strong>Zorus</strong>'un kurucu ortağıyım — zeka sistemleri ile gerçek dünya problem çözümünün kesişiminde inşa edilmiş bir girişim.</>,
    p2: <>Teknik ilgi alanlarım <strong>Makine Öğrenmesi</strong>, <strong>Oyun Geliştirme</strong> ve <strong>Uygulama Geliştirme</strong>'yi kapsıyor. Ama büyük mühendislerin yalnızca sistemleri değil, insanları da anladığına inanıyorum.</>,
    p3: <>Bu yüzden <strong>Psikoloji</strong> ve <strong>beden diline</strong> de eşit derecede tutkuyla bağlıyım. Solist olarak üç kez sahne aldım, gitar çalıyorum. Dışa dönük biriyim, derin sohbetleri seviyorum.</>,
    stats: [
      { num: "3",  sup: "×", label: "Solo\nPerformans" },
      { num: "1",  sup: "✦", label: "Kurulan\nStartup" },
      { num: "15", sup: "Dakikada\nbağ" },
    ],
  },
};

function Reveal({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
    >{children}</motion.div>
  );
}

export default function AboutSection({ lang }) {
  const t = content[lang];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="about">
      {/* Large decorative number + title row */}
      <div className="about-header">
        <motion.div
          ref={ref}
          className="about-number"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.08 } : {}}
          transition={{ duration: 1.2 }}
        >01</motion.div>
        <div className="about-header-right">
          <div className="section-label" style={{ marginBottom: "1.5rem" }}>{t.label}</div>
          <motion.h2
            className="about-section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
          >{t.title}</motion.h2>
        </div>
      </div>

      {/* Content: text left, stats right */}
      <div className="about-content">
        <Reveal delay={0.2}>
          <div className="about-text">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <p>{t.p3}</p>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="about-stats">
            {t.stats.map((s, i) => (
              <div className="about-stat-row" key={i}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div className="hardware-screw" style={{ opacity: 0.35 }} />
                  <div className="stat-num crt-display" style={{ 
                    padding: "8px 18px", 
                    borderRadius: "6px", 
                    border: "2px solid #1a1a22",
                    fontSize: "2.4rem"
                  }}>
                    <DecryptedText text={s.num} speed={60} />
                    <span style={{ color: "var(--red)", fontSize: "1.5rem", marginLeft: "2px" }}>{s.sup}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div className="stat-label" style={{ whiteSpace: "pre-line" }}>{s.label}</div>
                  <div className="hardware-screw" style={{ opacity: 0.35 }} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
