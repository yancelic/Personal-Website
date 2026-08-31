const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const raw = fs.readFileSync(path.join(__dirname, '..', 'character.png'));
const src = PNG.sync.read(raw);
const W = src.width, H = src.height;

const outDir = path.join(__dirname, '..', 'public', 'character');

// Target uniform dimensions
const TARGET_W = 140;
const TARGET_H = 190;

// Exact torso centers from character.png for Row 2 (3/4 walk)
const row2Centers = [
  { cx: 394, cy: 331 },
  { cx: 542, cy: 329 },
  { cx: 685, cy: 330 },
  { cx: 826, cy: 329 },
  { cx: 971, cy: 330 }
];

// Exact torso centers for Row 3 (Side walk)
const row3Centers = [
  { cx: 407, cy: 528 },
  { cx: 551, cy: 527 },
  { cx: 696, cy: 528 },
  { cx: 839, cy: 528 },
  { cx: 984, cy: 529 }
];

// Function to crop a frame anchored precisely on (cx, cy)
function cropAnchored(cx, cy) {
  const outPng = new PNG({ width: TARGET_W, height: TARGET_H });
  outPng.data.fill(0);

  // We want (cx, cy) to land at (TARGET_W / 2, TARGET_H - 100)
  const targetAnchorX = Math.round(TARGET_W / 2);
  const targetAnchorY = Math.round(TARGET_H - 95);

  const startSrcX = cx - targetAnchorX;
  const startSrcY = cy - targetAnchorY;

  for (let y = 0; y < TARGET_H; y++) {
    for (let x = 0; x < TARGET_W; x++) {
      const srcX = startSrcX + x;
      const srcY = startSrcY + y;
      if (srcX >= 0 && srcX < W && srcY >= 0 && srcY < H) {
        const srcIdx = (W * srcY + srcX) << 2;
        const dstIdx = (TARGET_W * y + x) << 2;
        outPng.data[dstIdx] = src.data[srcIdx];
        outPng.data[dstIdx + 1] = src.data[srcIdx + 1];
        outPng.data[dstIdx + 2] = src.data[srcIdx + 2];
        outPng.data[dstIdx + 3] = src.data[srcIdx + 3];
      }
    }
  }
  return outPng;
}

// Extract the 5 keyframes for 3/4 walk
const keyframesDiag = row2Centers.map(c => cropAnchored(c.cx, c.cy));

// Extract the 5 keyframes for Side walk
const keyframesSide = row3Centers.map(c => cropAnchored(c.cx, c.cy));

// Save keyframes as individual images
keyframesDiag.forEach((pngObj, i) => {
  fs.writeFileSync(path.join(outDir, `diag_key_${i}.png`), PNG.sync.write(pngObj));
});

keyframesSide.forEach((pngObj, i) => {
  fs.writeFileSync(path.join(outDir, `side_key_${i}.png`), PNG.sync.write(pngObj));
});

// Helper to blend / interpolate two PNGs with weight alpha (0.0 to 1.0)
function blendFrames(pngA, pngB, alpha) {
  const out = new PNG({ width: TARGET_W, height: TARGET_H });
  for (let i = 0; i < pngA.data.length; i += 4) {
    const a1 = pngA.data[i + 3] / 255;
    const a2 = pngB.data[i + 3] / 255;
    const blendedA = (1 - alpha) * a1 + alpha * a2;

    if (blendedA < 0.05) {
      out.data[i] = 0;
      out.data[i + 1] = 0;
      out.data[i + 2] = 0;
      out.data[i + 3] = 0;
    } else {
      out.data[i] = Math.round(((1 - alpha) * pngA.data[i] * a1 + alpha * pngB.data[i] * a2) / blendedA);
      out.data[i + 1] = Math.round(((1 - alpha) * pngA.data[i + 1] * a1 + alpha * pngB.data[i + 1] * a2) / blendedA);
      out.data[i + 2] = Math.round(((1 - alpha) * pngA.data[i + 2] * a1 + alpha * pngB.data[i + 2] * a2) / blendedA);
      out.data[i + 3] = Math.round(blendedA * 255);
    }
  }
  return out;
}

// Construct an 8-frame smooth cycle:
// [Key0, Blend(0,1), Key1, Key2, Blend(2,3), Key3, Key4, Blend(4,0)]
// Let's create the 8 smooth frames for 3/4 walk
const smoothCycleDiag = [
  keyframesDiag[0],
  blendFrames(keyframesDiag[0], keyframesDiag[1], 0.5),
  keyframesDiag[1],
  keyframesDiag[2],
  blendFrames(keyframesDiag[2], keyframesDiag[3], 0.5),
  keyframesDiag[3],
  keyframesDiag[4],
  blendFrames(keyframesDiag[4], keyframesDiag[0], 0.5),
];

smoothCycleDiag.forEach((frame, i) => {
  fs.writeFileSync(path.join(outDir, `walk_smooth_${i}.png`), PNG.sync.write(frame));
  console.log(`Saved walk_smooth_${i}.png`);
});

// Also create 8 smooth frames for side walk
const smoothCycleSide = [
  keyframesSide[0],
  blendFrames(keyframesSide[0], keyframesSide[1], 0.5),
  keyframesSide[1],
  keyframesSide[2],
  blendFrames(keyframesSide[2], keyframesSide[3], 0.5),
  keyframesSide[3],
  keyframesSide[4],
  blendFrames(keyframesSide[4], keyframesSide[0], 0.5),
];

smoothCycleSide.forEach((frame, i) => {
  fs.writeFileSync(path.join(outDir, `walk_side_smooth_${i}.png`), PNG.sync.write(frame));
  console.log(`Saved walk_side_smooth_${i}.png`);
});

console.log('Smooth walk cycles generated successfully!');
