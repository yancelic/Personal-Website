export default function Footer({ lang }) {
  return (
    <footer className="xp-footer">
      <div className="xp-footer-inner">

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div className="xp-badge xp-badge-blue" style={{ marginBottom: "10px" }}>
              YANKI MUHSIN KILIÇ
            </div>
            <h2 className="xp-footer-title">
              CODE // MUSIC // 15 MIN
            </h2>
          </div>

          <button
            className="xp-btn xp-btn-primary"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ alignSelf: "flex-end" }}
          >
            ↑ {lang === "en" ? "Back to Top" : "Yukarı Çık"}
          </button>
        </div>

        <div className="xp-footer-bottom">
          <p className="xp-footer-copy">
            © {new Date().getFullYear()} YANKI MUHSIN KILIÇ.{" "}
            {lang === "en" ? "All rights reserved." : "Tüm hakları saklıdır."}
          </p>
          <div className="xp-footer-tags">
            <span className="xp-footer-tag">React</span>
            <span className="xp-footer-tag">Framer Motion</span>
            <span className="xp-footer-tag">Vite</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
