const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '../dist/shadahmio');
const indexPath = path.join(distPath, 'index.html');
const notFoundPath = path.join(distPath, '404.html');

if (!fs.existsSync(indexPath)) {
  console.log(`Warning: ${indexPath} does not exist. Skipping 404.html generation.`);
} else {
  fs.copyFileSync(indexPath, notFoundPath);
  console.log(`✓ 404.html generated: ${notFoundPath}`);
}
