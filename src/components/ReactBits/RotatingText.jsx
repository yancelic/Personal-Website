import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RotatingText({
  texts = [],
  interval = 3000,
  className = "",
  style = {},
}) {
  const [index, setIndex] = useState(0);
  const textsRef = useRef(texts);
  textsRef.current = texts;

  useEffect(() => {
    if (textsRef.current.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % textsRef.current.length);
    }, interval);
    return () => clearInterval(t);
  }, [interval]);

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        verticalAlign: "middle",
        ...style,
      }}
      className={className}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          style={{ display: "inline-block", color: "inherit", fontWeight: "inherit" }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {textsRef.current[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
