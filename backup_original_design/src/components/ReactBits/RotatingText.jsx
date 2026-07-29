import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RotatingText({
  texts = [],
  interval = 4500,
  className = "",
  style = {},
}) {
  const [index, setIndex] = useState(0);
  // Use a ref to store texts so the interval doesn't restart on every re-render
  const textsRef = useRef(texts);
  textsRef.current = texts;

  useEffect(() => {
    if (textsRef.current.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % textsRef.current.length);
    }, interval);
    return () => clearInterval(t);
    // Only depend on interval, not texts array reference
  }, [interval]);

  return (
    <span
      style={{
        display: "inline-block",
        position: "relative",
        overflow: "hidden",
        minWidth: "6em",
        verticalAlign: "bottom",
        ...style,
      }}
      className={className}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          style={{ display: "inline-block" }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {textsRef.current[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
