const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const raw = fs.readFileSync(path.join(__dirname, '..', 'character.png'));
const src = PNG.sync.read(raw);
const W = src.width, H = src.height;

const outDir = path.join(__dirname, '..', 'public', 'character');

// The 5 actual climb frames in Row 4
const boxes = [
  { minX: 336, maxX: 467, minY: 642, maxY: 835 },
  { minX: 488, maxX: 612, minY: 644, maxY: 835 },
  { minX: 630, maxX: 750, minY: 644, maxY: 835 },
  { minX: 769, maxX: 892, minY: 644, maxY: 835 },
  { minX: 915, maxX: 1042, minY: 644, maxY: 835 }
];

const TARGET_W = 140;
const TARGET_H = 196;

boxes.forEach((box, i) => {
  const cropW = box.maxX - box.minX + 1;
  const cropH = box.maxY - box.minY + 1;

  const targetPng = new PNG({ width: TARGET_W, height: TARGET_H });
  targetPng.data.fill(0);

  const offsetX = Math.round((TARGET_W - cropW) / 2);
  const offsetY = TARGET_H - cropH; // Align feet at bottom

  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const sIdx = (W * (box.minY + y) + (box.minX + x)) << 2;
      const dIdx = (TARGET_W * (offsetY + y) + (offsetX + x)) << 2;
      targetPng.data[dIdx] = src.data[sIdx];
      targetPng.data[dIdx + 1] = src.data[sIdx + 1];
      targetPng.data[dIdx + 2] = src.data[sIdx + 2];
      targetPng.data[dIdx + 3] = src.data[sIdx + 3];
    }
  }

  const fileName = `climb_clean_${i}.png`;
  fs.writeFileSync(path.join(outDir, fileName), PNG.sync.write(targetPng));
  console.log(`Saved ${fileName}`);
});

console.log('5 Clean climbing frames aligned and saved!');
