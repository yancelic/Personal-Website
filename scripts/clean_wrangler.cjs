const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const raw = fs.readFileSync(path.join(__dirname, '..', 'character.png'));
const src = PNG.sync.read(raw);
const W = src.width, H = src.height;

// Crop pure runner body (x=1240..1446, y=688..935)
const minX = 1240, maxX = 1445, minY = 688, maxY = 932;
const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;

const outPng = new PNG({ width: cropW, height: cropH });
for (let y = 0; y < cropH; y++) {
  for (let x = 0; x < cropW; x++) {
    const srcIdx = (W * (minY + y) + (minX + x)) << 2;
    const dstIdx = (cropW * y + x) << 2;
    outPng.data[dstIdx] = src.data[srcIdx];
    outPng.data[dstIdx+1] = src.data[srcIdx+1];
    outPng.data[dstIdx+2] = src.data[srcIdx+2];
    outPng.data[dstIdx+3] = src.data[srcIdx+3];
  }
}

// Clean any leftover isolated speckles on the left edge (x < 15)
for (let y = cropH - 70; y < cropH; y++) {
  for (let x = 0; x < 25; x++) {
    const idx = (cropW * y + x) << 2;
    // Clear pink ground dust
    if (outPng.data[idx] > 200 && outPng.data[idx+1] > 150) {
      outPng.data[idx+3] = 0;
    }
  }
}

// Also clear the gray ground shadow line at the very bottom
for (let x = 0; x < cropW; x++) {
  for (let y = cropH - 8; y < cropH; y++) {
    const idx = (cropW * y + x) << 2;
    const r = outPng.data[idx], g = outPng.data[idx+1], b = outPng.data[idx+2];
    if (r > 130 && r < 180 && g > 130 && g < 180 && b > 140) {
      outPng.data[idx+3] = 0;
    }
  }
}

fs.writeFileSync(path.join(__dirname, '..', 'public', 'character', 'toddler_wrangler_0.png'), PNG.sync.write(outPng));
console.log('toddler_wrangler_0.png saved clean!');
