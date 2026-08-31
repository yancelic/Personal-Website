import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

// Grid configuration
const COLS = 60;
const ROWS = 23;
const CHAR_WIDTH = 9;
const CHAR_HEIGHT = 16;

// Authentic ANSI / Terminal colors
const COLORS = {
  pot: "#8a9ba8",
  potSoil: "#5c4033",
  trunkMain: "#b87333",
  trunkBranch: "#a0522d",
  trunkTwig: "#cd853f",
  // Pure Sakura ASCII Foliage Palette
  blossomLight: "#ffb6c1",
  blossomPink: "#ff69b4",
  blossomDeep: "#ff1493",
  blossomPale: "#ffe4e1",
  blossomWhite: "#fff0f5",
  leafAccent: "#a8e6cf",
};

// Pure ASCII characters used by real cbonsai (NO emojis)
const SAKURA_ASCII_CHARS = ["&", "%", "*", "~", "o", "@", "8", "+", "#", "w", "s"];

const BONSAI_STYLES = [
  "Formal Upright (Chokkan)",
  "Slanted (Shakan)",
  "Windswept (Fukinagashi)",
  "Cascading (Kengai)",
  "Double Trunk (Sokan)",
  "Broom Style (Hokidachi)",
  "Literati (Bunjingi)",
];

