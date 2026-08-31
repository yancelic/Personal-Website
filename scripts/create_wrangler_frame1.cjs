const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const raw = fs.readFileSync(path.join(__dirname, '..', 'public', 'character', 'toddler_wrangler_0.png'));
const png0 = PNG.sync.read(raw);

// Create frame 1 with alternate leg kicking position
const png1 = new PNG({ width: png0.width, height: png0.height });
png1.data.set(png0.data);

// Shift the lower leg pixels (y > 170, x < 120) by a few pixels to simulate squirming leg flails
for (let y = 175; y < png0.height - 2; y++) {
  for (let x = 10; x < 110; x++) {
    const srcX = x;
    const srcY = y;
    const dstX = x + 3;
    const dstY = y - 2;
    if (dstX < png0.width && dstY >= 0 && dstY < png0.height) {
      const srcIdx = (png0.width * srcY + srcX) << 2;
      const dstIdx = (png1.width * dstY + dstX) << 2;
      if (png0.data[srcIdx + 3] > 0) {
        png1.data[dstIdx] = png0.data[srcIdx];
        png1.data[dstIdx+1] = png0.data[srcIdx+1];
        png1.data[dstIdx+2] = png0.data[srcIdx+2];
        png1.data[dstIdx+3] = png0.data[srcIdx+3];
      }
    }
  }
}

fs.writeFileSync(path.join(__dirname, '..', 'public', 'character', 'toddler_wrangler_1.png'), PNG.sync.write(png1));
console.log('toddler_wrangler_1.png created!');
