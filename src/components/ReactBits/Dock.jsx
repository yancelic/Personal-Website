import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const ITEM_SIZE = 52;
const MAGNIFY_SIZE = 80;
const MAGNIFY_DIST = 120;

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
    <motion.div
      ref={ref}
      title={item.label}
      onClick={item.onClick}
      style={{
        width: springSize,
        height: springSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "14px",
        background: "rgba(22,20,17,0.85)",
        border: "0.5px solid rgba(200,132,58,0.2)",
        cursor: "pointer",
        flexShrink: 0,
        color: "var(--amber)",
        fontSize: "1.4rem",
        transition: "background 0.2s",
      }}
      whileHover={{ background: "rgba(200,132,58,0.12)" }}
    >
      {item.icon}
    </motion.div>
  );
}

export default function Dock({ items = [] }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "flex-end",
        gap: "8px",
        padding: "8px 12px",
        background: "rgba(13,12,11,0.75)",
        backdropFilter: "blur(20px)",
        border: "0.5px solid rgba(200,132,58,0.18)",
        borderRadius: "20px",
        zIndex: 500,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      {items.map((item, i) => (
        <DockItem key={i} item={item} mouseX={mouseX} />
      ))}
    </motion.div>
  );
}
