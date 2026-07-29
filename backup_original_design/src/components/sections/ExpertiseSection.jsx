import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";

const expertise = {
  en: [
    {
      num: "01",
      title: "Machine Learning",
      desc: "Building intelligent systems that learn from data. Interested in neural architectures, pattern recognition, and applied AI for real-world problems.",
      tags: ["Python", "PyTorch", "TensorFlow", "Data Science"],
    },
    {
      num: "02",
      title: "Game Development",
      desc: "Crafting interactive experiences and game worlds. From mechanics to narrative design, exploring how digital playgrounds shape human psychology.",
      tags: ["Unreal Engine", "C++", "Game Design", "UX"],
    },
    {
      num: "03",
      title: "App Development",
      desc: "Building clean, functional applications from concept to deployment. Focused on performance, usability, and experiences that feel inevitable.",
      tags: ["React", "React Native", "Node.js", "Flutter"],
    },
  ],
  tr: [
    {
      num: "01",
      title: "Makine Öğrenmesi",
      desc: "Veriden öğrenen zeka sistemleri inşa ediyorum. Sinir ağı mimarileri, örüntü tanıma ve gerçek dünya problemlerine uygulamalı yapay zeka.",
      tags: ["Python", "PyTorch", "TensorFlow", "Data Science"],
    },
    {
      num: "02",
      title: "Oyun Geliştirme",
      desc: "İnteraktif deneyimler ve oyun dünyaları yaratıyorum. Mekaniklerden anlatı tasarımına, dijital oyun alanlarının insan psikolojisini nasıl şekillendirdiğini keşfediyorum.",
      tags: ["Unreal Engine", "C++", "Game Design", "UX"],
    },
    {
      num: "03",
      title: "Uygulama Geliştirme",
      desc: "Fikirden dağıtıma kadar temiz, işlevsel uygulamalar geliştiriyorum. Performans, kullanılabilirlik ve kaçınılmaz hissettiren deneyimlere odaklanıyorum.",
      tags: ["React", "React Native", "Node.js", "Flutter"],
    },
  ],
};

export default function ExpertiseSection({ lang }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const items = expertise[lang];
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="expertise">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "0" }}
      >
        <div>
          <div className="section-label" style={{ marginBottom: "1.2rem" }}>
            {lang === "en" ? "What I Do" : "Ne Yapıyorum"}
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1,
            color: "var(--text)",
          }}>
            {lang === "en"
              ? <><em style={{ color: "var(--red)", fontStyle: "italic" }}>Areas</em> of deep focus</>
              : <><em style={{ color: "var(--red)", fontStyle: "italic" }}>Odak</em> alanlarım</>
            }
          </h2>
        </div>
        <div style={{
          fontFamily: "var(--font-serif)", fontSize: "0.75rem",
          color: "var(--text-dim)", paddingBottom: "0.4rem",
        }}>
          {lang === "en" ? "Click to expand" : "Genişletmek için tıklayın"}
        </div>
      </motion.div>

      {/* Accordion list — desktop */}
      <div className="expertise-list">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className={`expertise-item${openIndex === i ? " open" : ""}`}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
            onClick={() => toggle(i)}
          >
            <div className="expertise-item-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className={`led-light ${openIndex === i ? "red-on" : ""}`} />
                <span className="expertise-num">{item.num}</span>
              </div>
              <span className="expertise-item-title">{item.title}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span className="expertise-arrow">
                  {openIndex === i ? "↑" : "→"}
                </span>
                <span className="hardware-screw" style={{ opacity: 0.3 }} />
              </div>
            </div>
            <div className="expertise-item-body">
              <p className="expertise-desc">{item.desc}</p>
              <div className="expertise-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="expertise-tag">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Simple cards for mobile */}
      <div className="expertise-grid">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="expertise-card"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="led-light red-on" />
                <div className="expertise-card-num">{item.num}</div>
              </div>
              <span className="hardware-screw" style={{ opacity: 0.3 }} />
            </div>
            <div className="expertise-card-title">{item.title}</div>
            <div className="expertise-card-desc">{item.desc}</div>
            <div className="expertise-card-tags">
              {item.tags.map((tag) => (
                <span key={tag} className="expertise-tag">{tag}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
