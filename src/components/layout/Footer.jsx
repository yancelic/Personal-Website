import { motion } from "framer-motion";

export default function Footer({ lang }) {
  return (
    <footer className="neo-footer">
      <div className="neo-footer-inner">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <div className="neo-badge neo-pink" style={{ marginBottom: "16px" }}>
              // YANKI MUHSIN KILIÇ
            </div>
            <h2 className="neo-footer-bigtext">
              CODE // MUSIC // 15 MIN
            </h2>
          </div>

          <motion.button
            className="neo-btn neo-btn-cyan"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            BACK TO TOP ↑
          </motion.button>
        </div>

        <div 
          style={{ 
            display: "flex", 
            justify: "space-between", 
            alignItems: "center", 
            flexWrap: "wrap", 
            gap: "16px",
            borderTop: "2px solid #333",
            paddingTop: "24px" 
          }}
        >
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", opacity: 0.8 }}>
            © {new Date().getFullYear()} YANKI MUHSIN KILIÇ. {lang === "en" ? "ALL RIGHTS RESERVED." : "TÜM HAKLARI SAKLIDIR."}
          </p>

          <div style={{ display: "flex", gap: "10px" }}>
            <span className="neo-badge neo-yellow" style={{ fontSize: "0.75rem" }}>REACT</span>
            <span className="neo-badge neo-lime" style={{ fontSize: "0.75rem" }}>FRAMER MOTION</span>
            <span className="neo-badge neo-pink" style={{ fontSize: "0.75rem", color: "#fff" }}>NEO-BRUTALISM</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
