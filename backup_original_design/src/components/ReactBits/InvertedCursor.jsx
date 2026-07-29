import { useEffect, useState, useRef } from "react";

export const InvertedCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return; // Disable on touch/mobile

    // Hide native cursor
    document.body.style.cursor = "none";

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
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
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        width: isHovered ? "40px" : "20px",
        height: isHovered ? "40px" : "20px",
        backgroundColor: "#ffffff",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 99999,
        mixBlendMode: "difference",
        translate: "-50% -50%",
        transition: "width 0.25s ease, height 0.25s ease",
      }}
    />
  );
};

export default InvertedCursor;
