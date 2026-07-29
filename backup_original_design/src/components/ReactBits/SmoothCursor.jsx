"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const DEFAULT_SPRING = { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 };

function DefaultCursorSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 3L19 12L12 13.5L8.5 21L5 3Z"
        fill="#c8843a"
        stroke="#c8843a"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

export function SmoothCursor({ cursor = <DefaultCursorSVG />, springConfig = DEFAULT_SPRING }) {
  const cursorRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotate = useMotionValue(0);

  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const prevPos = useRef({ x: 0, y: 0 });

  const updateCursor = useCallback((e) => {
    const x = e.clientX;
    const y = e.clientY;

    const dx = x - prevPos.current.x;
    const dy = y - prevPos.current.y;

    if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      rotate.set(angle);
    }

    prevPos.current = { x, y };
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY, rotate]);

  useEffect(() => {
    // Disable on touch devices
    if (isTouchDevice()) {
      setIsTouch(true);
      return;
    }

    document.body.style.cursor = "none";
    const onMove = (e) => {
      updateCursor(e);
      if (!isVisible) setIsVisible(true);
    };
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [updateCursor, isVisible]);

  // Don't render on touch devices
  if (isTouch) return null;

  return (
    <motion.div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        rotate,
        translateX: "-50%",
        translateY: "-50%",
        pointerEvents: "none",
        zIndex: 99999,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease",
        willChange: "transform",
      }}
    >
      {cursor}
    </motion.div>
  );
}
