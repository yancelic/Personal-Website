import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparkIcon, RocketIcon, BrainIcon } from "../common/Icons";

const content = {
  en: {
    sectionNum: "03 // VENTURE",
    badge: "CO-FOUNDER",
    title: "ZORUS",
    sectionTitle: "THE VENTURE: ZORUS",
    tagline: "An early-stage software company co-founded with a close friend. Currently building our first app, Hoppozorus.",
    desc: "We haven't launched any apps yet — everything is fresh and in active development. Our full focus right now is building Hoppozorus with a clean architecture and a thoughtful user experience.",
    pillars: [
      { num: "01", title: "HOPPOZORUS", desc: "Our first app currently in active development", bg: "var(--neo-yellow)" },
      { num: "02", title: "FRESH & EARLY", desc: "No launched apps yet — building the foundation right", bg: "var(--neo-cyan)" },
      { num: "03", title: "TWO FOUNDERS", desc: "Two friends turning ideas into a real product", bg: "var(--neo-pink)", textColor: "#fff" }
    ],
    cta: "ABOUT ZORUS",
    modalTitle: "Zorus & Hoppozorus",
    modalText: "Zorus is an early-stage startup I co-founded with my friend. We haven't released any apps yet — our current energy is 100% dedicated to building Hoppozorus. Rather than rushing a half-baked product out, we're focusing on creating a solid, enjoyable experience from day one.",
    closeModal: "CLOSE ✕"
  },
  tr: {
    sectionNum: "03 // GİRİŞİM",
    badge: "KURUCU ORTAK",
    title: "ZORUS",
    sectionTitle: "GİRİŞİM: ZORUS",
    tagline: "Arkadaşımla kurduğumuz yazılım şirketi. Şu an ilk ürünümüz olan Hoppozorus uygulamasını geliştiriyoruz.",
    desc: "Henüz yayınlanmış bir uygulamamız yok, tamamen sıfırdan geliştirme aşamasındayız. Şu anki tüm odağımız ilk projemiz olan Hoppozorus'u sağlam bir altyapı ve sade bir deneyimle hayata geçirmek.",
    pillars: [
      { num: "01", title: "HOPPOZORUS", desc: "Geliştirmekte olduğumuz ilk uygulamamız", bg: "var(--neo-yellow)" },
      { num: "02", title: "ERKEN AŞAMA", desc: "Henüz yayında ürün yok; mutfakta hazırlık sürüyor", bg: "var(--neo-cyan)" },
      { num: "03", title: "İKİ KURUCU", desc: "İki arkadaşın sıfırdan bir şirket ve ürün inşa etme süreci", bg: "var(--neo-pink)", textColor: "#fff" }
    ],
    cta: "ZORUS HAKKINDA",
    modalTitle: "Zorus & Hoppozorus",
    modalText: "Zorus, arkadaşımla birlikte kurduğumuz bir girişim. Şu anda tüm enerjimizi ilk projemiz olan Hoppozorus'a vermiş durumdayız. Henüz marketlerde yayınlanmış bir ürünümüz yok; aceleyle bir şeyler çıkarmak yerine hem arayüzü hem de altyapısı sağlam bir ürün ortaya koymaya odaklandık. Yolun başındayız ama süreç çok keyifli.",
    closeModal: "KAPAT ✕"
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
        <h2 className="neo-section-title">{t.sectionTitle}</h2>
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
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <SparkIcon size={18} />
            <span>{t.cta}</span>
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
              <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
                <div className="neo-badge neo-cyan" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <SparkIcon size={14} />
                  <span>HOPPOZORUS</span>
                </div>
                <div className="neo-badge neo-lime" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <RocketIcon size={14} />
                  <span>{lang === "en" ? "EARLY STAGE" : "ERKEN AŞAMA"}</span>
                </div>
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
