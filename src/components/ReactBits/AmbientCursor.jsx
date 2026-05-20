import { useEffect, useState } from "react";

export const AmbientCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e) => {
      if (e.target.closest("a, button, .focus-word, .btn-primary, .btn-outline")) {
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
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        width: isHovered ? "200px" : "120px",
        height: isHovered ? "200px" : "120px",
        background: "radial-gradient(circle, rgba(200, 132, 58, 0.15) 0%, rgba(200, 132, 58, 0.05) 50%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        transformOrigin: "center center",
        translate: "-50% -50%",
        transition: "width 0.3s ease, height 0.3s ease, background 0.3s ease",
        mixBlendMode: "screen",
      }}
    />
  );
};

export default AmbientCursor;