// Procedural Bonsai Generator that creates wildly different organic tree styles
function generateBonsaiSteps() {
  const steps = [];
  const occupied = new Set();

  function addStep(r, c, char, color, isLeaf = false) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    const key = `${r},${c}`;
    if (occupied.has(key) && isLeaf) return;
    occupied.add(key);
    steps.push({ r, c, char, color, isLeaf });
  }

  // Pick a random style for this tree
  const styleIdx = Math.floor(Math.random() * BONSAI_STYLES.length);
  const styleName = BONSAI_STYLES[styleIdx];

  // 1. Pot Base (with variable width and position)
  const potRow = ROWS - 3;
  const potCenter = Math.floor(COLS / 2) + Math.floor((Math.random() - 0.5) * 6);
  const potWidth = 16 + Math.floor(Math.random() * 6);
  const potLeft = potCenter - Math.floor(potWidth / 2);

  // Pot rim
  for (let c = potLeft; c <= potLeft + potWidth; c++) {
    let ch = "=";
    if (c === potLeft || c === potLeft + potWidth) ch = ":";
    addStep(potRow, c, ch, COLORS.pot);
  }
  // Pot soil
  for (let c = potLeft + 1; c < potLeft + potWidth; c++) {
    addStep(potRow - 1, c, "~", COLORS.potSoil);
  }
  // Pot body
  for (let c = potLeft + 1; c <= potLeft + potWidth - 1; c++) {
    let ch = "_";
    if (c === potLeft + 1) ch = "\\";
    else if (c === potLeft + potWidth - 1) ch = "/";
    addStep(potRow + 1, c, ch, COLORS.pot);
  }
  // Pot feet
  addStep(potRow + 2, potLeft + 3, "(", COLORS.pot);
  addStep(potRow + 2, potLeft + 4, ")", COLORS.pot);
  addStep(potRow + 2, potLeft + potWidth - 4, "(", COLORS.pot);
  addStep(potRow + 2, potLeft + potWidth - 3, ")", COLORS.pot);

  // 2. Procedural Trunk & Branching System
  const startR = potRow - 2;
  const startC = potCenter;
  const branchEnds = [];

  function growBranch(r, c, length, angleDir, depth, curveFactor = 0.5) {
    let currR = r;
    let currC = c;
    const branchColor = depth === 0 ? COLORS.trunkMain : depth === 1 ? COLORS.trunkBranch : COLORS.trunkTwig;

    for (let i = 0; i < length; i++) {
      // Natural organic sway based on style and randomness
      const rand = Math.random();
      if (rand < curveFactor) {
        currC += angleDir;
      } else if (rand < curveFactor + 0.25 && angleDir !== 0) {
        currC += Math.sign(angleDir);
      }

      // Vertical movement (mostly up, occasionally horizontal or drooping down for cascade)
      if (styleIdx === 3 && depth > 0 && Math.random() < 0.35) {
        // Cascade drooping
        currR += 1;
      } else {
        currR -= 1;
      }

      if (currR < 1 || currC < 2 || currC >= COLS - 2) break;

      // Select trunk character matching direction
      let char = "|";
      if (angleDir < 0) char = Math.random() > 0.4 ? "/" : "(";
      else if (angleDir > 0) char = Math.random() > 0.4 ? "\\" : ")";
      else char = Math.random() > 0.3 ? "|" : "~";

      addStep(currR, currC, char, branchColor);

      // Thicker trunk near base
      if (depth === 0 && i < 5) {
        addStep(currR, currC - 1, "(", COLORS.trunkMain);
        if (i < 2) addStep(currR, currC + 1, ")", COLORS.trunkMain);
      }

      // Sub-branching
      if (depth < 3 && i > 2 && Math.random() < 0.38) {
        const subAngle = angleDir === 0 ? (Math.random() > 0.5 ? 1 : -1) : (Math.random() > 0.4 ? -angleDir : angleDir);
        const subLength = Math.max(3, Math.floor(length * (0.5 + Math.random() * 0.35)));
        growBranch(currR, currC, subLength, subAngle, depth + 1, curveFactor);
      }
    }

    branchEnds.push({ r: currR, c: currC, depth });
  }

  // Style-Specific Trunk Architecture
  switch (styleIdx) {
    case 0: { // Formal Upright (Chokkan)
      const height = 12 + Math.floor(Math.random() * 4);
      growBranch(startR, startC, height, 0, 0, 0.25);
      const numBoughs = 3 + Math.floor(Math.random() * 3);
      for (let b = 0; b < numBoughs; b++) {
        const bHeight = startR - 3 - b * 2;
        const bDir = b % 2 === 0 ? -1 : 1;
        const bLen = 6 + Math.floor(Math.random() * 4) - b;
        growBranch(bHeight, startC, Math.max(4, bLen), bDir, 1, 0.5);
      }
      break;
    }
    case 1: { // Slanted (Shakan)
      const lean = Math.random() > 0.5 ? 1 : -1;
      const height = 10 + Math.floor(Math.random() * 5);
      growBranch(startR, startC, height, lean, 0, 0.7);
      growBranch(startR - 2, startC + lean * 2, 7 + Math.floor(Math.random() * 4), lean, 1, 0.8);
      growBranch(startR - 4, startC, 6 + Math.floor(Math.random() * 3), -lean, 1, 0.4);
      break;
    }
    case 2: { // Windswept (Fukinagashi)
      const windDir = Math.random() > 0.5 ? 1 : -1;
      const height = 9 + Math.floor(Math.random() * 4);
      growBranch(startR, startC, height, windDir, 0, 0.85);
      for (let i = 0; i < 4; i++) {
        growBranch(startR - 3 - i * 2, startC + windDir * i * 3, 7 + Math.floor(Math.random() * 4), windDir, 1, 0.9);
      }
      break;
    }
    case 3: { // Cascading (Kengai)
      const side = Math.random() > 0.5 ? 1 : -1;
      growBranch(startR, startC, 6, side, 0, 0.6);
      // Main cascade droops down the pot edge
      growBranch(startR - 4, startC + side * 4, 11 + Math.floor(Math.random() * 4), side, 1, 0.8);
      growBranch(startR - 3, startC - side, 5, -side, 1, 0.4);
      break;
    }
    case 4: { // Double Trunk (Sokan)
      const h1 = 11 + Math.floor(Math.random() * 4);
      const h2 = 8 + Math.floor(Math.random() * 3);
      growBranch(startR, startC - 1, h1, -1, 0, 0.45);
      growBranch(startR, startC + 2, h2, 1, 0, 0.55);
      break;
    }
    case 5: { // Broom Style (Hokidachi)
      growBranch(startR, startC, 5, 0, 0, 0.1);
      const forks = [-2, -1, 0, 1, 2];
      forks.forEach((dir) => {
        growBranch(startR - 5, startC + dir, 7 + Math.floor(Math.random() * 4), Math.sign(dir), 1, 0.5);
      });
      break;
    }
    default: { // Literati / Freestyle (Bunjingi)
      const height = 13 + Math.floor(Math.random() * 5);
      const zigZag = Math.random() > 0.5 ? 1 : -1;
      growBranch(startR, startC, height, zigZag, 0, 0.6);
      growBranch(startR - 8, startC + zigZag * 3, 6 + Math.floor(Math.random() * 4), -zigZag, 1, 0.5);
      growBranch(startR - 11, startC, 5 + Math.floor(Math.random() * 3), zigZag, 1, 0.4);
      break;
    }
  }

  // 3. Dense Sakura Foliage Clusters (ASCII Blossom Clouds)
  branchEnds.forEach((end) => {
    const clusterRadius = 3 + Math.floor(Math.random() * 4);
    for (let dy = -clusterRadius; dy <= clusterRadius; dy++) {
      for (let dx = -Math.floor(clusterRadius * 1.5); dx <= Math.floor(clusterRadius * 1.5); dx++) {
        const dist = Math.hypot(dx / 1.35, dy);
        if (dist <= clusterRadius) {
          const chance = 0.88 - (dist / clusterRadius) * 0.48;
          if (Math.random() < chance) {
            const br = end.r + dy;
            const bc = end.c + dx;
            const char = SAKURA_ASCII_CHARS[Math.floor(Math.random() * SAKURA_ASCII_CHARS.length)];
            const palette = [
              COLORS.blossomPink,
              COLORS.blossomLight,
              COLORS.blossomDeep,
              COLORS.blossomPale,
              COLORS.blossomWhite,
              COLORS.leafAccent,
            ];
            const color = palette[Math.floor(Math.random() * palette.length)];
            addStep(br, bc, char, color, true);
          }
        }
      }
    }
  });

  return { steps, styleName };
}

