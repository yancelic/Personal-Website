const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const raw = fs.readFileSync(path.join(__dirname, '..', 'character.png'));
const src = PNG.sync.read(raw);
const W = src.width, H = src.height;

const outDir = path.join(__dirname, '..', 'public', 'character');

// Row 3 boxes in character.png:
// #0: x=[346..472] (w=127), y=[444..624]
// #1: x=[489..614] (w=126), y=[444..624]
// #2: x=[636..761] (w=126), y=[445..624]
// #3: x=[777..903] (w=127), y=[444..626]
// #4: x=[926..1048] (w=123), y=[444..624]

const TARGET_W = 140;
const TARGET_H = 190;

// Measure eye X and foot baseline for each of the 5 frames in Row 3
const row3Info = [
  { minX: 346, maxX: 472, minY: 444, maxY: 624, eyeGlobalX: 380, eyeGlobalY: 451, footY: 624 },
  { minX: 489, maxX: 614, minY: 444, maxY: 624, eyeGlobalX: 524, eyeGlobalY: 453, footY: 624 },
  { minX: 636, maxX: 761, minY: 445, maxY: 624, eyeGlobalX: 669, eyeGlobalY: 452, footY: 624 }, // eye at 669
  { minX: 777, maxX: 903, minY: 444, maxY: 626, eyeGlobalX: 812, eyeGlobalY: 451, footY: 626 },
  { minX: 926, maxX: 1048, minY: 444, maxY: 624, eyeGlobalX: 955, eyeGlobalY: 452, footY: 624 },
];

function cropFrame(info) {
  const outPng = new PNG({ width: TARGET_W, height: TARGET_H });
  outPng.data.fill(0);

  // We want the eye to land at target X = 46, and the foot baseline to land at Y = 186
  const targetEyeX = 48;
  const targetFootY = 184;

  const startSrcX = info.eyeGlobalX - targetEyeX;
  const startSrcY = info.footY - targetFootY;

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

const frames = row3Info.map((info, i) => {
  const png = cropFrame(info);
  fs.writeFileSync(path.join(outDir, `walk_pure_${i}.png`), PNG.sync.write(png));
  return png;
});

// The natural 6-frame walk cycle sequence:
// 0: Left step contact
// 1: Left step passing
// 2: Center passing
// 3: Right step contact
// 4: Right step passing
// 5: Center passing (reuse frame 2)
const cycle = [0, 1, 2, 3, 4, 2];
cycle.forEach((frameIdx, seqIdx) => {
  const png = frames[frameIdx];
  fs.writeFileSync(path.join(outDir, `walk_clean_${seqIdx}.png`), PNG.sync.write(png));
  console.log(`Saved walk_clean_${seqIdx}.png (from frame #${frameIdx})`);
});

console.log('Clean pixel art walk cycle saved!');
