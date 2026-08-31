const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const raw = fs.readFileSync(path.join(__dirname, '..', 'character.png'));
const src = PNG.sync.read(raw);
const W = src.width, H = src.height;

// Find connected columns in Row 4 (y=630..840, x < 1050)
const colActive = new Array(1050).fill(0);
for (let x = 0; x < 1050; x++) {
  for (let y = 635; y < 840; y++) {
    const idx = (W * y + x) << 2;
    if (src.data[idx + 3] > 20) {
      colActive[x]++;
    }
  }
}

// Find contiguous column segments
const segments = [];
let inSeg = false, segStart = 0;
for (let x = 0; x < 1050; x++) {
  if (colActive[x] > 5 && !inSeg) {
    inSeg = true;
    segStart = x;
  } else if (colActive[x] <= 5 && inSeg) {
    inSeg = false;
    if (x - segStart > 30) {
      segments.push({ start: segStart, end: x - 1 });
    }
  }
}
if (inSeg) segments.push({ start: segStart, end: 1049 });

console.log('Row 4 Segments:', JSON.stringify(segments));

// Crop each segment cleanly
const outDir = path.join(__dirname, '..', 'public', 'character');
segments.forEach((seg, i) => {
  let minX = seg.end, maxX = seg.start, minY = 840, maxY = 635;
  for (let y = 635; y < 840; y++) {
    for (let x = seg.start; x <= seg.end; x++) {
      const idx = (W * y + x) << 2;
      if (src.data[idx + 3] > 20) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  const targetPng = new PNG({ width: cropW, height: cropH });
  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const sIdx = (W * (minY + y) + (minX + x)) << 2;
      const dIdx = (cropW * y + x) << 2;
      targetPng.data[dIdx] = src.data[sIdx];
      targetPng.data[dIdx+1] = src.data[sIdx+1];
      targetPng.data[dIdx+2] = src.data[sIdx+2];
      targetPng.data[dIdx+3] = src.data[sIdx+3];
    }
  }

  // Clear bottom shadow lines if any
  for (let x = 0; x < cropW; x++) {
    for (let y = cropH - 4; y < cropH; y++) {
      const idx = (cropW * y + x) << 2;
      if (targetPng.data[idx] > 120 && targetPng.data[idx] < 190 && targetPng.data[idx+1] > 120 && targetPng.data[idx+1] < 190) {
        targetPng.data[idx+3] = 0;
      }
    }
  }

  const fileName = `climb_${i}.png`;
  fs.writeFileSync(path.join(outDir, fileName), PNG.sync.write(targetPng));
  console.log(`Saved ${fileName}: ${cropW}x${cropH} at (${minX}, ${minY})`);
});
