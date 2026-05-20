import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export const AuraCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState([]);
  
  // Use framer-motion values for instant, high-performance tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring settings for the outer ring (fluid, smooth following)
  const springConfig = { stiffness: 150, damping: 15 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return; // Disable on mobile

    // Hide native cursor
    document.body.style.cursor = "none";

    const onMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onMouseDown = (e) => {
      // Create a ripple effect on click
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    const onMouseOver = (e) => {
      if (e.target.closest("a, button, .focus-word, .btn-primary, .btn-outline, .zorus-pillar")) {
        setIsHovered(true);
      }
    };

    const onMouseOut = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [mouseX, mouseY]);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <>
      {/* 1. Click Ripples (Soundwave effect) */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 0.6, scale: 0 }}
            animate={{ opacity: 0, scale: 4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: ripple.x,
              top: ripple.y,
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              border: "2px solid var(--amber)",
              pointerEvents: "none",
              zIndex: 99998,
              translate: "-50% -50%",
            }}
          />
        ))}
      </AnimatePresence>

      {/* 2. Outer Smooth Ring */}
      <motion.div
        style={{
          position: "fixed",
          left: ringX,
          top: ringY,
          width: isHovered ? 48 : 24,
          height: isHovered ? 48 : 24,
          borderRadius: "50%",
          border: "1.5px solid var(--amber)",
          backgroundColor: isHovered ? "rgba(200, 132, 58, 0.15)" : "transparent",
          boxShadow: isHovered ? "0 0 15px rgba(200, 132, 58, 0.3)" : "none",
          pointerEvents: "none",
          zIndex: 99999,
          translate: "-50% -50%",
          transition: "width 0.2s, height 0.2s, background-color 0.2s, box-shadow 0.2s",
        }}
      />

      {/* 3. Inner Precision Dot */}
      <motion.div
        style={{
          position: "fixed",
          left: mouseX,
          top: mouseY,
          width: isHovered ? 10 : 6,
          height: isHovered ? 10 : 6,
          borderRadius: "50%",
          backgroundColor: "var(--amber)",
          pointerEvents: "none",
          zIndex: 100000,
          translate: "-50% -50%",
          transition: "width 0.2s, height 0.2s",
        }}
      />
    </>
  );
};

export default AuraCursor;
