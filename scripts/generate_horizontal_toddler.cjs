const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const raw = fs.readFileSync(path.join(__dirname, '..', 'character.png'));
const src = PNG.sync.read(raw);
const W = src.width, H = src.height;

const outDir = path.join(__dirname, '..', 'public', 'character');

// Crop the running / horizontal kicking character body from character.png (bottom right)
// x=1220..1445, y=688..932
const minX = 1235, maxX = 1445, minY = 688, maxY = 932;
const srcW = maxX - minX + 1;
const srcH = maxY - minY + 1;

const croppedPng = new PNG({ width: srcW, height: srcH });
for (let y = 0; y < srcH; y++) {
  for (let x = 0; x < srcW; x++) {
    const sIdx = (W * (minY + y) + (minX + x)) << 2;
    const dIdx = (srcW * y + x) << 2;
    croppedPng.data[dIdx] = src.data[sIdx];
    croppedPng.data[dIdx+1] = src.data[sIdx+1];
    croppedPng.data[dIdx+2] = src.data[sIdx+2];
    croppedPng.data[dIdx+3] = src.data[sIdx+3];
  }
}

// Clean ground artifacts & stray dust on bottom left
for (let y = srcH - 45; y < srcH; y++) {
  for (let x = 0; x < 30; x++) {
    croppedPng.data[((srcW * y + x) << 2) + 3] = 0;
  }
}

// Clear bottom gray shadow line
for (let x = 0; x < srcW; x++) {
  for (let y = srcH - 6; y < srcH; y++) {
    const idx = (srcW * y + x) << 2;
    if (croppedPng.data[idx] > 120 && croppedPng.data[idx] < 190 && croppedPng.data[idx+1] > 120 && croppedPng.data[idx+1] < 190) {
      croppedPng.data[idx+3] = 0;
    }
  }
}

// Rotate image with high precision
function rotateImage(png, angleDeg, outW, outH, anchorX, anchorY, targetCX, targetCY) {
  const out = new PNG({ width: outW, height: outH });
  out.data.fill(0);

  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  for (let dy = 0; dy < outH; dy++) {
    for (let dx = 0; dx < outW; dx++) {
      const relX = dx - targetCX;
      const relY = dy - targetCY;

      const srcRelX = relX * cos + relY * sin;
      const srcRelY = -relX * sin + relY * cos;

      const sx = Math.round(anchorX + srcRelX);
      const sy = Math.round(anchorY + srcRelY);

      if (sx >= 0 && sx < png.width && sy >= 0 && sy < png.height) {
        const srcIdx = (png.width * sy + sx) << 2;
        const dstIdx = (outW * dy + dx) << 2;
        if (png.data[srcIdx + 3] > 10) {
          out.data[dstIdx] = png.data[srcIdx];
          out.data[dstIdx + 1] = png.data[srcIdx + 1];
          out.data[dstIdx + 2] = png.data[srcIdx + 2];
          out.data[dstIdx + 3] = png.data[srcIdx + 3];
        }
      }
    }
  }
  return out;
}

// Back grab anchor in cropped runner body: x ≈ 95, y ≈ 85
const OUT_W = 320;
const OUT_H = 260;
const TARGET_CX = 160;
const TARGET_CY = 110;

// Frame 0: Horizontal posture (48 degrees tilt)
const horizontalFrame0 = rotateImage(croppedPng, 48, OUT_W, OUT_H, 95, 85, TARGET_CX, TARGET_CY);
fs.writeFileSync(path.join(outDir, 'toddler_horiz_0.png'), PNG.sync.write(horizontalFrame0));

// Frame 1: Alternating kicking legs (36 degrees tilt)
const horizontalFrame1 = rotateImage(croppedPng, 36, OUT_W, OUT_H, 95, 85, TARGET_CX, TARGET_CY);
fs.writeFileSync(path.join(outDir, 'toddler_horiz_1.png'), PNG.sync.write(horizontalFrame1));

// Frame Chill: Loaf of bread carry (56 degrees tilt)
const horizontalChill = rotateImage(croppedPng, 56, OUT_W, OUT_H, 95, 85, TARGET_CX, TARGET_CY);
fs.writeFileSync(path.join(outDir, 'toddler_horiz_chill.png'), PNG.sync.write(horizontalChill));

console.log('320x260 Full coverage horizontal toddler sprites generated!');
