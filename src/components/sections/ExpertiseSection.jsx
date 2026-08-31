import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const expertise = {
  en: {
    sectionNum: "02 // TECHNICAL",
    title: "What I Work On",
    subtitle: "Machine learning, app development, and game engines.",
    categories: ["ALL", "MACHINE LEARNING", "APP DEV", "GAME DEV"],
    items: [
      {
        id: "ml",
        num: "01",
        title: "Machine Learning & AI",
        cat: "MACHINE LEARNING",
        accentBorder: "#1B6FDE",
        label: "MAIN AREA",
        desc: "Python, PyTorch, TensorFlow, scikit-learn. I work on neural networks, experiment with LLM integrations, and currently going deeper into agent architectures — which is what Zorus partly runs on.",
        tags: ["Python", "PyTorch", "TensorFlow", "Data Science", "Scikit-Learn"]
      },
      {
        id: "app",
        num: "02",
        title: "App & Web Development",
        cat: "APP DEV",
        accentBorder: "#2A7A2A",
        label: "ACTIVELY USING",
        desc: "React and React Native for web and mobile. I care a lot about interfaces feeling fast and actually comfortable to use — not just looking clean in a demo.",
        tags: ["React", "React Native", "Node.js", "Vite", "JavaScript", "REST APIs"]
      },
      {
        id: "game",
        num: "03",
        title: "Game Dev & Realtime Engines",
        cat: "GAME DEV",
        accentBorder: "#8B3A8B",
        label: "LEARNING",
        desc: "Unreal Engine and C++. I like how game development forces you to think about performance, physics, and how a space feels to move through. Still learning a lot here.",
        tags: ["Unreal Engine", "C++", "Game Design", "3D Math"]
      }
    ]
  },
  tr: {
    sectionNum: "02 // TEKNİK",
    title: "Çalıştığım Alanlar",
    subtitle: "Makine öğrenmesi, uygulama geliştirme ve oyun motorları.",
    categories: ["HEPSİ", "MAKİNE ÖĞRENMESİ", "UYGULAMA GELİŞTİRME", "OYUN GELİŞTİRME"],
    items: [
      {
        id: "ml",
        num: "01",
        title: "Makine Öğrenmesi & YZ",
        cat: "MAKİNE ÖĞRENMESİ",
        accentBorder: "#1B6FDE",
        label: "ANA ALANLARIM",
        desc: "Python, PyTorch, TensorFlow, scikit-learn kullanıyorum. Sinir ağlarıyla çalışıyor, LLM entegrasyonları deniyorum. Şu sıralar ajan mimarileri üzerine gidiyorum — Zorus'un bir kısmı da bu üzerine.",
        tags: ["Python", "PyTorch", "TensorFlow", "Data Science", "Scikit-Learn"]
      },
      {
        id: "app",
        num: "02",
        title: "Uygulama & Web Geliştirme",
        cat: "UYGULAMA GELİŞTİRME",
        accentBorder: "#2A7A2A",
        label: "AKTİF KULLANIM",
        desc: "Web ve mobil için React ve React Native. Arayüzlerin sadece iyi görünmesini değil, gerçekten rahat kullanılmasını önemsiyorum. Zorus'un frontend'i de burada.",
        tags: ["React", "React Native", "Node.js", "Vite", "JavaScript", "REST APIs"]
      },
      {
        id: "game",
        num: "03",
        title: "Oyun Geliştirme & Motorlar",
        cat: "OYUN GELİŞTİRME",
        accentBorder: "#8B3A8B",
        label: "ÖĞRENİYORUM",
        desc: "Unreal Engine ve C++. Oyun geliştirme performansı, fiziği ve bir uzayda hareket etmenin nasıl hissettirdiğini düşünmeye zorluyor. Burada hâlâ çok şey öğreniyorum.",
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
    <section id="expertise" className="xp-section">
      {/* Section header */}
      <div className="xp-section-header">
        <span className="xp-section-num">{t.sectionNum}</span>
        <h2 className="xp-section-title">{t.title}</h2>
      </div>

      {/* XP Tab strip for category filter */}
      <div style={{ marginBottom: "0" }}>
        <div className="xp-tab-strip">
          {t.categories.map((cat) => {
            const isActive = selectedCat === cat;
            return (
              <button
                key={cat}
                className={`xp-tab${isActive ? " active" : ""}`}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>
        <div className="xp-tab-content">
          {/* Skills grid */}
          <div className="xp-skills-grid">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -12 }}
                  transition={{ duration: 0.22 }}
                  className="xp-panel xp-skill-panel"
                  style={{
                    borderTop: `3px solid ${item.accentBorder}`,
                  }}
                >
                  <div className="xp-skill-header-row">
                    <span className="xp-badge" style={{ fontFamily: "var(--font-mono)", fontSize: "10px" }}>
                      //{item.num}
                    </span>
                    <span
                      className="xp-badge"
                      style={{
                        background: item.accentBorder,
                        color: "#fff",
                        borderColor: item.accentBorder,
                        fontSize: "10px",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>

                  <h3 className="xp-skill-title">{item.title}</h3>

                  <p className="xp-skill-desc">{item.desc}</p>

                  <div className="xp-tag-list">
                    {item.tags.map((tag) => (
                      <span key={tag} className="xp-tag">{tag}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
