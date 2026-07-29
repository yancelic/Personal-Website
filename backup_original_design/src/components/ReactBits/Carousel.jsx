import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Carousel({ items = [], style = {} }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + items.length) % items.length);
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", ...style }}>
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ width: "100%" }}
        >
          {items[current]}
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "2rem",
        }}
      >
        <button
          onClick={() => go(-1)}
          style={{
            background: "transparent",
            border: "0.5px solid var(--border)",
            color: "var(--amber)",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "border-color 0.2s",
          }}
        >
          ←
        </button>
        <div style={{ display: "flex", gap: "8px" }}>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                border: "none",
                background: i === current ? "var(--amber)" : "rgba(200,132,58,0.3)",
                cursor: "pointer",
                transition: "all 0.3s",
                padding: 0,
              }}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          style={{
            background: "transparent",
            border: "0.5px solid var(--border)",
            color: "var(--amber)",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "border-color 0.2s",
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}
