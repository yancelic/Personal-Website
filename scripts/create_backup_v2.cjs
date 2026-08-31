const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const backupDir = path.join(root, 'backup_v2');

function copyDirRecursive(src, dst) {
  if (!fs.existsSync(dst)) {
    fs.mkdirSync(dst, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'dist' && !entry.name.startsWith('backup')) {
        copyDirRecursive(srcPath, dstPath);
      }
    } else {
      try {
        fs.copyFileSync(srcPath, dstPath);
      } catch (e) {
        // Retry with readFileSync
        try {
          const data = fs.readFileSync(srcPath);
          fs.writeFileSync(dstPath, data);
        } catch (err) {
          console.warn(`Could not copy ${srcPath}:`, err.message);
        }
      }
    }
  }
}

copyDirRecursive(path.join(root, 'src'), path.join(backupDir, 'src'));
copyDirRecursive(path.join(root, 'public'), path.join(backupDir, 'public'));
fs.copyFileSync(path.join(root, 'package.json'), path.join(backupDir, 'package.json'));
fs.copyFileSync(path.join(root, 'vite.config.js'), path.join(backupDir, 'vite.config.js'));
fs.copyFileSync(path.join(root, 'index.html'), path.join(backupDir, 'index.html'));

console.log('backup_v2 folder created successfully!');
