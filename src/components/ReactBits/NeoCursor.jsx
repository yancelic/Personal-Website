import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { SparkIcon } from "../common/Icons";

export default function NeoCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e) => {
      const target = e.target.closest("a, button, .neo-box-interactive, .neo-sticker, input, textarea");
      if (target) {
        setIsHovered(true);
        if (target.tagName === "A" || target.tagName === "BUTTON") {
          setHoverText("CLICK");
        } else if (target.classList.contains("neo-sticker")) {
          setHoverText("DRAG");
        } else {
          setHoverText("EXPLORE");
        }
      } else {
        setIsHovered(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* High Visibility Neo-Brutalist Cursor Outer Ring */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          animate={{
            width: isHovered ? 84 : 36,
            height: isHovered ? 36 : 36,
            borderRadius: isHovered ? 12 : 50,
            scale: isClicked ? 0.8 : 1,
            backgroundColor: isHovered ? "var(--neo-pink)" : "var(--neo-yellow)",
          }}
          transition={{ type: "spring", stiffness: 450, damping: 26 }}
          style={{
            border: "3px solid #0D0D11",
            boxShadow: "3px 3px 0px #0D0D11",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8px",
            color: isHovered ? "#FFFFFF" : "#0D0D11",
            fontFamily: "var(--font-mono)",
            fontWeight: 800,
            fontSize: "0.75rem",
            letterSpacing: "0.05em",
            userSelect: "none"
          }}
        >
          {isHovered ? hoverText : <SparkIcon size={16} color="#0D0D11" strokeWidth={3} />}
        </motion.div>
      </motion.div>

      {/* Center Laser Dot */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 10000,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#0D0D11",
          boxShadow: "0 0 0 2px #FFF",
        }}
      />
    </>
  );
}
