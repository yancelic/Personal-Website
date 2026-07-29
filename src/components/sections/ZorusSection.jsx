import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const content = {
  en: {
    sectionNum: "03 // FLAGSHIP VENTURE",
    badge: "CO-FOUNDER & LEAD ENGINEER",
    title: "ZORUS",
    tagline: "Intelligent systems built to augment human productivity without friction.",
    desc: "Zorus is the startup I co-founded. We develop habit-building ecosystems, productivity tools, and intelligent software that seamlessly integrates into daily lives.",
    pillars: [
      { num: "01", title: "INTELLIGENCE", desc: "AI & ML-powered habit tracking algorithms", bg: "var(--neo-yellow)" },
      { num: "02", title: "EXPERIENCE", desc: "Zahmetsiz & zero-friction user interfaces", bg: "var(--neo-cyan)" },
      { num: "03", title: "REAL IMPACT", desc: "Measurable growth & behavior science", bg: "var(--neo-pink)", textColor: "#fff" }
    ],
    cta: "EXPLORE VENTURE DETAILS ⚡",
    modalTitle: "Zorus Venture Overview",
    modalText: "Zorus is built on the philosophy that the best technology is invisible — it amplifies your capabilities while respecting your focus. Designed with precision UX and robust software architecture.",
    closeModal: "CLOSE MODAL ✕"
  },
  tr: {
    sectionNum: "03 // AMİRAL GEMİSİ GİRİŞİM",
    badge: "KURUCU ORTAK & LİDER MÜHENDİS",
    title: "ZORUS",
    tagline: "Sürtünmesiz insan verimliliğini güçlendirmek için inşa edilen akıllı sistemler.",
    desc: "Zorus, kurucu ortağı olduğum girişim. Alışkanlık kazanımı ekosistemleri, verimlilik araçları ve günlük hayata entegre olan akıllı yazılımlar geliştiriyoruz.",
    pillars: [
      { num: "01", title: "ZEKA", desc: "YZ & MÖ destekli alışkanlık algoritmaları", bg: "var(--neo-yellow)" },
      { num: "02", title: "DENEYİM", desc: "Zahmetsiz ve yüksek hızlı kullanıcı arayüzleri", bg: "var(--neo-cyan)" },
      { num: "03", title: "GERÇEK ETKİ", desc: "Ölçülebilir gelişim & davranış bilimi", bg: "var(--neo-pink)", textColor: "#fff" }
    ],
    cta: "GİRİŞİM DETAYLARINI KEŞFET ⚡",
    modalTitle: "Zorus Girişim Özeti",
    modalText: "Zorus, en iyi teknolojinin görünmez olduğu felsefesi üzerine kuruludur — odağınıza saygı duyarak yeteneklerinizi artırır. Hassas UX ve güçlü yazılım mimarisiyle tasarlanmıştır.",
    closeModal: "MODALI KAPAT ✕"
  }
};

export default function ZorusSection({ lang }) {
  const t = content[lang];
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="zorus" className="neo-section">
      {/* Section Header */}
      <div className="neo-section-header">
        <div className="neo-section-num">{t.sectionNum}</div>
        <h2 className="neo-section-title">THE VENTURE: ZORUS</h2>
      </div>

      {/* Main Cyber Lime Spotlight Card */}
      <motion.div
        className="neo-zorus-hero"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Left Side: Venture Description & CTAs */}
        <div>
          <div className="neo-zorus-badge">{t.badge}</div>
          <h3 
            style={{ 
              fontFamily: "var(--font-syne)", 
              fontWeight: 900, 
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              lineHeight: 0.95,
              marginBottom: "16px"
            }}
          >
            {t.title}
          </h3>
          <p 
            style={{ 
              fontSize: "1.3rem", 
              fontWeight: 700, 
              lineHeight: 1.4,
              marginBottom: "16px",
              color: "var(--neo-black)" 
            }}
          >
            {t.tagline}
          </p>
          <p style={{ fontSize: "1.05rem", opacity: 0.9, marginBottom: "28px", lineHeight: 1.6 }}>
            {t.desc}
          </p>

          <motion.button
            className="neo-btn neo-btn-black"
            onClick={() => setModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t.cta}
          </motion.button>
        </div>

        {/* Right Side: Pillars Preview Box */}
        <div className="neo-zorus-preview-box">
          <div className="neo-badge neo-pink" style={{ alignSelf: "flex-start" }}>
            // CORE PILLARS
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {t.pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                className="neo-box neo-box-interactive"
                style={{
                  padding: "16px",
                  backgroundColor: pillar.bg,
                  color: pillar.textColor || "var(--neo-black)",
                  borderRadius: "10px"
                }}
                whileHover={{ x: -4 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                  <span className="neo-badge" style={{ background: "#000", color: "#fff", padding: "2px 6px" }}>
                    {pillar.num}
                  </span>
                  <span style={{ fontWeight: 800, fontSize: "1.1rem" }}>{pillar.title}</span>
                </div>
                <p style={{ fontSize: "0.9rem", opacity: 0.95 }}>{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modal Drawer Overview */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="neo-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="neo-modal-content"
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="neo-badge neo-yellow" style={{ marginBottom: "12px" }}>
                ZORUS // INSIGHTS
              </div>
              <h3 style={{ fontFamily: "var(--font-syne)", fontSize: "2rem", fontWeight: 800, marginBottom: "16px" }}>
                {t.modalTitle}
              </h3>
              <p style={{ fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "24px" }}>
                {t.modalText}
              </p>
              <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
                <div className="neo-badge neo-cyan">⚡ 15-MIN ECOSYSTEM</div>
                <div className="neo-badge neo-lime">🧠 HABIT LOOPS</div>
              </div>

              <motion.button
                className="neo-btn neo-btn-pink"
                onClick={() => setModalOpen(false)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.closeModal}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
