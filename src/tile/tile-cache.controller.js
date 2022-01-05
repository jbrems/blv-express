import * as tileCacheService from './tile-cache.service';

export function getTile (req, res) {
  const { z, x, y } = req.params;

  if (!tileCacheService.hasTile(z, x, y)) {
    res.sendStatus(404);
    return;
  }

  res.set('Content-Type', 'image/png');
  tileCacheService.getTileAsStream(z, x, y).pipe(res);
}

export async function deleteTile (req, res) {
  const { z, x, y} = req.params;

  if (!tileCacheService.hasTile(z, x, y)) {
    res.sendStatus(404);
    return;
  }

  await tileCacheService.deleteTile(z, x, y);
  res.sendStatus(204);
}

export async function listTiles (req, res) {
  const tiles = await tileCacheService.listTiles();
  res.json(tiles);
}

export async function deleteTiles (req, res) {
  await tileCacheService.deleteTiles();
  res.sendStatus(204);
}
