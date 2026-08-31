const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const exportDir = path.join(rootDir, 'export', 'companion-mascot');
const spritesDir = path.join(exportDir, 'public', 'character');

// Ensure directories exist
fs.mkdirSync(spritesDir, { recursive: true });

// Required sprite list
const requiredSprites = [
  'norm_down_2.png',
  'walk_clean_0.png',
  'walk_clean_1.png',
  'walk_clean_2.png',
  'walk_clean_3.png',
  'walk_clean_4.png',
  'walk_clean_5.png',
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
fs.copyFileSync(path.join(rootDir, 'character.png'), path.join(exportDir, 'character_master.png'));

// Create a comprehensive README.md with integration instructions for React, Next.js, Vite, and Vanilla JS
const readmeContent = `# 🌸 Anime Companion Mascot Component

An interactive, responsive, animated pixel-art mascot companion ready to drop into any website or React application.

---

## 📦 What's Inside

\`\`\`
companion-mascot/
├── Companion.jsx          # React Component
├── Companion.css          # Styling, keyframes, and pixel-art filters
├── audioSynth.js          # Zero-dependency Web Audio API sound generator
├── character_master.png   # Original 1536x1024 sprite sheet
├── public/
│   └── character/         # All 18 pre-rendered crisp pixel sprites
│       ├── walk_clean_0.png ... walk_clean_5.png
│       ├── toddler_horiz_0.png, toddler_horiz_1.png, toddler_horiz_chill.png
│       ├── sit.png, cheer.png, sleep.png, shy.png, run.png
│       └── heart_large.png, heart_small.png, sparkle_large.png
└── README.md              # Setup & customization guide
\`\`\`

---

## 🚀 Quick Setup

### 1. Copy the Sprites
Copy the \`public/character/\` folder to your project's public static assets directory:
- **Vite / Create React App**: \`/public/character/\`
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

- **🚶 Smooth Locomotion**: 6-frame pixel-art walk cycle + Michael Jackson moonwalk.
- **👶 Back-Grab Horizontal Carry**:
  - **Annoyed / Squirming 💢**: Rapid kicking boots, tantrum emote, dynamic physics inertia.
  - **Chill / Relaxed ✈️**: Horizontal limp carry, free taxi dialogue.
- **🎈 60 FPS Spring-Inertia Physics**: Swings naturally with momentum as you move your mouse.
- **🎵 Chiptune Audio Synth**: Zero external sound files — 100% Web Audio API synthesized sound effects.
- **🌙 Smart AI**: Idle wandering, coffee breaks, naps after 35s of inactivity, wake-up on click.
- **🌐 Bilingual**: English and Turkish dialogues included.
- **🖱️ Right-Click Context Menu**: Say Hi, Walk, Moonwalk, Sit, Cheer, Sleep, Mute SFX, or Hide Mascot.
`;

fs.writeFileSync(path.join(exportDir, 'README.md'), readmeContent);
console.log('Export package created at: export/companion-mascot');
