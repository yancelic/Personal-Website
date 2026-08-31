const fs = require('fs');
const { PNG } = require('pngjs');

const data = fs.readFileSync('character.png');
const png = PNG.sync.read(data);
const W = png.width, H = png.height;

const dilated = new Uint8Array(W * H);
const radius = 6;

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const a = png.data[((W * y + x) << 2) + 3];
    if (a > 10) {
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx >= 0 && nx < W && ny >= 0 && ny < H) {
            dilated[W * ny + nx] = 1;
          }
        }
      }
    }
  }
}

const visited = new Uint8Array(W * H);
const boxes = [];

for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const idx = (W * y + x);
    if (visited[idx] || !dilated[idx]) continue;

    let minX = x, maxX = x, minY = y, maxY = y;
    const queue = [x, y];
    visited[idx] = 1;

    let head = 0;
    while (head < queue.length) {
      const cx = queue[head++];
      const cy = queue[head++];
      if (cx < minX) minX = cx;
      if (cx > maxX) maxX = cx;
      if (cy < minY) minY = cy;
      if (cy > maxY) maxY = cy;

      const neighbors = [
        [cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]
      ];
      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < W && ny >= 0 && ny < H) {
          const nidx = W * ny + nx;
          if (!visited[nidx] && dilated[nidx]) {
            visited[nidx] = 1;
            queue.push(nx, ny);
          }
        }
      }
    }

    // Shrink back to actual pixels
    let realMinX = maxX, realMaxX = minX, realMinY = maxY, realMaxY = minY;
    for (let py = minY; py <= maxY; py++) {
      for (let px = minX; px <= maxX; px++) {
        if (px >= 0 && px < W && py >= 0 && py < H) {
          if (png.data[((W * py + px) << 2) + 3] > 10) {
            if (px < realMinX) realMinX = px;
            if (px > realMaxX) realMaxX = px;
            if (py < realMinY) realMinY = py;
            if (py > realMaxY) realMaxY = py;
          }
        }
      }
    }

    const w = realMaxX - realMinX + 1;
    const h = realMaxY - realMinY + 1;
    if (w > 10 && h > 10) {
      boxes.push({ minX: realMinX, minY: realMinY, maxX: realMaxX, maxY: realMaxY, w, h });
    }
  }
}

console.log('Found boxes count:', boxes.length);
boxes.sort((a, b) => a.minY - b.minY || a.minX - b.minX);
boxes.forEach((b, i) => {
  console.log('#' + i + ': x=[' + b.minX + '..' + b.maxX + '] (w=' + b.w + '), y=[' + b.minY + '..' + b.maxY + '] (h=' + b.h + ')');
});
