const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\mayan\\.gemini\\antigravity\\brain\\cbe6f133-708d-4237-9ac3-0467a4b8db98';
const dest = path.join(__dirname, 'public');

const files = [
  ['media__1783536606825.jpg', 'gym1.jpg'],
  ['media__1783536606891.jpg', 'gym2.jpg'],
  ['media__1783536606979.jpg', 'gym3.jpg'],
  ['media__1783536607034.jpg', 'gym4.jpg'],
  ['media__1783536607103.jpg', 'gym5.jpg'],
];

if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

files.forEach(([from, to]) => {
  fs.copyFileSync(path.join(src, from), path.join(dest, to));
  console.log(`Copied ${from} -> ${to}`);
});

console.log('All images copied!');
