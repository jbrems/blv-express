import fs from 'fs';
import * as tileCacheService from './tile-cache.service';
import { getPath } from '../shared/fs.utils';

export function serveCacheControl (req, res) {
  const file = fs.createReadStream(getPath('/tile/cache-control.html'));

  res.set('Content-Type', 'text/html');
  file.pipe(res);
}

export function getTile (req, res) {
  const { z, x, y } = req.params;

  if (!tileCacheService.hasTile(z, x, y)) {
    res.sendStatus(404);
    return;
  }

  res.set('Content-Type', 'image/png');
  tileCacheService.getTileAsStream(z, x, y).pipe(res);
}

export async function listTiles (req, res) {
  const tiles = await tileCacheService.listTiles();
  res.json(tiles);
}