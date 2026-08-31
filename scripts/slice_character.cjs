const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const outDir = path.join(__dirname, '..', 'public', 'character');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const data = fs.readFileSync(path.join(__dirname, '..', 'character.png'));
const png = PNG.sync.read(data);
const W = png.width, H = png.height;

// Helper to crop a rectangle [x, y, w, h] from png
function crop(x, y, w, h, trimPadding = 0) {
  let minX = x + w, maxX = x, minY = y + h, maxY = y;
  for (let cy = y; cy < y + h; cy++) {
    for (let cx = x; cx < x + w; cx++) {
      if (cx >= 0 && cx < W && cy >= 0 && cy < H) {
        const a = png.data[((W * cy + cx) << 2) + 3];
        if (a > 10) {
          if (cx < minX) minX = cx;
          if (cx > maxX) maxX = cx;
          if (cy < minY) minY = cy;
          if (cy > maxY) maxY = cy;
        }
      }
    }
  }

  if (minX > maxX || minY > maxY) {
    minX = x; maxX = x + w - 1; minY = y; maxY = y + h - 1;
  }

  minX = Math.max(0, minX - trimPadding);
  minY = Math.max(0, minY - trimPadding);
  maxX = Math.min(W - 1, maxX + trimPadding);
  maxY = Math.min(H - 1, maxY + trimPadding);

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;
  const outPng = new PNG({ width: cropW, height: cropH });

  for (let cy = 0; cy < cropH; cy++) {
    for (let cx = 0; cx < cropW; cx++) {
      const srcIdx = ((W * (minY + cy) + (minX + cx)) << 2);
      const dstIdx = ((cropW * cy + cx) << 2);
      outPng.data[dstIdx] = png.data[srcIdx];
      outPng.data[dstIdx + 1] = png.data[srcIdx + 1];
      outPng.data[dstIdx + 2] = png.data[srcIdx + 2];
      outPng.data[dstIdx + 3] = png.data[srcIdx + 3];
    }
  }
  return outPng;
}

function savePNG(pngObj, filename) {
  const buf = PNG.sync.write(pngObj);
  fs.writeFileSync(path.join(outDir, filename), buf);
  console.log('Saved:', filename, `(${pngObj.width}x${pngObj.height})`);
}

// 1. Walk Down (Row 1, 5 frames)
const walkDownBoxes = [
  [336, 34, 126, 190],
  [487, 34, 127, 190],
  [634, 34, 117, 190],
  [768, 34, 126, 190],
  [914, 34, 125, 190]
];
walkDownBoxes.forEach((box, i) => {
  savePNG(crop(box[0], box[1], box[2], box[3]), `walk_down_${i}.png`);
});

// 2. Walk Diagonal / 3/4 (Row 2, 5 frames)
const walkDiagBoxes = [
  [328, 244, 127, 185],
  [480, 244, 122, 185],
  [623, 244, 124, 185],
  [762, 244, 125, 185],
  [907, 244, 123, 185]
];
walkDiagBoxes.forEach((box, i) => {
  savePNG(crop(box[0], box[1], box[2], box[3]), `walk_diag_${i}.png`);
});

// 3. Walk Profile / Side (Row 3, 5 frames)
const walkSideBoxes = [
  [346, 444, 127, 185],
  [489, 444, 126, 185],
  [636, 444, 126, 185],
  [777, 444, 127, 185],
  [926, 444, 123, 185]
];
walkSideBoxes.forEach((box, i) => {
  savePNG(crop(box[0], box[1], box[2], box[3]), `walk_side_${i}.png`);
});

// 4. Walk Up / Back (Row 4, 5 frames)
const walkUpBoxes = [
  [336, 642, 132, 195],
  [488, 642, 125, 195],
  [629, 642, 122, 195],
  [769, 642, 125, 195],
  [915, 642, 128, 195]
];
walkUpBoxes.forEach((box, i) => {
  savePNG(crop(box[0], box[1], box[2], box[3]), `walk_up_${i}.png`);
});

// 5. Special Poses
// Sitting / Chilling
savePNG(crop(1107, 107, 188, 179), 'sit.png');

// Cheerful / Arms Up celebrating (include hearts or character body)
savePNG(crop(1302, 65, 188, 220), 'cheer.png');

// Sleeping under cozy blanket with z Z
savePNG(crop(1088, 334, 192, 194), 'sleep.png');

// Shy / Cute standing pose (hands together)
savePNG(crop(1311, 332, 174, 200), 'shy.png');

// Running / Fast dash with dust trail
savePNG(crop(1120, 688, 327, 263), 'run.png');

// Big showcase idle standing on left
savePNG(crop(12, 199, 273, 504), 'stand_large.png');

// Floating emoticons
savePNG(crop(1107, 594, 50, 45), 'heart_small.png');
savePNG(crop(1176, 594, 55, 52), 'heart_large.png');
savePNG(crop(1262, 586, 60, 66), 'sparkle_large.png');
savePNG(crop(1329, 586, 22, 26), 'sparkle_small.png');
savePNG(crop(1409, 577, 68, 75), 'bubble_heart.png');

console.log('All sprites sliced successfully!');
