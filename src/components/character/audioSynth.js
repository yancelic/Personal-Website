// Web Audio API 8-bit sound synthesizer for Companion Mascot

let audioCtx = null;
let soundEnabled = true;

function getAudioContext() {
  if (!audioCtx && typeof window !== "undefined") {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundEnabled(enabled) {
  soundEnabled = enabled;
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function toggleSound() {
  soundEnabled = !soundEnabled;
  return soundEnabled;
}

// Quick helper to play custom frequencies
function playTone(freq, type = "sine", duration = 0.1, startTimeOffset = 0, gainLevel = 0.1) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + startTimeOffset);

    gain.gain.setValueAtTime(gainLevel, ctx.currentTime + startTimeOffset);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startTimeOffset + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + startTimeOffset);
    osc.stop(ctx.currentTime + startTimeOffset + duration);
  } catch (e) {
    // Ignore audio autoplay restrictions gracefully
  }
}

// 1. Pet / Heart chime (gentle cute arpeggio)
export function playPetSound() {
  if (!soundEnabled) return;
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    playTone(freq, "sine", 0.12, idx * 0.05, 0.08);
  });
}

// 2. Jump / Hop sound
export function playJumpSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {}
}

// 3. Grab / Pick up sound
export function playGrabSound() {
  if (!soundEnabled) return;
  playTone(480, "sine", 0.08, 0, 0.09);
  playTone(720, "sine", 0.08, 0.04, 0.09);
}

// 4. Land / Drop sound
export function playLandSound() {
  if (!soundEnabled) return;
  playTone(180, "triangle", 0.1, 0, 0.12);
  playTone(120, "sine", 0.12, 0.03, 0.1);
}

// 5. Cheer fanfare
export function playCheerSound() {
  if (!soundEnabled) return;
  const melody = [
    { f: 587.33, d: 0.08, t: 0 },
    { f: 783.99, d: 0.08, t: 0.09 },
    { f: 880.00, d: 0.08, t: 0.18 },
    { f: 1174.66, d: 0.25, t: 0.27 }
  ];
  melody.forEach(m => playTone(m.f, "sine", m.d, m.t, 0.09));
}

// 6. Sleep snore puff
export function playSleepSound() {
  if (!soundEnabled) return;
  playTone(220, "sine", 0.3, 0, 0.04);
}
