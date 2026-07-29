import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const ITEM_SIZE = 52;
const MAGNIFY_SIZE = 68;
const MAGNIFY_DIST = 100;

function DockItem({ item, mouseX }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return MAGNIFY_DIST + 1;
    const center = bounds.left + bounds.width / 2;
    return Math.abs(val - center);
  });

  const size = useTransform(
    distance,
    [0, MAGNIFY_DIST],
    [MAGNIFY_SIZE, ITEM_SIZE]
  );
  const springSize = useSpring(size, { stiffness: 350, damping: 25 });

  return (
    <div style={{ position: "relative" }}>
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: -45, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            background: "var(--neo-yellow)",
            color: "var(--neo-black)",
            border: "2.5px solid #0D0D11",
            boxShadow: "2.5px 2.5px 0px #0D0D11",
            borderRadius: "6px",
            padding: "3px 8px",
            fontFamily: "var(--font-mono)",
            fontWeight: 800,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            zIndex: 10,
            pointerEvents: "none"
          }}
        >
          {item.label}
        </motion.div>
      )}

      <motion.button
        ref={ref}
        onClick={item.onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: springSize,
          height: springSize,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
          background: hovered ? "var(--neo-yellow)" : "var(--neo-white)",
          border: "3px solid #0D0D11",
          boxShadow: hovered ? "4px 4px 0px #0D0D11" : "3px 3px 0px #0D0D11",
          cursor: "pointer",
          color: "var(--neo-black)",
          fontWeight: 800,
          fontSize: "1.2rem",
          outline: "none"
        }}
        whileHover={{
          y: -4,
        }}
        whileTap={{
          y: 2,
          boxShadow: "1px 1px 0px #0D0D11"
        }}
      >
        {item.icon}
      </motion.button>
    </div>
  );
}

export default function Dock({ items = [], lang, setLang }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.6 }}
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 18px",
        zIndex: 500,
        background: "var(--neo-white)",
        border: "3.5px solid #0D0D11",
        boxShadow: "6px 6px 0px #0D0D11",
        borderRadius: "16px",
      }}
    >
      <div 
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "var(--neo-pink)",
          border: "2px solid #0D0D11"
        }} 
      />

      {items.map((item, i) => (
        <DockItem key={i} item={item} mouseX={mouseX} />
      ))}

      {/* Embedded Arcade Language Switcher */}
      {setLang && (
        <div 
          className="neo-lang-switch" 
          style={{ marginLeft: "4px" }}
        >
          <button 
            className={`neo-lang-btn ${lang === "en" ? "active" : ""}`} 
            onClick={() => setLang("en")}
          >
            EN
          </button>
          <button 
            className={`neo-lang-btn ${lang === "tr" ? "active" : ""}`} 
            onClick={() => setLang("tr")}
          >
            TR
          </button>
        </div>
      )}

      <div 
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "var(--neo-lime)",
          border: "2px solid #0D0D11"
        }} 
      />
    </motion.div>
  );
}
