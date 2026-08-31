const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const exportDir = path.join(rootDir, 'export', 'companion-mascot');
const spritesDir = path.join(exportDir, 'public', 'character');

// Ensure directories exist
fs.mkdirSync(spritesDir, { recursive: true });

// All sprites used by current Companion
const requiredSprites = [
  'norm_down_2.png',
  'walk_clean_0.png',
  'walk_clean_1.png',
  'walk_clean_2.png',
  'walk_clean_3.png',
  'walk_clean_4.png',
  'walk_clean_5.png',
  'climb_clean_0.png',
  'climb_clean_1.png',
  'climb_clean_2.png',
  'climb_clean_3.png',
  'climb_clean_4.png',
  'toddler_horiz_0.png',
  'toddler_horiz_1.png',
  'toddler_horiz_chill.png',
  'sit.png',
  'cheer.png',
  'sleep.png',
  'shy.png',
  'run.png',
  'heart_large.png',
  'heart_small.png',
  'sparkle_large.png'
];

// Copy sprites
const srcPublic = path.join(rootDir, 'public', 'character');
requiredSprites.forEach(file => {
  const src = path.join(srcPublic, file);
  const dst = path.join(spritesDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst);
    console.log(`Copied sprite: ${file}`);
  } else {
    console.warn(`Warning: missing ${file}`);
  }
});

// Copy React component, CSS, and Audio Synth
const srcComp = path.join(rootDir, 'src', 'components', 'character');
fs.copyFileSync(path.join(srcComp, 'Companion.jsx'), path.join(exportDir, 'Companion.jsx'));
fs.copyFileSync(path.join(srcComp, 'Companion.css'), path.join(exportDir, 'Companion.css'));
fs.copyFileSync(path.join(srcComp, 'audioSynth.js'), path.join(exportDir, 'audioSynth.js'));

// Also copy original master sprite sheet character.png for reference
if (fs.existsSync(path.join(rootDir, 'character.png'))) {
  fs.copyFileSync(path.join(rootDir, 'character.png'), path.join(exportDir, 'character_master.png'));
}

// Create a comprehensive README.md with integration instructions for React, Next.js, Vite, and Vanilla JS
const readmeContent = `# 🌸 Anime Companion Mascot Component (v2.0 Full Edition)

An interactive, responsive, physics-driven pixel-art mascot companion ready to drop into any website or React application.

---

## 📦 What's Inside

\`\`\`
companion-mascot/
├── Companion.jsx          # React Component (locomotion, climbing, gravity, physics)
├── Companion.css          # Styling, keyframes, 3D shadows, badges
├── audioSynth.js          # Zero-dependency Web Audio API chiptune audio generator
├── character_master.png   # Original 1536x1024 master sprite sheet
├── public/
│   └── character/         # All 23 pre-rendered crisp pixel sprites
│       ├── walk_clean_0.png ... walk_clean_5.png   (6-frame side walk)
│       ├── climb_clean_0.png ... climb_clean_4.png (5-frame wall climb)
│       ├── toddler_horiz_0.png, toddler_horiz_1.png, toddler_horiz_chill.png
│       ├── sit.png, cheer.png, sleep.png, shy.png, run.png
│       └── heart_large.png, heart_small.png, sparkle_large.png
└── README.md              # Setup & customization guide
\`\`\`

---

## 🚀 Quick Setup (3 Easy Steps)

### 1. Copy the Sprites
Copy the \`public/character/\` folder to your project's public static assets directory:
- **Vite / React**: \`/public/character/\`
- **Next.js**: \`/public/character/\`
- **Astro / SvelteKit / Nuxt**: \`/public/character/\`

### 2. Copy the Code Files
Place \`Companion.jsx\`, \`Companion.css\`, and \`audioSynth.js\` into your components directory (e.g. \`src/components/character/\`).

### 3. Mount in your App
\`\`\`jsx
import Companion from "./components/character/Companion";

export default function App() {
  return (
    <div>
      {/* Your website content */}
      
      {/* Mount Mascot (lang='en' or 'tr') */}
      <Companion lang="en" />
    </div>
  );
}
\`\`\`

---

## ✨ Features & Interactions

- **🚶 6-Frame Crisp Pixel Walk**: Silky smooth locomotion + Michael Jackson moonwalk.
- **🧗 Real Wall Climbing**: Scales cards, windows, and obstacles with 5-frame climbing sprites and vaults onto roofs/ledges!
- **⬇️ Scroll Gravity Physics**: Stands on UI components. If you scroll and the platform moves away, gravity makes her drop through the air and land on the next surface below!
- **👶 Back-Grab Horizontal Carry**:
  - **Annoyed / Squirming 💢**: Rapid kicking boots, tantrum emote, dynamic physics inertia.
  - **Chill / Relaxed ✈️**: Horizontal limp carry, free taxi dialogue.
- **🎈 60 FPS Spring-Inertia Physics**: Swings naturally with real momentum as you drag her across the screen.
- **🎵 Chiptune Audio Synth**: Zero external sound files — 100% Web Audio API synthesized sound effects.
- **🌙 Smart Autonomous AI**: Idle wandering, coffee breaks, naps after 35s of inactivity, wake-up on click.
- **🌐 Bilingual Support**: Full English and Turkish dialogues included.
- **🖱️ Right-Click Quick Menu**: Say Hi, Walk, Moonwalk, Sit, Cheer, Sleep, Mute SFX, or Hide Mascot.
`;

fs.writeFileSync(path.join(exportDir, 'README.md'), readmeContent);
console.log('Export package updated at: export/companion-mascot');
