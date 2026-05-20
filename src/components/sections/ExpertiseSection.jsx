import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import CardSwap from "../ReactBits/CardSwap";
import ScrollFloat from "../ReactBits/ScrollFloat";

const expertise = {
  en: [
    {
      icon: (
        <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: 40, height: 40, color: "var(--amber)", marginBottom: "1.5rem" }}>
          <circle cx="20" cy="14" r="5" />
          <circle cx="8" cy="30" r="4" />
          <circle cx="32" cy="30" r="4" />
          <line x1="17" y1="18" x2="11" y2="27" />
          <line x1="23" y1="18" x2="29" y2="27" />
          <line x1="12" y1="30" x2="28" y2="30" />
        </svg>
      ),
      title: "Machine Learning",
      desc: "Building intelligent systems that learn from data. Interested in neural architectures, pattern recognition, and applied AI for real-world problems.",
      tags: ["Python", "PyTorch", "TensorFlow", "Data Science"],
    },
    {
      icon: (
        <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: 40, height: 40, color: "var(--amber)", marginBottom: "1.5rem" }}>
          <rect x="5" y="8" width="30" height="20" rx="2" />
          <polyline points="13,18 17,14 21,20 25,16 29,18" fill="none" />
          <line x1="14" y1="32" x2="26" y2="32" />
          <line x1="20" y1="28" x2="20" y2="32" />
        </svg>
      ),
      title: "Game Development",
      desc: "Crafting interactive experiences and game worlds. From mechanics to narrative design, exploring how digital playgrounds shape human psychology.",
      tags: ["Unreal Engine", "C++", "Game Design", "UX"],
    },
    {
      icon: (
        <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: 40, height: 40, color: "var(--amber)", marginBottom: "1.5rem" }}>
          <rect x="10" y="4" width="20" height="32" rx="3" />
          <line x1="16" y1="10" x2="24" y2="10" />
          <rect x="15" y="16" width="10" height="6" rx="1" strokeWidth="1" />
          <circle cx="20" cy="31" r="2" strokeWidth="1" />
        </svg>
      ),
      title: "App Development",
      desc: "Building clean, functional applications from concept to deployment. Focused on performance, usability, and experiences that feel inevitable.",
      tags: ["React", "React Native", "Node.js", "Flutter"],
    },
  ],
  tr: [
    {
      icon: (
        <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: 40, height: 40, color: "var(--amber)", marginBottom: "1.5rem" }}>
          <circle cx="20" cy="14" r="5" />
          <circle cx="8" cy="30" r="4" />
          <circle cx="32" cy="30" r="4" />
          <line x1="17" y1="18" x2="11" y2="27" />
          <line x1="23" y1="18" x2="29" y2="27" />
          <line x1="12" y1="30" x2="28" y2="30" />
        </svg>
      ),
      title: "Makine Öğrenmesi",
      desc: "Veriden öğrenen zeka sistemleri inşa ediyorum. Sinir ağı mimarileri, örüntü tanıma ve gerçek dünya problemlerine uygulamalı yapay zeka konularıyla ilgileniyorum.",
      tags: ["Python", "PyTorch", "TensorFlow", "Data Science"],
    },
    {
      icon: (
        <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: 40, height: 40, color: "var(--amber)", marginBottom: "1.5rem" }}>
          <rect x="5" y="8" width="30" height="20" rx="2" />
          <polyline points="13,18 17,14 21,20 25,16 29,18" fill="none" />
          <line x1="14" y1="32" x2="26" y2="32" />
          <line x1="20" y1="28" x2="20" y2="32" />
        </svg>
      ),
      title: "Oyun Geliştirme",
      desc: "İnteraktif deneyimler ve oyun dünyaları yaratıyorum. Mekaniklerden anlatı tasarımına, dijital oyun alanlarının insan psikolojisini nasıl şekillendirdiğini keşfediyorum.",
      tags: ["Unreal Engine", "C++", "Game Design", "UX"],
    },
    {
      icon: (
        <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: 40, height: 40, color: "var(--amber)", marginBottom: "1.5rem" }}>
          <rect x="10" y="4" width="20" height="32" rx="3" />
          <line x1="16" y1="10" x2="24" y2="10" />
          <rect x="15" y="16" width="10" height="6" rx="1" strokeWidth="1" />
          <circle cx="20" cy="31" r="2" strokeWidth="1" />
        </svg>
      ),
      title: "Uygulama Geliştirme",
      desc: "Fikirden dağıtıma kadar temiz, işlevsel uygulamalar geliştiriyorum. Performans, kullanılabilirlik ve kaçınılmaz hissettiren deneyimlere odaklanıyorum.",
      tags: ["React", "React Native", "Node.js", "Flutter"],
    },
  ],
};

function ExpertiseCard({ item }) {
  return (
    <div className="expertise-card" style={{ height: "100%", minHeight: "280px" }}>
      {item.icon}
      <div className="card-title">{item.title}</div>
      <div className="card-desc">{item.desc}</div>
      <div className="card-tags">
        {item.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
}

export default function ExpertiseSection({ lang }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const items = expertise[lang];

  return (
    <section id="expertise" style={{ background: "var(--bg)", padding: "7rem 3rem" }}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="section-label">{lang === "en" ? "What I Do" : "Ne Yapıyorum"}</div>
      </motion.div>

      <ScrollFloat offset={40}>
        <h2 className="section-title">
          {lang === "en" ? <><em>Expertise</em> &amp; focus areas</> : <><em>Uzmanlık</em> &amp; odak alanları</>}
        </h2>
      </ScrollFloat>

      {/* CardSwap for mobile / grid for desktop */}
      <div className="expertise-grid" style={{ marginTop: "3rem" }}>
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 * i }}
          >
            <ExpertiseCard item={item} />
          </motion.div>
        ))}
      </div>

      {/* Card swap on mobile */}
      <div className="expertise-cardswap">
        <CardSwap
          style={{ height: "300px" }}
          cards={items.map((item, i) => <ExpertiseCard key={i} item={item} />)}
        />
      </div>
    </section>
  );
}
