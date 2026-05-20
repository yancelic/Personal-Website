import { useEffect, useState, useRef } from "react";

export const FigmaCursor = ({ name = "Yankı" }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [hoverText, setHoverText] = useState("");
  
  // Color presets (Amber/Cream theme)
  const cursorColor = "var(--amber)";
  const badgeBg = "rgba(200, 132, 58, 0.95)";
  const textColor = "#120F17";

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return; // Disable on touch

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const handleOver = (e) => {
      const target = e.target.closest("a, button, .focus-word, .btn-primary, .btn-outline, .zorus-pillar");
      if (target) {
        // Determine label based on target
        if (target.tagName === "A" && target.href.includes("github")) {
          setHoverText("GitHub");
        } else if (target.tagName === "A" && target.href.includes("linkedin")) {
          setHoverText("LinkedIn");
        } else if (target.tagName === "A" && target.href.includes("instagram")) {
          setHoverText("Instagram");
        } else if (target.href && target.href.includes("mailto")) {
          setHoverText("Email");
        } else if (target.closest("#zorus") || target.id === "zorus") {
          setHoverText("Zorus");
        } else {
          setHoverText("Click");
        }
      } else {
        setHoverText("");
      }
    };

    const handleOut = () => {
      setHoverText("");
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  // Smooth transition for position using inline styles or simple CSS
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        pointerEvents: "none",
        zIndex: 99999,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease, transform 0.05s linear",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {/* Figma-style Mouse Pointer SVG */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          color: cursorColor,
          filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.4))",
          transform: "translate(-2px, -2px)",
        }}
      >
        <path
          d="M1 1V14.5L4.5 11L7 16L9 15L6.5 10H11.5L1 1Z"
          fill="currentColor"
          stroke="#120F17"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Label Badge */}
      <div
        style={{
          background: badgeBg,
          color: textColor,
          fontFamily: "var(--font-sans, sans-serif)",
          fontSize: "11px",
          fontWeight: "600",
          padding: "3px 8px",
          borderRadius: "4px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)",
          whiteSpace: "nowrap",
          marginTop: "4px",
          marginLeft: "8px",
          transform: "scale(1)",
          transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transformOrigin: "top left",
        }}
      >
        {hoverText || name}
      </div>
    </div>
  );
};

export default FigmaCursor;
