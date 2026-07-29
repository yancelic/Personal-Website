import { useEffect, useRef } from "react";

export default function LineWaves({
  lineColor = "rgba(200,132,58,0.25)",
  waveCount = 8,
  amplitude = 60,
  speed = 0.4,
  style = {},
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let t = 0;

    const notesChars = ["♩", "♪", "♫", "♬", "♭", "♯"];
    let notes = [];
    const maxNotes = 25;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Waves
      for (let i = 0; i < waveCount; i++) {
        const yBase = (canvas.height / (waveCount + 1)) * (i + 1);
        const freq = 0.003 + i * 0.0004;
        const phase = (i / waveCount) * Math.PI * 2;
        const amp = amplitude * (0.5 + 0.5 * Math.sin(i * 0.7 + t * 0.3));

        ctx.beginPath();
        ctx.moveTo(0, yBase);
        for (let x = 0; x <= canvas.width; x += 4) {
          const y = yBase + Math.sin(x * freq + t * speed + phase) * amp;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 2. Manage and Draw Music Notes
      if (notes.length < maxNotes && Math.random() < 0.03) {
        const char = notesChars[Math.floor(Math.random() * notesChars.length)];
        const waveIndex = Math.floor(Math.random() * waveCount);
        notes.push({
          x: canvas.width + 20,
          waveIndex,
          speed: 1 + Math.random() * 2,
          char,
          size: 14 + Math.floor(Math.random() * 12),
          opacity: 0.2 + Math.random() * 0.5,
        });
      }

      notes = notes.filter((note) => {
        note.x -= note.speed;
        if (note.x < -30) return false;

        const yBase = (canvas.height / (waveCount + 1)) * (note.waveIndex + 1);
        const freq = 0.003 + note.waveIndex * 0.0004;
        const phase = (note.waveIndex / waveCount) * Math.PI * 2;
        const amp = amplitude * (0.5 + 0.5 * Math.sin(note.waveIndex * 0.7 + t * 0.3));
        const noteY = yBase + Math.sin(note.x * freq + t * speed + phase) * amp;

        ctx.fillStyle = `rgba(200, 132, 58, ${note.opacity})`;
        ctx.font = `${note.size}px serif`;
        ctx.fillText(note.char, note.x, noteY - 5);
        return true;
      });
      t += 0.02;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [lineColor, waveCount, amplitude, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.6,
        ...style,
      }}
    />
  );
}
