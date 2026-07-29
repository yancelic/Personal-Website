import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function ScrollFloat({
  children,
  offset = 60,
  className = "",
  style = {},
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 0.4, 1], [offset, 0, -offset * 0.3]);
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.4]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
