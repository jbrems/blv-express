import fetch from 'node-fetch';
import * as tileCacheService from './tile-cache.service';

export async function getTile (z, x, y) {
  console.log(`Getting tile for ${z} ${x} ${y}`);

  if (tileCacheService.hasTile(z, x, y)) {
    console.log('Cache hit');
    return tileCacheService.getTileAsStream(z, x, y);
  }

  console.log('Cache miss');
  const tile = await fetchTile(z, x, y);

  tileCacheService.storeTile(z, x, y, tile);

  return tile;
}

async function fetchTile (z, x, y) {
  const tileUrl = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  console.log(`Fetching tile from ${tileUrl}`);
  const response = await fetch(tileUrl);

  if (!response.ok) throw new Error(`Failed to fetch tile from ${tileUrl}`);

  return response.body;
}