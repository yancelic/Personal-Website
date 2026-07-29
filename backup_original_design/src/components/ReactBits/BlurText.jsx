import { useEffect, useRef } from "react";
import { useInView } from "../hooks/useInView";
import { motion } from "framer-motion";

export default function BlurText({
  text = "",
  delay = 0,
  duration = 0.6,
  className = "",
  style = {},
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className} style={{ display: "inline-block", ...style }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: "0.25em" }}
          initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
          transition={{
            duration,
            delay: delay + i * 0.08,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