export default function CbonsaiTerminal({ lang = "en" }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isGrowing, setIsGrowing] = useState(false);
  const [treeCount, setTreeCount] = useState(1);
  const [currentStyle, setCurrentStyle] = useState("Sakura");
  const hasGrownRef = useRef(false);
  const animFrameRef = useRef(null);
  const stepsRef = useRef([]);
  const stepIdxRef = useRef(0);
  const lastTimeRef = useRef(0);

  // High performance Canvas rendering
  const drawStep = (ctx, step) => {
    const x = step.c * CHAR_WIDTH + 8;
    const y = step.r * CHAR_HEIGHT + 14;
    ctx.fillStyle = step.color;
    ctx.font = "bold 13px Consolas, 'Courier New', monospace";
    ctx.fillText(step.char, x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const startGrowth = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    clearCanvas();
    setIsGrowing(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Generate brand new unique procedural tree
    const { steps, styleName } = generateBonsaiSteps();
    setCurrentStyle(styleName);
    stepsRef.current = steps;
    stepIdxRef.current = 0;
    lastTimeRef.current = performance.now();

    const speedMs = 26; // Calm meditative speed

    const loop = (now) => {
      const elapsed = now - lastTimeRef.current;
      if (elapsed >= speedMs) {
        lastTimeRef.current = now;
        if (stepIdxRef.current < stepsRef.current.length) {
          const step = stepsRef.current[stepIdxRef.current];
          drawStep(ctx, step);
          stepIdxRef.current++;
        } else {
          setIsGrowing(false);
          return;
        }
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
  }, []);

  const instantFinish = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    clearCanvas();
    stepsRef.current.forEach((step) => drawStep(ctx, step));
    setIsGrowing(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = COLS * CHAR_WIDTH + 16;
    canvas.height = ROWS * CHAR_HEIGHT + 20;
    clearCanvas();

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasGrownRef.current) {
          hasGrownRef.current = true;
          startGrowth();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [startGrowth]);

  const handleRegrow = () => {
    hasGrownRef.current = true;
    setTreeCount((prev) => prev + 1);
    startGrowth();
  };

  return (
    <motion.div
      ref={containerRef}
      className="xp-window xp-cbonsai-window"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      {/* XP Command Prompt Title Bar */}
      <div className="xp-titlebar">
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span className="xp-titlebar-icon" style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: "bold" }}>
            &gt;_
          </span>
          <span className="xp-titlebar-text">
            Command Prompt - C:\WINDOWS\system32\cbonsai.exe -l -m "{currentStyle}"
          </span>
        </div>
        <div className="xp-window-controls">
          <div className="xp-wc-btn" title="Minimize">_</div>
          <div className="xp-wc-btn" title="Maximize">□</div>
          <div className="xp-wc-btn close-btn" title="Close">✕</div>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="xp-cbonsai-body">
        {/* CLI Header Info */}
        <div className="cbonsai-header-text">
          <div>Microsoft Windows XP [Version 5.1.2600]</div>
          <div>(C) Copyright 1985-2001 Microsoft Corp.</div>
          <div className="cbonsai-prompt">
            C:\Documents and Settings\Yanki&gt;{" "}
            <span className="cbonsai-command">cbonsai -l -s --style="{currentStyle}"</span>
          </div>
        </div>

        {/* High performance zero-overhead Canvas */}
        <div
          className="cbonsai-canvas-wrapper"
          onClick={handleRegrow}
          title="Click to grow a new unique Sakura Bonsai!"
          style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        >
          <canvas
            ref={canvasRef}
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "3px",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.8)",
            }}
          />
        </div>

        {/* Terminal Footer Controls */}
        <div className="cbonsai-footer">
          <div className="cbonsai-status">
            <span className={`cbonsai-status-indicator ${isGrowing ? "growing" : "ready"}`} />
            <span>
              {isGrowing
                ? (lang === "tr" ? `🌸 ${currentStyle} Büyüyor...` : `🌸 ${currentStyle} Growing...`)
                : (lang === "tr" ? `✨ ${currentStyle} Tamamlandı (Ağaç #${treeCount})` : `✨ ${currentStyle} Complete (Tree #${treeCount})`)}
            </span>
          </div>

          <div className="cbonsai-actions">
            <button
              className="xp-btn cbonsai-btn"
              onClick={handleRegrow}
              disabled={isGrowing}
            >
              🌱 {lang === "tr" ? "Yeniden Büyüt" : "Re-plant"}
            </button>
            {isGrowing && (
              <button
                className="xp-btn cbonsai-btn"
                onClick={instantFinish}
              >
                ⚡ {lang === "tr" ? "Hemen Bitir" : "Instant"}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
