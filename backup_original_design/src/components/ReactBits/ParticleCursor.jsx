import { useEffect, useState, useRef } from "react";

export const ParticleCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const particlesRef = useRef([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return; // Disable on mobile

    document.body.style.cursor = "none";

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Spawn particles
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: 2 + Math.random() * 3,
          alpha: 1,
          color: "200, 132, 58", // Amber
        });
      }
    };

    let animationFrame;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw pointer dot
      ctx.beginPath();
      ctx.arc(position.x, position.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(200, 132, 58, 1)";
      ctx.fill();

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025;
        p.size -= 0.05;

        if (p.alpha <= 0 || p.size <= 0) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();

        return true;
      });

      animationFrame = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [position.x, position.y]);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 99999,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default ParticleCursor;
