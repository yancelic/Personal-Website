import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const expertise = {
  en: {
    sectionNum: "02 // TECH MATRIX",
    title: "AREAS OF DEEP FOCUS",
    subtitle: "High-level software engineering, artificial intelligence, and interactive real-time engines.",
    categories: ["ALL", "MACHINE LEARNING", "APP DEV", "GAME DEV"],
    items: [
      {
        id: "ml",
        num: "01",
        title: "Machine Learning & AI",
        cat: "MACHINE LEARNING",
        bg: "var(--neo-yellow)",
        desc: "Building intelligent systems that learn from data. Focused on neural architectures, pattern recognition, and practical LLM/Agent integrations.",
        level: "88%",
        tags: ["Python", "PyTorch", "TensorFlow", "Data Science", "Scikit-Learn"]
      },
      {
        id: "app",
        num: "02",
        title: "App & Web Development",
        cat: "APP DEV",
        bg: "var(--neo-cyan)",
        desc: "Building clean, functional, high-performance applications from concept to production. Crafting friction-free user experiences.",
        level: "94%",
        tags: ["React", "React Native", "Node.js", "Vite", "JavaScript", "REST APIs"]
      },
      {
        id: "game",
        num: "03",
        title: "Game Dev & Realtime Engines",
        cat: "GAME DEV",
        bg: "var(--neo-pink)",
        textColor: "#fff",
        desc: "Crafting immersive interactive experiences. Exploring game mechanics, C++ performance, and digital playground psychology.",
        level: "82%",
        tags: ["Unreal Engine", "C++", "Game Design", "3D Math", "UX Physics"]
      }
    ]
  },
  tr: {
    sectionNum: "02 // TEKNİK MATRİS",
    title: "DERİN ODAK ALANLARI",
    subtitle: "İleri düzey yazılım mühendisliği, yapay zeka ve gerçek zamanlı oyun motorları.",
    categories: ["HEPSİ", "MAKİNE ÖĞRENMESİ", "UYGULAMA GELİŞTİRME", "OYUN GELİŞTİRME"],
    items: [
      {
        id: "ml",
        num: "01",
        title: "Makine Öğrenmesi & YZ",
        cat: "MAKİNE ÖĞRENMESİ",
        bg: "var(--neo-yellow)",
        desc: "Veriden öğrenen zeka sistemleri inşa ediyorum. Sinir ağı mimarileri, örüntü tanıma ve pratik YZ ajan uygulamalarına odaklı.",
        level: "88%",
        tags: ["Python", "PyTorch", "TensorFlow", "Data Science", "Scikit-Learn"]
      },
      {
        id: "app",
        num: "02",
        title: "Uygulama & Web Geliştirme",
        cat: "UYGULAMA GELİŞTİRME",
        bg: "var(--neo-cyan)",
        desc: "Fikirden canlıya kadar temiz, yüksek performanslı uygulamalar geliştiriyorum. Sürtünmesiz kullanıcı deneyimleri tasarlıyorum.",
        level: "94%",
        tags: ["React", "React Native", "Node.js", "Vite", "JavaScript", "REST APIs"]
      },
      {
        id: "game",
        num: "03",
        title: "Oyun Geliştirme & Motorlar",
        cat: "OYUN GELİŞTİRME",
        bg: "var(--neo-pink)",
        textColor: "#fff",
        desc: "İnteraktif deneyimler ve dünyalar yaratıyorum. Oyun mekanikleri, C++ performansı ve dijital oyun psikolojisini keşfediyorum.",
        level: "82%",
        tags: ["Unreal Engine", "C++", "Game Design", "3D Math", "UX Physics"]
      }
    ]
  }
};

export default function ExpertiseSection({ lang }) {
  const t = expertise[lang];
  const [selectedCat, setSelectedCat] = useState(t.categories[0]);

  const filteredItems = t.items.filter((item) => {
    if (selectedCat === t.categories[0]) return true;
    if (selectedCat === "MACHINE LEARNING" || selectedCat === "MAKİNE ÖĞRENMESİ") return item.id === "ml";
    if (selectedCat === "APP DEV" || selectedCat === "UYGULAMA GELİŞTİRME") return item.id === "app";
    if (selectedCat === "GAME DEV" || selectedCat === "OYUN GELİŞTİRME") return item.id === "game";
    return true;
  });

  return (
    <section id="expertise" className="neo-section">
      {/* Section Header */}
      <div className="neo-section-header">
        <div className="neo-section-num">{t.sectionNum}</div>
        <h2 className="neo-section-title">{t.title}</h2>
      </div>

      {/* Category Filter Buttons */}
      <div className="neo-filter-group">
        {t.categories.map((cat) => {
          const isActive = selectedCat === cat;
          return (
            <motion.button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`neo-btn ${isActive ? "neo-btn-pink" : "neo-btn-outline"}`}
              style={{ fontSize: "0.85rem", padding: "8px 18px" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="neo-skills-matrix">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="neo-box neo-box-interactive neo-skill-card"
              style={{
                backgroundColor: item.bg,
                color: item.textColor || "var(--neo-black)"
              }}
            >
              <div className="neo-skill-header">
                <span 
                  className="neo-badge" 
                  style={{ background: "var(--neo-white)", color: "#000" }}
                >
                  //{item.num} {item.cat}
                </span>
                <span className="neo-badge" style={{ background: "var(--neo-black)", color: "var(--neo-yellow)" }}>
                  {item.level} PROFICIENCY
                </span>
              </div>

              <h3 className="neo-skill-title" style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                {item.title}
              </h3>

              <p style={{ opacity: 0.9, fontSize: "1rem", lineHeight: 1.5 }}>
                {item.desc}
              </p>

              {/* Progress Bar */}
              <div className="neo-skill-bar-wrap">
                <div 
                  className="neo-skill-bar-fill"
                  style={{ 
                    width: item.level, 
                    background: item.textColor ? "var(--neo-yellow)" : "var(--neo-pink)" 
                  }} 
                />
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
                {item.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="neo-badge" 
                    style={{ 
                      fontSize: "0.75rem", 
                      padding: "3px 8px",
                      background: "var(--neo-white)",
                      color: "#000"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
