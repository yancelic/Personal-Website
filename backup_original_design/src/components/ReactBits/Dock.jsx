import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const ITEM_SIZE = 50;
const MAGNIFY_SIZE = 70;
const MAGNIFY_DIST = 100;

function DockItem({ item, mouseX }) {
  const ref = useRef(null);

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
  const springSize = useSpring(size, { stiffness: 300, damping: 28 });

  return (
    <motion.button
      ref={ref}
      title={item.label}
      onClick={item.onClick}
      style={{
        width: springSize,
        height: springSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        background: "linear-gradient(to bottom, #24252c, #131418)",
        border: "1px solid #0b0c0e",
        boxShadow: "0 3px 0 #0b0c0e, 0 4px 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        cursor: "pointer",
        flexShrink: 0,
        color: "var(--red)",
        fontSize: "1.25rem",
        transition: "color 0.2s, background 0.2s, transform 0.05s, box-shadow 0.05s",
        outline: "none"
      }}
      whileHover={{ 
        background: "linear-gradient(to bottom, #2b2c35, #191a20)",
        color: "#fff",
        textShadow: "0 0 6px var(--red)"
      }}
      whileTap={{
        transform: "translateY(2px)",
        boxShadow: "0 1px 0 #0b0c0e, 0 1px 2px rgba(0,0,0,0.5)",
      }}
    >
      {item.icon}
    </motion.button>
  );
}

export default function Dock({ items = [] }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="panel-raised"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px 16px",
        zIndex: 500,
        boxShadow: "0 15px 30px rgba(0,0,0,0.7)",
        borderRadius: "14px",
      }}
    >
      <div className="hardware-screw" style={{ opacity: 0.5 }} />
      {items.map((item, i) => (
        <DockItem key={i} item={item} mouseX={mouseX} />
      ))}
      <div className="hardware-screw" style={{ opacity: 0.5 }} />
    </motion.div>
  );
}
