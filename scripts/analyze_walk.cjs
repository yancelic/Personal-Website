const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const raw = fs.readFileSync(path.join(__dirname, '..', 'character.png'));
const png = PNG.sync.read(raw);
const W = png.width, H = png.height;

// Let's inspect the four rows of 5 walking sprites in the middle area of character.png
// Notice the columns:
// col 0: x approx 330..470
// col 1: x approx 480..620
// col 2: x approx 630..765
// col 3: x approx 770..905
// col 4: x approx 915..1050

// Let's accurately find the center of mass / torso center for each sprite in each row
function findTorsoCenter(minX, maxX, minY, maxY) {
  let sumX = 0, sumY = 0, count = 0;
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const idx = (W * y + x) << 2;
      if (png.data[idx + 3] > 50) {
        sumX += x;
        sumY += y;
        count++;
      }
    }
  }
  return { cx: Math.round(sumX / count), cy: Math.round(sumY / count), count };
}

console.log('Torso centers for Row 2 (3/4 walk):');
const row2Boxes = [
  [328, 244, 127, 185],
  [480, 244, 122, 185],
  [623, 244, 124, 185],
  [762, 244, 125, 185],
  [907, 244, 123, 185]
];
row2Boxes.forEach((b, i) => {
  const c = findTorsoCenter(b[0], b[0] + b[2], b[1], b[1] + b[3]);
  console.log(`Row 2 #${i}: Torso center=(${c.cx}, ${c.cy}), relative=(${c.cx - b[0]}, ${c.cy - b[1]})`);
});

console.log('Torso centers for Row 3 (Side walk):');
const row3Boxes = [
  [346, 444, 127, 185],
  [489, 444, 126, 185],
  [636, 444, 126, 185],
  [777, 444, 127, 185],
  [926, 444, 123, 185]
];
row3Boxes.forEach((b, i) => {
  const c = findTorsoCenter(b[0], b[0] + b[2], b[1], b[1] + b[3]);
  console.log(`Row 3 #${i}: Torso center=(${c.cx}, ${c.cy}), relative=(${c.cx - b[0]}, ${c.cy - b[1]})`);
});
