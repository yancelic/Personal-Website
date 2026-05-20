import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "../hooks/useInView";
import DecryptedText from "../ReactBits/DecryptedText";
import ScrollFloat from "../ReactBits/ScrollFloat";

const content = {
  en: {
    label: "Who I Am",
    title1: "Engineer",
    title2: "by training,",
    title3: "explorer by nature",
    p1: (
      <>I&apos;m <strong>Yankı Muhsin Kılıç</strong>, a Computer Engineering student at Selçuk University and co-founder of <strong>Zorus</strong> — a venture built at the intersection of intelligent systems and real-world problem solving.</>
    ),
    p2: (
      <>My technical interests span <strong>Machine Learning</strong>, <strong>Game Development</strong>, and <strong>App Development</strong>. But I believe great engineers understand people, not just systems.</>
    ),
    p3: (
      <>That&apos;s why I&apos;m equally passionate about <strong>Psychology</strong> and <strong>body language</strong>. I&apos;ve performed as a soloist three times, and I play guitar. I&apos;m outgoing, I love deep conversations, and I&apos;m a firm believer that you can understand almost anyone in just 15 minutes — if you listen right.</>
    ),
    stat1: { num: "3", label: "Solo Performances" },
    stat2: { num: "1", label: "Startup Co-founded" },
    stat3: { num: "15", label: "Minutes to connect" },
  },
  tr: {
    label: "Ben Kimim",
    title1: "Mühendis",
    title2: "eğitimle,",
    title3: "kaşif doğayla",
    p1: (
      <>Ben <strong>Yankı Muhsin Kılıç</strong>, Selçuk Üniversitesi&apos;nde Bilgisayar Mühendisliği öğrencisi ve <strong>Zorus</strong>&apos;un kurucu ortağıyım — zeka sistemleri ile gerçek dünya problem çözümünün kesişiminde inşa edilmiş bir girişim.</>
    ),
    p2: (
      <>Teknik ilgi alanlarım <strong>Makine Öğrenmesi</strong>, <strong>Oyun Geliştirme</strong> ve <strong>Uygulama Geliştirme</strong>&apos;yi kapsıyor. Ama büyük mühendislerin yalnızca sistemleri değil, insanları da anladığına inanıyorum.</>
    ),
    p3: (
      <>Bu yüzden <strong>Psikoloji</strong> ve <strong>beden diline</strong> de eşit derecede tutkuyla bağlıyım. Solist olarak üç kez sahne aldım, gitar çalıyorum. Dışa dönük biriyim, derin sohbetleri seviyorum ve doğru dinlerseniz neredeyse herkesi 15 dakikada anlayabileceğinize kesinlikle inanıyorum.</>
    ),
    stat1: { num: "3", label: "Solo Performans" },
    stat2: { num: "1", label: "Kurulan Startup" },
    stat3: { num: "15", label: "Dakikada bağ" },
  },
};

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutSection({ lang }) {
  const t = content[lang];

  return (
    <section id="about" style={{ background: "var(--bg2)", padding: "7rem 3rem" }}>
      <Reveal><div className="section-label">{t.label}</div></Reveal>
      <ScrollFloat offset={40}>
        <h2 className="section-title">
          <em>{t.title1}</em> {t.title2}<br />{t.title3}
        </h2>
      </ScrollFloat>

      <div className="about-grid">
        <Reveal delay={0.2}>
          <div className="about-portrait">
            <div className="portrait-frame">
              <div className="portrait-corner tl" />
              <div className="portrait-corner br" />
              <div className="portrait-placeholder">
                <div className="portrait-initials">YMK</div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="about-text">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <p>{t.p3}</p>
            <div className="stat-row">
              {[t.stat1, t.stat2, t.stat3].map((s, i) => (
                <div className="stat" key={i}>
                  <span className="stat-num">
                    <DecryptedText text={s.num} speed={50} />
                  </span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
