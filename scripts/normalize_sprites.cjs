const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const dir = path.join(__dirname, '..', 'public', 'character');

function padToUniform(fileNames, targetW, targetH, outPrefix) {
  fileNames.forEach((fileName, i) => {
    const filePath = path.join(dir, fileName);
    if (!fs.existsSync(filePath)) return;
    const data = fs.readFileSync(filePath);
    const srcPng = PNG.sync.read(data);

    const outPng = new PNG({ width: targetW, height: targetH });
    // Fill transparent
    outPng.data.fill(0);

    // Bottom-center alignment
    const offsetX = Math.floor((targetW - srcPng.width) / 2);
    const offsetY = targetH - srcPng.height; // Align to bottom

    for (let y = 0; y < srcPng.height; y++) {
      for (let x = 0; x < srcPng.width; x++) {
        const srcIdx = (srcPng.width * y + x) << 2;
        const dstIdx = (targetW * (y + offsetY) + (x + offsetX)) << 2;
        outPng.data[dstIdx] = srcPng.data[srcIdx];
        outPng.data[dstIdx + 1] = srcPng.data[srcIdx + 1];
        outPng.data[dstIdx + 2] = srcPng.data[srcIdx + 2];
        outPng.data[dstIdx + 3] = srcPng.data[srcIdx + 3];
      }
    }

    const outPath = path.join(dir, `${outPrefix}_${i}.png`);
    fs.writeFileSync(outPath, PNG.sync.write(outPng));
    console.log(`Padded ${fileName} -> ${outPrefix}_${i}.png (${targetW}x${targetH})`);
  });
}

// Uniform dimensions for walking & standard poses: 144 x 210
const walkDown = ['walk_down_0.png', 'walk_down_1.png', 'walk_down_2.png', 'walk_down_3.png', 'walk_down_4.png'];
padToUniform(walkDown, 144, 210, 'norm_down');

const walkDiag = ['walk_diag_0.png', 'walk_diag_1.png', 'walk_diag_2.png', 'walk_diag_3.png', 'walk_diag_4.png'];
padToUniform(walkDiag, 144, 210, 'norm_diag');

const walkSide = ['walk_side_0.png', 'walk_side_1.png', 'walk_side_2.png', 'walk_side_3.png', 'walk_side_4.png'];
padToUniform(walkSide, 144, 210, 'norm_side');

const walkUp = ['walk_up_0.png', 'walk_up_1.png', 'walk_up_2.png', 'walk_up_3.png', 'walk_up_4.png'];
padToUniform(walkUp, 144, 210, 'norm_up');

console.log('Normalization complete!');
