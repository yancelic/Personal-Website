import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

function VelocityTrack({ text, baseVelocity = 3, direction = 1 }) {
  const baseX = useRef(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useTransform(scrollY, [0, 1], [0, 0]);
  // Simple infinite loop approach
  return (
    <div style={{ display: "flex", whiteSpace: "nowrap", overflow: "hidden" }}>
      <motion.div
        style={{ display: "flex", gap: "3rem" }}
        animate={{ x: direction > 0 ? [0, "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 20 / Math.abs(baseVelocity), ease: "linear", repeat: Infinity }}
      >
        {[...Array(8)].map((_, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "3rem" }}>
            {text.map((item, j) => (
              <span key={j} style={{ display: "inline-flex", alignItems: "center", gap: "1rem" }}>
                <span
                  style={{
                    width: "4px",
                    height: "4px",
                    background: "var(--amber)",
                    borderRadius: "50%",
                    flexShrink: 0,
                  }}
                />
                <span>{item}</span>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function ScrollVelocity({
  texts = [[]],
  baseVelocity = 3,
  style = {},
}) {
  return (
    <div style={style}>
      {texts.map((textArr, i) => (
        <VelocityTrack
          key={i}
          text={textArr}
          baseVelocity={baseVelocity}
          direction={i % 2 === 0 ? 1 : -1}
        />
      ))}
    </div>
  );
}
