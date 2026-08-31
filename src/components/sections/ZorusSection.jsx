import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparkIcon, RocketIcon } from "../common/Icons";

const content = {
  en: {
    sectionNum: "03 // VENTURE",
    sectionTitle: "The Venture: Zorus",
    badge: "CO-FOUNDER",
    title: "ZORUS",
    tagline: "An early-stage software company co-founded with a close friend. Currently building our first app, Hoppozorus.",
    desc: "We haven't launched any apps yet — everything is fresh and in active development. Our full focus right now is building Hoppozorus with a clean architecture and a thoughtful user experience.",
    pillars: [
      { num: "01", title: "HOPPOZORUS", desc: "Our first app currently in active development" },
      { num: "02", title: "FRESH & EARLY", desc: "No launched apps yet — building the foundation right" },
      { num: "03", title: "TWO FOUNDERS", desc: "Two friends turning ideas into a real product" }
    ],
    cta: "About Zorus",
    modalTitle: "Zorus & Hoppozorus",
    modalText: "Zorus is an early-stage startup I co-founded with my friend. We haven't released any apps yet — our current energy is 100% dedicated to building Hoppozorus. Rather than rushing a half-baked product out, we're focusing on creating a solid, enjoyable experience from day one.",
    closeModal: "Close",
    coreLabel: "// CORE PILLARS",
  },
  tr: {
    sectionNum: "03 // GİRİŞİM",
    sectionTitle: "Girişim: Zorus",
    badge: "KURUCU ORTAK",
    title: "ZORUS",
    tagline: "Arkadaşımla kurduğumuz yazılım şirketi. Şu an ilk ürünümüz olan Hoppozorus uygulamasını geliştiriyoruz.",
    desc: "Henüz yayınlanmış bir uygulamamız yok, tamamen sıfırdan geliştirme aşamasındayız. Şu anki tüm odağımız ilk projemiz olan Hoppozorus'u sağlam bir altyapı ve sade bir deneyimle hayata geçirmek.",
    pillars: [
      { num: "01", title: "HOPPOZORUS", desc: "Geliştirmekte olduğumuz ilk uygulamamız" },
      { num: "02", title: "ERKEN AŞAMA", desc: "Henüz yayında ürün yok; mutfakta hazırlık sürüyor" },
      { num: "03", title: "İKİ KURUCU", desc: "İki arkadaşın sıfırdan bir şirket ve ürün inşa etme süreci" }
    ],
    cta: "Zorus Hakkında",
    modalTitle: "Zorus & Hoppozorus",
    modalText: "Zorus, arkadaşımla birlikte kurduğumuz bir girişim. Şu anda tüm enerjimizi ilk projemiz olan Hoppozorus'a vermiş durumdayız. Henüz marketlerde yayınlanmış bir ürünümüz yok; aceleyle bir şeyler çıkarmak yerine hem arayüzü hem de altyapısı sağlam bir ürün ortaya koymaya odaklandık.",
    closeModal: "Kapat",
    coreLabel: "// TEMEL SÜTUNLAR",
  }
};

export default function ZorusSection({ lang }) {
  const t = content[lang];
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="zorus" className="xp-section">
      {/* Section header */}
      <div className="xp-section-header">
        <span className="xp-section-num">{t.sectionNum}</span>
        <h2 className="xp-section-title">{t.sectionTitle}</h2>
      </div>

      {/* Main Zorus window */}
      <motion.div
        className="xp-window"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
      >
        {/* XP Title bar */}
        <div className="xp-titlebar">
          <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
            <span className="xp-titlebar-icon">🚀</span>
            <span className="xp-titlebar-text">Zorus — {t.badge}</span>
          </div>
          <div className="xp-window-controls">
            <div className="xp-wc-btn">_</div>
            <div className="xp-wc-btn">□</div>
            <div className="xp-wc-btn close-btn">✕</div>
          </div>
        </div>

        <div className="xp-client-area" style={{ padding: "14px" }}>
          <div className="xp-zorus-wrap">

            {/* Left: description */}
            <div className="xp-zorus-left" style={{ padding: "0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                <span
                  className="xp-badge"
                  style={{ background: "#1B6FDE", color: "#fff", borderColor: "#0B3D8C", fontSize: "10px" }}
                >
                  {t.badge}
                </span>
              </div>

              <div className="xp-zorus-title">{t.title}</div>
              <p className="xp-zorus-tagline">{t.tagline}</p>
              <p className="xp-zorus-desc">{t.desc}</p>

              <button
                className="xp-btn xp-btn-primary"
                onClick={() => setModalOpen(true)}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <SparkIcon size={14} color="#fff" />
                {t.cta}
              </button>
            </div>

            {/* Right: pillars as XP list */}
            <div>
              <div className="xp-groupbox" style={{ padding: "0", overflow: "hidden" }}>
                <div
                  style={{
                    background: "linear-gradient(180deg, #D5E5F8 0%, #C5D8F0 100%)",
                    borderBottom: "1px solid #7F9DB9",
                    padding: "6px 10px",
                    fontFamily: "var(--font-ui)",
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "#003399",
                  }}
                >
                  {t.coreLabel}
                </div>
                <div className="xp-list" style={{ padding: "6px" }}>
                  {t.pillars.map((pillar, idx) => (
                    <motion.div
                      key={idx}
                      className="xp-list-item"
                      whileHover={{ background: "#D5E5F8" }}
                      style={{ cursor: "default" }}
                    >
                      <span className="xp-list-num">{pillar.num}</span>
                      <div>
                        <span className="xp-list-title">{pillar.title}</span>
                        <span className="xp-list-desc">{pillar.desc}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* XP Dialog Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="xp-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="xp-dialog"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* XP dialog title bar */}
              <div className="xp-titlebar">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className="xp-titlebar-icon">ℹ️</span>
                  <span className="xp-titlebar-text">{t.modalTitle}</span>
                </div>
                <div className="xp-window-controls">
                  <div
                    className="xp-wc-btn close-btn"
                    onClick={() => setModalOpen(false)}
                    style={{ cursor: "pointer" }}
                  >✕</div>
                </div>
              </div>

              <div className="xp-dialog-body">
                <div style={{ display: "flex", gap: "8px", marginBottom: "4px" }}>
                  <span className="xp-badge" style={{ background: "#1B6FDE", color: "#fff", borderColor: "#0B3D8C" }}>
                    <SparkIcon size={11} color="#fff" />
                    HOPPOZORUS
                  </span>
                  <span className="xp-badge xp-badge-green">
                    <RocketIcon size={11} color="#fff" />
                    {lang === "en" ? "EARLY STAGE" : "ERKEN AŞAMA"}
                  </span>
                </div>
                <p className="xp-dialog-text">{t.modalText}</p>
              </div>

              <div className="xp-dialog-footer">
                <button
                  className="xp-btn xp-btn-primary"
                  onClick={() => setModalOpen(false)}
                  autoFocus
                >
                  {t.closeModal}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
