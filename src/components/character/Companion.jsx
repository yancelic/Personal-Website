import { useState, useEffect, useRef, useCallback } from "react";
import "./Companion.css";
import {
  playPetSound,
  playJumpSound,
  playGrabSound,
  playLandSound,
  playCheerSound,
  playSleepSound,
  toggleSound,
  isSoundEnabled,
} from "./audioSynth";

// Dialogue lines in EN and TR
const DIALOGUES = {
  en: {
    greetings: ["Hey there! ✨", "Nice to meet you! 💕", "Oh, hello! 😊", "Enjoying the site? 🚀", "Let me know if you need a tour! 💖"],
    cheer: ["You've got this! 🎉", "Great work today! ✨", "Keep shining! ⭐", "Wohoo!! 🎈"],
    climb: ["Climbing up! 🧗‍♀️", "Hup, hup, hup! 🌸", "Scaling this window! ✨", "Almost to the top! 🎀"],
    turn: ["Oops, path blocked! 🌸", "Turning around~ ✨", "Let's explore that way! 💖"],
    held_angry: [
      "Hey! Put me down!",
      "Woah, watch the hair!",
      "Where are you dragging me?!",
      "At least give a girl some warning!",
      "I'm not a cursor accessory!",
      "Hey, no kidnapping on the job!"
    ],
    held_chill: [
      "Free taxi service, nice.",
      "Wheee, site tour from above!",
      "Taking me to the projects section?",
      "Honestly, not a bad view from up here.",
      "First class flight mode activated."
    ],
    drop: ["Safe landing! 🌸", "Boing! Back on my feet. 🎀", "Thanks for the ride! 💖"],
    moonwalk: ["Smooth criminal mode~ 🕺💃", "Check out these moves! 🎶", "Smooth steps! ✨"],
    sleep: ["Taking five... zzz 🌙", "Nap time... 💤", "Catching some sleep... ✨"],
    wake: ["I'm up! ☀️", "Ready to hang out! 🌸", "Yaaawn~ Good morning! ✨"],
    sit: ["Taking a little breather~ ☕", "Just enjoying the vibes~ 🌸", "Cozy spot! ✨"],
    shy: ["Aww, thank you... 💕", "Hehe~ 💖", "You're sweet! ✨"],
  },
  tr: {
    greetings: ["Selam! ✨", "Tanıştığımıza sevindim! 💕", "Aa, merhaba! 😊", "Siteyi beğendin mi? 🚀", "Gezintide eşlik edebilirim! 💖"],
    cheer: ["Harika gidiyorsun! 🎉", "Bugün süper iş çıkardın! ✨", "Böyle devam! ⭐", "Vuhuu!! 🎈"],
    climb: ["Tırmanıyorum! 🧗‍♀️", "Hop, hop, hop! 🌸", "Pencereye tırmanıyorum! ✨", "Az kaldı tepeye! 🎀"],
    turn: ["Hop, yol kapalıymış! 🌸", "Geri dönüyorum~ ✨", "Şu tarafa bakalım! 💖"],
    held_angry: [
      "Hey! İndir beni aşağı!",
      "Yavaş ol, saçlarım dağıldı!",
      "Beni nereye sürüklüyorsun?!",
      "İnsan bir haber verir en azından!",
      "İmleç süsü değilim ben!",
      "Hey, kaçırmak yok öyle!"
    ],
    held_chill: [
      "Bedava taksi, fena değilmiş.",
      "Yukarıdan site turu! Vuhuu!",
      "Projeler kısmına mı götürüyorsun?",
      "Buradan manzara bayağı iyiymiş yalnız.",
      "Birinci sınıf uçuş modundayım."
    ],
    drop: ["Güvenli iniş! 🌸", "Hopp! Tekrar ayaklarımın üstündeyim. 🎀", "Yolculuk için teşekkürler! 💖"],
    moonwalk: ["Tarzıma bak~ 🕺💃", "Havalı adımlar! 🎶", "Moonwalk vakti! ✨"],
    sleep: ["Küçük bir mola... zzz 🌙", "Şekerleme vakti... 💤", "Biraz uyuyayım... ✨"],
    wake: ["Uyandım! ☀️", "Takılmaya hazırım! 🌸", "Esneme~ Günaydın! ✨"],
    sit: ["Biraz soluklanıyorum~ ☕", "Ortamın tadını çıkarıyorum~ 🌸", "Burası çok rahat! ✨"],
    shy: ["Aww, teşekkür ederim... 💕", "Hehe~ 💖", "Çok tatlısın! ✨"],
  },
};

const SPRITES = {
  stand: "/character/norm_down_2.png",
  walk_clean: [
    "/character/walk_clean_0.png",
    "/character/walk_clean_1.png",
    "/character/walk_clean_2.png",
    "/character/walk_clean_3.png",
    "/character/walk_clean_4.png",
    "/character/walk_clean_5.png",
  ],
  climb: [
    "/character/climb_clean_0.png",
    "/character/climb_clean_1.png",
    "/character/climb_clean_2.png",
    "/character/climb_clean_3.png",
    "/character/climb_clean_4.png",
  ],
  toddler_horiz_angry: [
    "/character/toddler_horiz_0.png",
    "/character/toddler_horiz_1.png",
  ],
  toddler_horiz_chill: "/character/toddler_horiz_chill.png",
  sit: "/character/sit.png",
  cheer: "/character/cheer.png",
  sleep: "/character/sleep.png",
  shy: "/character/shy.png",
  run: "/character/run.png",
};

