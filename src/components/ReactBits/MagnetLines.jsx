import { useEffect, useRef } from "react";

export default function MagnetLines({
  rows = 10,
  cols = 16,
  lineColor = "rgba(200,132,58,0.18)",
  lineWidth = 1,
  magnetRadius = 120,
  style = {},
}) {
  const containerRef = useRef(null);
  const linesRef = useRef([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    const onMove = (e) => {
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      linesRef.current.forEach((el, i) => {
        if (!el) return;
        const elRect = el.getBoundingClientRect();
        const cx = elRect.left - rect.left + elRect.width / 2;
        const cy = elRect.top - rect.top + elRect.height / 2;
        const dx = mouse.current.x - cx;
        const dy = mouse.current.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const strength = Math.max(0, 1 - dist / magnetRadius);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        const rotate = strength * angle * 0.5;
        el.style.transform = `rotate(${rotate}deg)`;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [magnetRadius]);

  const items = Array.from({ length: rows * cols });

  return (
    <div
      ref={containerRef}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        ...style,
      }}
    >
      {items.map((_, i) => (
        <div
          key={i}
          ref={(el) => (linesRef.current[i] = el)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.15s ease-out",
          }}
        >
          <div
            style={{
              width: "24px",
              height: lineWidth,
              background: lineColor,
              borderRadius: "2px",
            }}
          />
        </div>
      ))}
    </div>
  );
}
