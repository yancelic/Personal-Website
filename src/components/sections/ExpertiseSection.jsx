import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const expertise = {
  en: {
    sectionNum: "02 // TECHNICAL",
    title: "WHAT I WORK ON",
    subtitle: "Machine learning, app development, and game engines.",
    categories: ["ALL", "MACHINE LEARNING", "APP DEV", "GAME DEV"],
    items: [
      {
        id: "ml",
        num: "01",
        title: "Machine Learning & AI",
        cat: "MACHINE LEARNING",
        bg: "var(--neo-yellow)",
        desc: "Python, PyTorch, TensorFlow, scikit-learn. I work on neural networks, experiment with LLM integrations, and currently going deeper into agent architectures — which is what Zorus partly runs on.",
        label: "MAIN AREA",
        tags: ["Python", "PyTorch", "TensorFlow", "Data Science", "Scikit-Learn"]
      },
      {
        id: "app",
        num: "02",
        title: "App & Web Development",
        cat: "APP DEV",
        bg: "var(--neo-cyan)",
        desc: "React and React Native for web and mobile. I care a lot about interfaces feeling fast and actually comfortable to use — not just looking clean in a demo.",
        label: "ACTIVELY USING",
        tags: ["React", "React Native", "Node.js", "Vite", "JavaScript", "REST APIs"]
      },
      {
        id: "game",
        num: "03",
        title: "Game Dev & Realtime Engines",
        cat: "GAME DEV",
        bg: "var(--neo-pink)",
        textColor: "#fff",
        desc: "Unreal Engine and C++. I like how game development forces you to think about performance, physics, and how a space feels to move through. Still learning a lot here.",
        label: "LEARNING",
        tags: ["Unreal Engine", "C++", "Game Design", "3D Math"]
      }
    ]
  },
  tr: {
    sectionNum: "02 // TEKNİK",
    title: "ÇALIŞTIĞIM ALANLAR",
    subtitle: "Makine öğrenmesi, uygulama geliştirme ve oyun motorları.",
    categories: ["HEPSİ", "MAKİNE ÖĞRENMESİ", "UYGULAMA GELİŞTİRME", "OYUN GELİŞTİRME"],
    items: [
      {
        id: "ml",
        num: "01",
        title: "Makine Öğrenmesi & YZ",
        cat: "MAKİNE ÖĞRENMESİ",
        bg: "var(--neo-yellow)",
        desc: "Python, PyTorch, TensorFlow, scikit-learn kullanıyorum. Sinir ağlarıyla çalışıyor, LLM entegrasyonları deniyorum. Şu sıralar ajan mimarileri üzerine gidiyorum — Zorus'un bir kısmı da bu üzerine.",
        label: "ANA ALANLARIM",
        tags: ["Python", "PyTorch", "TensorFlow", "Data Science", "Scikit-Learn"]
      },
      {
        id: "app",
        num: "02",
        title: "Uygulama & Web Geliştirme",
        cat: "UYGULAMA GELİŞTİRME",
        bg: "var(--neo-cyan)",
        desc: "Web ve mobil için React ve React Native. Arayüzlerin sadece iyi görünmesini değil, gerçekten rahat kullanılmasını önemsiyorum. Zorus'un frontend'i de burada.",
        label: "AKTİF KULLANIM",
        tags: ["React", "React Native", "Node.js", "Vite", "JavaScript", "REST APIs"]
      },
      {
        id: "game",
        num: "03",
        title: "Oyun Geliştirme & Motorlar",
        cat: "OYUN GELİŞTİRME",
        bg: "var(--neo-pink)",
        textColor: "#fff",
        desc: "Unreal Engine ve C++. Oyun geliştirme performansı, fiziği ve bir uzayda hareket etmenin nasıl hissettirdiğini düşünmeye zorluyor. Burada hâlâ çok şey öğreniyorum.",
        label: "ÖĞRENİYORUM",
        tags: ["Unreal Engine", "C++", "Game Design", "3D Math"]
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
                  //{item.num}
                </span>
                <span className="neo-badge" style={{ background: "var(--neo-black)", color: "var(--neo-yellow)" }}>
                  {item.label}
                </span>
              </div>

              <h3 className="neo-skill-title" style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                {item.title}
              </h3>

              <p style={{ opacity: 0.9, fontSize: "1rem", lineHeight: 1.5 }}>
                {item.desc}
              </p>

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
