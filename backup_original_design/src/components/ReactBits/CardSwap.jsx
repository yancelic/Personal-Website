import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CardSwap({ cards = [], style = {} }) {
  const [active, setActive] = useState(0);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", ...style }}>
      <AnimatePresence mode="popLayout">
        {cards.map((card, i) => {
          const offset = i - active;
          const isActive = i === active;
          const isNext = offset > 0 && offset <= 2;
          const isPrev = offset < 0;

          if (isPrev || offset > 2) return null;

          return (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                cursor: isActive ? "default" : "pointer",
              }}
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{
                scale: isActive ? 1 : 1 - offset * 0.04,
                opacity: isActive ? 1 : 1 - offset * 0.3,
                y: isActive ? 0 : offset * 16,
                zIndex: isActive ? 10 : 10 - offset,
              }}
              exit={{ scale: 0.88, opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={() => {
                if (!isActive) setActive(i);
              }}
            >
              {card}
            </motion.div>
          );
        })}
      </AnimatePresence>
      {/* Navigation dots */}
      <div
        style={{
          position: "absolute",
          bottom: "-2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
          zIndex: 20,
        }}
      >
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: i === active ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              border: "none",
              background: i === active ? "var(--amber)" : "rgba(200,132,58,0.3)",
              cursor: "pointer",
              transition: "all 0.3s",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
