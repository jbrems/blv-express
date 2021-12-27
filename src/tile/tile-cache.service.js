import path from 'path';
import fs from 'fs';
import { getPath } from '../shared/fs.utils';

function getCacheDir () {
  return getPath('/tile/cache');
}

function getFileName (z, x, y) {
  return `${z}-${x}-${y}.png`;
}

function getFilePath (z, x, y) {
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

export async function deleteTile (z, x, y) {
  console.log(`Deleting tile ${z} ${x} ${y} from cache`);
  return fs.promises.unlink(getFilePath(z, x, y));
}

export async function listTiles () {
  const fileNames = await fs.promises.readdir(getCacheDir());
  return fileNames;
}

export async function deleteTiles () {
  console.log('Deleting all tiles from cache');
  const fileNames = await fs.promises.readdir(getCacheDir());
  return Promise.all(
    fileNames.map((fileName) => {
      fs.promises.unlink(path.join(getCacheDir(), fileName));
    }),
  );
}
