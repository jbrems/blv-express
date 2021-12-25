import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

function getCacheDir () {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  return path.join(currentDir, 'cache');
}

function getFileName (z, x, y) {
  return `${z}-${x}-${y}.png`;
}

function getFilePath (z, x ,y) {
  return path.join(getCacheDir(), getFileName(z, x, y));
}

export function hasTile (z, x, y) {
  return fs.existsSync(getFilePath(z, x, y));
}

export function getTileAsStream (z, x, y) {
  console.log(`Serving tile ${z} ${x} ${y} from cache`);
  return fs.createReadStream(getFilePath(z, x, y));
}

export function storeTile (z, x, y, tile) {
  console.log(`Storing tile ${z} ${x} ${y} in cache`);
  const file = fs.createWriteStream(getFilePath(z, x, y));
  tile.pipe(file);
}