// UI Selectors for all XP windows, cards, panels, buttons, ticker bars, badges
const SURFACE_SELECTORS = [
  ".xp-window",
  ".xp-titlebar",
  ".xp-groupbox",
  ".xp-ticker-wrap",
  ".xp-btn",
  ".xp-badge",
  ".xp-tab",
  ".xp-sticker",
  ".xp-card",
  ".xp-bento-item",
  ".xp-about-card",
  ".xp-expertise-card",
  ".xp-zorus-card",
  ".xp-beyond-card",
  ".xp-contact-card",
  ".xp-navbar",
  ".dock-wrap",
  "button",
  "[data-companion-surface]"
].join(", ");

export default function Companion({ lang = "en" }) {
  const getFloorY = () => (typeof window !== "undefined" ? window.innerHeight - 90 : 600);
  const getInitialX = () => (typeof window !== "undefined" ? window.innerWidth - 140 : 800);

  const [pos, setPos] = useState({ x: getInitialX(), y: getFloorY() });
  // state: 'sit' | 'idle' | 'walk' | 'moonwalk' | 'held_angry' | 'held_chill' | 'sleep' | 'cheer' | 'shy' | 'falling' | 'climbing'
  const [state, setState] = useState("sit");
  const [facing, setFacing] = useState(1); // 1 = Left for walk, -1 = Right for walk
  const [frameIdx, setFrameIdx] = useState(0);
  const [climbFrameIdx, setClimbFrameIdx] = useState(0);
  const [wranglerFrame, setWranglerFrame] = useState(0);
  const [speech, setSpeech] = useState(null);
  const [particles, setParticles] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [isLandedAnim, setIsLandedAnim] = useState(false);
  const [physicsTilt, setPhysicsTilt] = useState(0);
  const [currentSurfaceY, setCurrentSurfaceY] = useState(getFloorY());

  // Refs for physics, surfaces & timers
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, charX: 0, charY: 0, time: 0, hasMoved: false });
  const velocityRef = useRef({ vx: 0, vy: 0, lastX: 0, lastY: 0, lastTime: 0 });
  const tiltAngleRef = useRef(0);
  const tiltVelRef = useRef(0);
  const walkRef = useRef(null);
  const speechTimeoutRef = useRef(null);
  const aiTimerRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const containerRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const wranglerKickTimerRef = useRef(0);
  const surfacesCacheRef = useRef({ list: [], lastUpdate: 0 });
  const isClimbingRef = useRef(false);
  const standingElementRef = useRef(null);
  const fallStartYRef = useRef(0);
  const wasWalkingBeforeFallRef = useRef(null);

  // Preload all sprites into browser memory
  useEffect(() => {
    const allImgs = [
      SPRITES.stand,
      ...SPRITES.walk_clean,
      ...SPRITES.climb,
      ...SPRITES.toddler_horiz_angry,
      SPRITES.toddler_horiz_chill,
      SPRITES.sit,
      SPRITES.cheer,
      SPRITES.sleep,
      SPRITES.shy,
      SPRITES.run,
      "/character/heart_large.png",
      "/character/heart_small.png",
      "/character/sparkle_large.png",
    ];
    allImgs.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Show a dialogue speech bubble
  const showBubble = useCallback((text, duration = 3000) => {
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    setSpeech(text);
    speechTimeoutRef.current = setTimeout(() => {
      setSpeech(null);
    }, duration);
  }, []);

  // Spawn visual floating particle
  const spawnParticles = useCallback((type = "heart", count = 3) => {
    const newItems = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const dist = 25 + Math.random() * 30;
      newItems.push({
        id: Date.now() + "_" + Math.random() + "_" + i,
        dx: Math.cos(angle) * dist,
        dy: -Math.abs(Math.sin(angle) * dist) - 15,
        type: type === "heart" ? (Math.random() > 0.5 ? "/character/heart_large.png" : "/character/heart_small.png") : "/character/sparkle_large.png",
      });
    }
    setParticles((prev) => [...prev, ...newItems]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newItems.some((n) => n.id === p.id)));
    }, 1200);
  }, []);

  // Scan all visible surfaces from DOM
  const getCachedSurfaces = useCallback(() => {
    const now = performance.now();
    if (now - surfacesCacheRef.current.lastUpdate < 100 && surfacesCacheRef.current.list.length > 0) {
      return surfacesCacheRef.current.list;
    }
    const elements = document.querySelectorAll(SURFACE_SELECTORS);
    const surfaces = [];
    const vh = window.innerHeight;

    elements.forEach((el) => {
      if (el.closest(".companion-container") || el.closest(".companion-floor-shadow")) return;

      const rect = el.getBoundingClientRect();
      if (rect.width >= 35 && rect.height >= 18 && rect.top > 20 && rect.top < vh - 20 && rect.bottom > 0) {
        surfaces.push({
          el,
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height,
          standY: rect.top - 76,
        });
      }
    });

    surfacesCacheRef.current = { list: surfaces, lastUpdate: now };
    return surfaces;
  }, []);

  // Find the solid surface directly beneath a given (x, currentY)
  const getGroundYAt = useCallback((x, currentY) => {
    const floor = getFloorY();
    const surfaces = getCachedSurfaces();
    const charCenterX = x + 38;

    let bestGround = floor;
    let bestEl = null;
    let minDiff = Infinity;

    surfaces.forEach((surf) => {
      if (charCenterX >= surf.left - 8 && charCenterX <= surf.right + 8) {
        if (surf.standY >= currentY - 14 && surf.standY < floor) {
          const diff = surf.standY - currentY;
          if (diff < minDiff && diff >= -14) {
            minDiff = diff;
            bestGround = surf.standY;
            bestEl = surf.el;
          }
        }
      }
    });

    return { groundY: bestGround, element: bestEl };
  }, [getCachedSurfaces]);

  // Handle Window Resize
  useEffect(() => {
    const handleResize = () => {
      setPos((prev) => {
        const floor = getFloorY();
        const maxX = window.innerWidth - 90;
        const newX = Math.min(Math.max(20, prev.x), maxX);
        const newY = Math.min(prev.y, floor);
        return { x: newX, y: newY };
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll Gravity & Surface Tracking
  useEffect(() => {
    const handleScroll = () => {
      if (isDraggingRef.current || isClimbingRef.current) return;

      surfacesCacheRef.current.lastUpdate = 0;

      if (standingElementRef.current) {
        const rect = standingElementRef.current.getBoundingClientRect();
        if (rect.top > 25 && rect.top < window.innerHeight - 30) {
          const newY = rect.top - 76;
          setPos((prev) => ({ x: prev.x, y: newY }));
          setCurrentSurfaceY(newY);
          return;
        } else {
          standingElementRef.current = null;
          walkRef.current = null;
          fallStartYRef.current = pos.y;
          velocityRef.current.vy = 1.2;
          setState("falling");
          return;
        }
      }

      const { groundY, element } = getGroundYAt(pos.x, pos.y);
      setCurrentSurfaceY(groundY);

      if (pos.y < groundY - 16 && state !== "falling" && state !== "held_angry" && state !== "held_chill") {
        standingElementRef.current = null;
        walkRef.current = null;
        fallStartYRef.current = pos.y;
        velocityRef.current.vy = 1.2;
        setState("falling");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pos.x, pos.y, state, getGroundYAt]);

  // Inactivity Sleep Trigger
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (!isDraggingRef.current && state !== "sleep") {
        setState("sleep");
        const sleepLines = DIALOGUES[lang].sleep;
        showBubble(sleepLines[Math.floor(Math.random() * sleepLines.length)], 3000);
        playSleepSound();
      }
    }, 35000);
  }, [lang, showBubble, state]);

  useEffect(() => {
    const onActivity = () => resetInactivityTimer();
    window.addEventListener("mousemove", onActivity, { passive: true });
    window.addEventListener("keydown", onActivity, { passive: true });
    window.addEventListener("touchstart", onActivity, { passive: true });
    resetInactivityTimer();

    return () => {
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("touchstart", onActivity);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer]);

  // Start walking to target
  const startWalk = useCallback((targetX, isMoonwalk = false) => {
    const distance = targetX - pos.x;
    if (Math.abs(distance) < 20) return;

    if (isMoonwalk) {
      setFacing(distance > 0 ? 1 : -1);
      setState("moonwalk");
      walkRef.current = {
        targetX,
        speed: distance > 0 ? 68 : -68,
        isMoonwalk: true,
      };
      const moonLines = DIALOGUES[lang].moonwalk;
      showBubble(moonLines[Math.floor(Math.random() * moonLines.length)], 2500);
    } else {
      setFacing(distance > 0 ? -1 : 1);
      setState("walk");
      walkRef.current = {
        targetX,
        speed: distance > 0 ? 80 : -80,
        isMoonwalk: false,
      };
    }
  }, [pos.x, lang, showBubble]);

  // Perform genuine wall climbing up an obstacle
  const performClimb = useCallback((surf, stepUpHeight, walkDirection) => {
    isClimbingRef.current = true;
    walkRef.current = null;
    setState("climbing");
    playJumpSound();
    spawnParticles("sparkle", 4);

    const climbLines = DIALOGUES[lang].climb;
    showBubble(climbLines[Math.floor(Math.random() * climbLines.length)], 2500);

    const startY = pos.y;
    const targetY = surf.standY;
    const wallX = walkDirection > 0 ? surf.left - 24 : surf.right - 44;
    const finalOnTopX = walkDirection > 0 ? surf.left + 22 : surf.right - 80;

    // Align character precisely at the wall edge
    setPos({ x: wallX, y: startY });

    const climbSpeedPxPerSec = 110; // steady climbing speed
    const duration = Math.max(600, (stepUpHeight / climbSpeedPxPerSec) * 1000);
    const climbStartTime = performance.now();

    let lastStepTime = climbStartTime;
    let stepCount = 0;

    const climbInterval = setInterval(() => {
      const now = performance.now();
      const progress = Math.min(1, (now - climbStartTime) / duration);

      // Cycle climbing frames every 110ms
      if (now - lastStepTime > 110) {
        setClimbFrameIdx((prev) => (prev + 1) % 5);
        lastStepTime = now;
        stepCount++;
        if (stepCount % 3 === 0) {
          spawnParticles("sparkle", 1);
        }
      }

      // Move steadily upward along the vertical wall
      const currentY = startY - stepUpHeight * progress;

      // Vault forward at the very top (last 15% of climb)
      let currentX = wallX;
      if (progress > 0.85) {
        const vaultProgress = (progress - 0.85) / 0.15;
        currentX = wallX + (finalOnTopX - wallX) * vaultProgress;
      }

      setPos({ x: currentX, y: currentY });

      if (progress >= 1) {
        clearInterval(climbInterval);
        isClimbingRef.current = false;
        setPos({ x: finalOnTopX, y: targetY });
        setCurrentSurfaceY(targetY);
        standingElementRef.current = surf.el;

        // Triumphant vault landing on top of card!
        playLandSound();
        setIsLandedAnim(true);
        setTimeout(() => setIsLandedAnim(false), 200);

        // Immediately keep walking forward across the newly climbed surface!
        const newTargetX = walkDirection > 0
          ? Math.min(window.innerWidth - 120, surf.right - 20)
          : Math.max(40, surf.left + 10);
        
        setTimeout(() => {
          startWalk(newTargetX, false);
        }, 150);
      }
    }, 16);
  }, [pos.y, lang, showBubble, spawnParticles, startWalk]);

  // Main 60fps RequestAnimationFrame physics, locomotion, collision & climbing loop
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const dt = Math.min(0.05, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      const isHeld = state === "held_angry" || state === "held_chill";

      // 1. Natural Inertia Tilt Physics when Held
      if (isHeld) {
        const targetTilt = Math.max(-25, Math.min(25, -velocityRef.current.vx * 1.1));
        const springForce = (targetTilt - tiltAngleRef.current) * 18.0;
        const dampingForce = -tiltVelRef.current * 7.5;
        const accel = springForce + dampingForce;

        tiltVelRef.current += accel * dt;
        tiltAngleRef.current += tiltVelRef.current * dt;

        let squirmWiggle = 0;
        if (state === "held_angry") {
          squirmWiggle = Math.sin(currentTime * 0.035) * 6.0;
          if (currentTime - wranglerKickTimerRef.current > 85) {
            setWranglerFrame((prev) => (prev === 0 ? 1 : 0));
            wranglerKickTimerRef.current = currentTime;
          }
        } else {
          squirmWiggle = Math.sin(currentTime * 0.003) * 3.0;
        }

        setPhysicsTilt(tiltAngleRef.current + squirmWiggle);
      } else {
        tiltAngleRef.current = 0;
        tiltVelRef.current = 0;
      }

      // 2. Continuous Grounding Check & Platform Riding
      if (!isDraggingRef.current && !isClimbingRef.current && state !== "falling" && !isHeld) {
        if (standingElementRef.current) {
          const rect = standingElementRef.current.getBoundingClientRect();
          const charCenterX = pos.x + 38;
          if (rect.top > 25 && rect.top < window.innerHeight - 30 && charCenterX >= rect.left - 12 && charCenterX <= rect.right + 12) {
            const newY = rect.top - 76;
            if (Math.abs(pos.y - newY) > 2) {
              setPos((prev) => ({ x: prev.x, y: newY }));
              setCurrentSurfaceY(newY);
            }
          } else {
            standingElementRef.current = null;
            fallStartYRef.current = pos.y;
            wasWalkingBeforeFallRef.current = walkRef.current;
            walkRef.current = null;
            velocityRef.current.vy = 1.0;
            setState("falling");
          }
        } else {
          const { groundY, element } = getGroundYAt(pos.x, pos.y);
          setCurrentSurfaceY(groundY);
          if (pos.y < groundY - 16) {
            fallStartYRef.current = pos.y;
            wasWalkingBeforeFallRef.current = walkRef.current;
            walkRef.current = null;
            velocityRef.current.vy = 1.0;
            setState("falling");
          } else {
            standingElementRef.current = element;
          }
        }
      }

      // 3. Walking, Climbing & Obstacle Avoidance
      if ((state === "walk" || state === "moonwalk") && walkRef.current && !isClimbingRef.current) {
        const walk = walkRef.current;
        const distanceRemaining = walk.targetX - pos.x;

        if (currentTime - lastFrameTimeRef.current > (state === "moonwalk" ? 120 : 105)) {
          setFrameIdx((prev) => (prev + 1) % 6);
          lastFrameTimeRef.current = currentTime;
          if (state === "moonwalk" && Math.random() > 0.65) {
            spawnParticles("sparkle", 1);
          }
        }

        // Check for obstacle collision ahead
        const surfaces = getCachedSurfaces();
        let obstacleFound = null;

        surfaces.forEach((surf) => {
          // Is this surface in front of her and higher than her current feet?
          if (pos.y > surf.standY + 12) {
            const isHittingWall = walk.speed > 0
              ? (pos.x + 48 >= surf.left - 6 && pos.x + 15 <= surf.left + 18)
              : (pos.x + 24 <= surf.right + 6 && pos.x + 55 >= surf.right - 18);

            if (isHittingWall) {
              const stepUpHeight = pos.y - surf.standY;
              if (stepUpHeight > 8) {
                obstacleFound = { surf, stepUpHeight };
              }
            }
          }
        });

        if (obstacleFound) {
          // 100% Climb the obstacle!
          performClimb(obstacleFound.surf, obstacleFound.stepUpHeight, walk.speed);
          return;
        }

        // Check if destination reached
        if (Math.abs(distanceRemaining) < 3) {
          walkRef.current = null;
          const { groundY, element } = getGroundYAt(pos.x, pos.y);
          setPos({ x: walk.targetX, y: groundY });
          setCurrentSurfaceY(groundY);
          standingElementRef.current = element;
          setState("sit");
        } else {
          const moveStep = walk.speed * dt;
          setPos((prev) => {
            const nextX = prev.x + moveStep;
            const { groundY: currentGround, element } = getGroundYAt(nextX, prev.y);
            setCurrentSurfaceY(currentGround);

            // Stepped off a ledge into empty space
            if (currentGround > prev.y + 20) {
              fallStartYRef.current = prev.y;
              wasWalkingBeforeFallRef.current = { speed: walk.speed, targetX: walk.targetX };
              walkRef.current = null;
              standingElementRef.current = null;
              velocityRef.current.vy = 1.0;
              setState("falling");
              return { x: nextX, y: prev.y };
            }

            standingElementRef.current = element;

            if ((walk.speed > 0 && nextX >= walk.targetX) || (walk.speed < 0 && nextX <= walk.targetX)) {
              walkRef.current = null;
              setState("sit");
              return { x: walk.targetX, y: currentGround };
            }
            return { x: nextX, y: currentGround };
          });
        }
      }

      // 4. Mid-air Gravity, Ledge Falling & Smooth Landing Physics
      if (!isDraggingRef.current && state === "falling" && !isClimbingRef.current) {
        setPos((prev) => {
          const { groundY, element } = getGroundYAt(prev.x, prev.y);
          setCurrentSurfaceY(groundY);

          let nextVy = velocityRef.current.vy + 0.95;
          let nextY = prev.y + nextVy;
          let nextX = prev.x + velocityRef.current.vx;

          const minX = 20;
          const maxX = window.innerWidth - 90;
          if (nextX < minX) {
            nextX = minX;
            velocityRef.current.vx = -velocityRef.current.vx * 0.4;
          } else if (nextX > maxX) {
            nextX = maxX;
            velocityRef.current.vx = -velocityRef.current.vx * 0.4;
          } else {
            velocityRef.current.vx *= 0.95;
          }

          if (nextY >= groundY) {
            nextY = groundY;
            standingElementRef.current = element;

            const totalDrop = groundY - (fallStartYRef.current || prev.y);
            const wasWalking = wasWalkingBeforeFallRef.current;
            wasWalkingBeforeFallRef.current = null;
            fallStartYRef.current = 0;

            playLandSound();
            setIsLandedAnim(true);
            setTimeout(() => setIsLandedAnim(false), 200);

            const dropLines = DIALOGUES[lang].drop;
            showBubble(dropLines[Math.floor(Math.random() * dropLines.length)], 1800);

            // 85% chance: Immediately get back on feet and resume walking!
            // 15% chance: Brief 1-second sit breather
            if (Math.random() < 0.85) {
              setState("idle");
              setTimeout(() => {
                const nextTargetX = wasWalking?.targetX || (prev.x + (Math.random() > 0.5 ? 160 : -160));
                const clampedTarget = Math.max(40, Math.min(window.innerWidth - 120, nextTargetX));
                startWalk(clampedTarget, false);
              }, 200);
            } else {
              setState("sit");
              // Wake back up after brief 1 second breather
              setTimeout(() => {
                const nextTargetX = prev.x + (Math.random() > 0.5 ? 160 : -160);
                const clampedTarget = Math.max(40, Math.min(window.innerWidth - 120, nextTargetX));
                startWalk(clampedTarget, false);
              }, 1100);
            }
            velocityRef.current.vy = 0;
            velocityRef.current.vx = 0;
          } else {
            velocityRef.current.vy = nextVy;
          }

          return { x: nextX, y: nextY };
        });
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [state, pos.x, pos.y, lang, showBubble, spawnParticles, getCachedSurfaces, getGroundYAt, startWalk, performClimb]);

  // Autonomous AI (Active & Lively exploration)
  const petTimeoutRef = useRef(null);

  useEffect(() => {
    if (
      state === "sleep" ||
      state === "held_angry" ||
      state === "held_chill" ||
      state === "falling" ||
      state === "cheer" ||
      state === "shy" ||
      isClimbingRef.current ||
      minimized
    ) return;

    const runAI = () => {
      if (walkRef.current !== null || isClimbingRef.current) return;

      const roll = Math.random();
      if (roll < 0.55) {
        // Walk across surfaces
        const minX = 40;
        const maxX = window.innerWidth - 120;
        const targetX = Math.floor(minX + Math.random() * (maxX - minX));
        startWalk(targetX, false);
      } else if (roll < 0.70) {
        // Moonwalk
        const minX = 40;
        const maxX = window.innerWidth - 120;
        const targetX = Math.floor(minX + Math.random() * (maxX - minX));
        startWalk(targetX, true);
      } else if (roll < 0.88) {
        // Cozy sit
        setState("sit");
      } else {
        // Shy blush
        setState("shy");
        spawnParticles("heart", 2);
      }

      aiTimerRef.current = setTimeout(runAI, 2500 + Math.random() * 3000);
    };

    aiTimerRef.current = setTimeout(runAI, 2200 + Math.random() * 2000);
    return () => {
      if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    };
  }, [state, minimized, startWalk, spawnParticles]);

  // Click reaction
  const handleClick = (e) => {
    if (dragStartRef.current.hasMoved || isActuallyGrabbedRef.current) {
      dragStartRef.current.hasMoved = false;
      return;
    }
    e.stopPropagation();

    if (petTimeoutRef.current) clearTimeout(petTimeoutRef.current);
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);

    if (state === "sleep") {
      setState("idle");
      playJumpSound();
      spawnParticles("sparkle", 4);
      const wakeLines = DIALOGUES[lang].wake;
      showBubble(wakeLines[Math.floor(Math.random() * wakeLines.length)]);
      setTimeout(() => {
        const nextX = pos.x + (Math.random() > 0.5 ? 160 : -160);
        const clamped = Math.max(40, Math.min(window.innerWidth - 120, nextX));
        startWalk(clamped, false);
      }, 500);
      return;
    }

    const petRoll = Math.random();
    if (petRoll < 0.5) {
      setState("cheer");
      playCheerSound();
      spawnParticles("heart", 4);
      setTimeout(() => spawnParticles("sparkle", 3), 500);
      const cheerLines = DIALOGUES[lang].cheer;
      showBubble(cheerLines[Math.floor(Math.random() * cheerLines.length)], 3200);
      
      petTimeoutRef.current = setTimeout(() => {
        setState("idle");
        setTimeout(() => {
          const nextX = pos.x + (Math.random() > 0.5 ? 160 : -160);
          const clamped = Math.max(40, Math.min(window.innerWidth - 120, nextX));
          startWalk(clamped, false);
        }, 300);
      }, 3200);
    } else {
      setState("shy");
      playPetSound();
      spawnParticles("heart", 3);
      setTimeout(() => spawnParticles("heart", 2), 600);
      const shyLines = DIALOGUES[lang].shy;
      showBubble(shyLines[Math.floor(Math.random() * shyLines.length)], 3200);

      petTimeoutRef.current = setTimeout(() => {
        setState("idle");
        setTimeout(() => {
          const nextX = pos.x + (Math.random() > 0.5 ? 160 : -160);
          const clamped = Math.max(40, Math.min(window.innerWidth - 120, nextX));
          startWalk(clamped, false);
        }, 300);
      }, 3200);
    }
  };

  // Double click reaction
  const handleDoubleClick = (e) => {
    e.stopPropagation();
    if (petTimeoutRef.current) clearTimeout(petTimeoutRef.current);
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    setState("cheer");
    playCheerSound();
    spawnParticles("heart", 6);
    spawnParticles("sparkle", 4);
    showBubble(lang === "en" ? "Double click! You're amazing!! 🎉✨" : "Çift tık! Harikasın sen!! 🎉✨");
    petTimeoutRef.current = setTimeout(() => {
      setState("idle");
      setTimeout(() => {
        const nextX = pos.x + (Math.random() > 0.5 ? 160 : -160);
        const clamped = Math.max(40, Math.min(window.innerWidth - 120, nextX));
        startWalk(clamped, false);
      }, 300);
    }, 2400);
  };

  // Drag & Drop: Pick up horizontal toddler only after actual pointer movement
  const isActuallyGrabbedRef = useRef(false);

  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.button !== undefined) return;

    isDraggingRef.current = true;
    isActuallyGrabbedRef.current = false;
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      charX: pos.x,
      charY: pos.y,
      time: performance.now(),
      hasMoved: false,
    };
    velocityRef.current = { vx: 0, vy: 0, lastX: e.clientX, lastY: e.clientY, lastTime: performance.now() };

    if (e.target.setPointerCapture && e.pointerId) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const dx = e.clientX - dragStartRef.current.mouseX;
    const dy = e.clientY - dragStartRef.current.mouseY;
    const dist = Math.hypot(dx, dy);

    // Only engage grab/pickup state when user actually drags beyond 6px threshold
    if (dist > 6) {
      dragStartRef.current.hasMoved = true;

      if (!isActuallyGrabbedRef.current) {
        isActuallyGrabbedRef.current = true;
        standingElementRef.current = null;
        walkRef.current = null;

        // Pick random reaction: Annoyed vs Chill Carry
        const isAngry = Math.random() < 0.55;
        const nextState = isAngry ? "held_angry" : "held_chill";
        setState(nextState);
        playGrabSound();

        if (isAngry) {
          const angryLines = DIALOGUES[lang].held_angry;
          showBubble(angryLines[Math.floor(Math.random() * angryLines.length)], 2800);
        } else {
          const chillLines = DIALOGUES[lang].held_chill;
          showBubble(chillLines[Math.floor(Math.random() * chillLines.length)], 2800);
        }
      }
    }

    if (!isActuallyGrabbedRef.current) return;

    const now = performance.now();
    const dt = Math.max(1, now - velocityRef.current.lastTime);
    const vx = ((e.clientX - velocityRef.current.lastX) / dt) * 16;
    const vy = ((e.clientY - velocityRef.current.lastY) / dt) * 16;

    velocityRef.current.vx = vx;
    velocityRef.current.vy = vy;
    velocityRef.current.lastX = e.clientX;
    velocityRef.current.lastY = e.clientY;
    velocityRef.current.lastTime = now;

    // Orient facing towards motion
    if (vx > 2.5) setFacing(1);
    else if (vx < -2.5) setFacing(-1);

    const newX = dragStartRef.current.charX + dx;
    const newY = dragStartRef.current.charY + dy;

    const clampedX = Math.min(Math.max(10, newX), window.innerWidth - 80);
    const clampedY = Math.min(Math.max(10, newY), getFloorY() + 10);

    setPos({ x: clampedX, y: clampedY });
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (e.target.releasePointerCapture && e.pointerId) {
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch (err) {}
    }

    if (!isActuallyGrabbedRef.current) {
      // It was just a click, pointer was released without dragging
      return;
    }

    isActuallyGrabbedRef.current = false;

    const { groundY, element } = getGroundYAt(pos.x, pos.y);
    setCurrentSurfaceY(groundY);

    if (pos.y < groundY - 16) {
      standingElementRef.current = null;
      fallStartYRef.current = pos.y;
      setState("falling");
    } else {
      standingElementRef.current = element;
      setPos((prev) => ({ x: prev.x, y: groundY }));
      setState("idle");
      playLandSound();
      setIsLandedAnim(true);
      setTimeout(() => setIsLandedAnim(false), 200);
      const dropLines = DIALOGUES[lang].drop;
      showBubble(dropLines[Math.floor(Math.random() * dropLines.length)], 1800);
      setTimeout(() => {
        const nextTargetX = pos.x + (Math.random() > 0.5 ? 150 : -150);
        const clamped = Math.max(40, Math.min(window.innerWidth - 120, nextTargetX));
        startWalk(clamped, false);
      }, 300);
    }
  };

  // Right-click menu
  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuOpen((prev) => !prev);
  };

  // Active sprite selector
  const getCurrentSprite = () => {
    switch (state) {
      case "walk":
      case "moonwalk":
        return SPRITES.walk_clean[frameIdx] || SPRITES.walk_clean[0];
      case "climbing":
        return SPRITES.climb[climbFrameIdx] || SPRITES.climb[0];
      case "sit":
        return SPRITES.sit;
      case "held_angry":
        return SPRITES.toddler_horiz_angry[wranglerFrame] || SPRITES.toddler_horiz_angry[0];
      case "held_chill":
        return SPRITES.toddler_horiz_chill;
      case "cheer":
        return SPRITES.cheer;
      case "sleep":
        return SPRITES.sleep;
      case "shy":
        return SPRITES.shy;
      case "falling":
        return SPRITES.stand;
      case "idle":
      default:
        return SPRITES.stand;
    }
  };

  // Quick Action Menu handlers
  const handleAction = (action) => {
    setMenuOpen(false);
    switch (action) {
      case "greet": {
        const greetLines = DIALOGUES[lang].greetings;
        showBubble(greetLines[Math.floor(Math.random() * greetLines.length)]);
        playPetSound();
        spawnParticles("heart", 3);
        setState("shy");
        setTimeout(() => setState("sit"), 1800);
        break;
      }
      case "walk": {
        const targetX = pos.x > window.innerWidth / 2 ? 80 : window.innerWidth - 120;
        startWalk(targetX, false);
        break;
      }
      case "moonwalk": {
        const targetX = pos.x > window.innerWidth / 2 ? 80 : window.innerWidth - 120;
        startWalk(targetX, true);
        break;
      }
      case "sit":
        setState("sit");
        showBubble(lang === "en" ? "Chilling comfortably~ ☕" : "Burada dinleniyorum~ ☕");
        break;
      case "cheer":
        setState("cheer");
        playCheerSound();
        spawnParticles("heart", 5);
        showBubble(lang === "en" ? "Let's gooo! You rock! 🌟" : "Harikasın! Devam et! 🌟");
        setTimeout(() => setState("sit"), 2000);
        break;
      case "sleep":
        if (state === "sleep") {
          setState("sit");
          playJumpSound();
          showBubble(lang === "en" ? "I'm awake! ✨" : "Uyandım! ✨");
        } else {
          setState("sleep");
          playSleepSound();
          showBubble(lang === "en" ? "Good night~ zzz 🌙" : "İyi geceler~ zzz 🌙");
        }
        break;
      case "sound": {
        const next = toggleSound();
        setSoundActive(next);
        showBubble(next ? (lang === "en" ? "Sound ON 🔊" : "Ses AÇIK 🔊") : (lang === "en" ? "Sound OFF 🔇" : "Ses KAPALI 🔇"), 1500);
        break;
      }
      case "hide":
        setMinimized(true);
        break;
      default:
        break;
    }
  };

  if (minimized) {
    return (
      <button
        className="companion-summon-btn"
        onClick={() => {
          setMinimized(false);
          setState("sit");
          playJumpSound();
          spawnParticles("sparkle", 4);
        }}
        title={lang === "en" ? "Summon Companion" : "Karakteri Çağır"}
      >
        <span>🌸</span>
        <span>{lang === "en" ? "Companion" : "Karakter"}</span>
      </button>
    );
  }

  const spriteSrc = getCurrentSprite();
  const activeGroundY = currentSurfaceY;
  const heightAboveGround = Math.max(0, activeGroundY - pos.y);
  const shadowScale = Math.max(0.2, 1 - heightAboveGround / 400);
  const shadowOpacity = Math.max(0.1, 0.45 - heightAboveGround / 600);
  const isHeld = state === "held_angry" || state === "held_chill";

  return (
    <>
      {/* 3D Dynamic Surface Floor Shadow that attaches to current surface/card/window */}
      <div
        className="companion-floor-shadow"
        style={{
          left: `${pos.x + 38}px`,
          top: `${activeGroundY + 74}px`,
          width: `${46 * shadowScale}px`,
          opacity: shadowOpacity,
        }}
      />

      <div
        ref={containerRef}
        className={`companion-container ${isDraggingRef.current ? "is-dragging" : ""} ${state === "sleep" ? "is-sleeping" : ""}`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
        role="region"
        aria-label="Interactive Companion Mascot"
      >
        {/* Speech Bubble */}
        {speech && (
          <div className="companion-bubble">
            <span>{speech}</span>
          </div>
        )}

        {/* Emote Badges when Held */}
        {state === "held_angry" && <div className="companion-held-badge">💢</div>}

        {/* Floating Particles */}
        {particles.map((p) => (
          <img
            key={p.id}
            src={p.type}
            alt="particle"
            className="companion-particle"
            style={{
              "--p-dx": `${p.dx}px`,
              "--p-dy": `${p.dy}px`,
              left: "50%",
              top: "40%",
              width: "16px",
              height: "16px",
            }}
          />
        ))}

        {/* Sleep Zzz */}
        {state === "sleep" && <div className="companion-sleep-z">Z z z</div>}

        {/* Quick Actions Context Menu */}
        {menuOpen && (
          <div className="companion-menu-wrap" onClick={(e) => e.stopPropagation()}>
            <button className="companion-menu-btn" onClick={() => handleAction("greet")}>
              <span className="icon">💬</span>
              <span>{lang === "en" ? "Say Hi" : "Selam Ver"}</span>
            </button>
            <button className="companion-menu-btn" onClick={() => handleAction("walk")}>
              <span className="icon">🚶</span>
              <span>{lang === "en" ? "Walk Around" : "Yürü"}</span>
            </button>
            <button className="companion-menu-btn" onClick={() => handleAction("moonwalk")}>
              <span className="icon">🕺</span>
              <span>{lang === "en" ? "Moonwalk!" : "Moonwalk Yap!"}</span>
            </button>
            <button className="companion-menu-btn" onClick={() => handleAction("sit")}>
              <span className="icon">☕</span>
              <span>{lang === "en" ? "Sit & Chill" : "Otur & Dinlen"}</span>
            </button>
            <button className="companion-menu-btn" onClick={() => handleAction("cheer")}>
              <span className="icon">✨</span>
              <span>{lang === "en" ? "Cheer Up" : "Neşelendir"}</span>
            </button>
            <button className="companion-menu-btn" onClick={() => handleAction("sleep")}>
              <span className="icon">{state === "sleep" ? "☀️" : "💤"}</span>
              <span>{state === "sleep" ? (lang === "en" ? "Wake Up" : "Uyandır") : (lang === "en" ? "Take a Nap" : "Şekerleme Yap")}</span>
            </button>
            <button className="companion-menu-btn" onClick={() => handleAction("sound")}>
              <span className="icon">{soundActive ? "🔊" : "🔇"}</span>
              <span>{soundActive ? (lang === "en" ? "Mute SFX" : "Sesi Kapat") : (lang === "en" ? "Unmute SFX" : "Sesi Aç")}</span>
            </button>
            <button className="companion-menu-btn" onClick={() => handleAction("hide")}>
              <span className="icon">👋</span>
              <span>{lang === "en" ? "Hide Mascot" : "Gizle"}</span>
            </button>
          </div>
        )}

        {/* Character Sprite with Clean Horizontal Carry and Real Inertia Physics */}
        <div
          className={`companion-sprite-wrap companion-${state} ${isLandedAnim ? "companion-landed" : ""}`}
          style={{
            transform: isHeld
              ? `scaleX(${facing}) rotate(${physicsTilt * facing}deg)`
              : `scaleX(${facing})`,
          }}
        >
          <img
            src={spriteSrc}
            alt="Companion Mascot"
            className="companion-sprite"
            style={{
              height: isHeld ? "80px" : state === "sleep" || state === "sit" ? "68px" : "80px",
              width: "auto",
            }}
            draggable={false}
          />
        </div>
      </div>
    </>
  );
}
