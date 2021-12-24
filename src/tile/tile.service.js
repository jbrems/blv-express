import fetch from 'node-fetch';

export async function fetchTile (z, x, y) {
  const tileUrl = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  console.log(`Fetching tile from ${tileUrl}`);
  const response = await fetch(tileUrl);
  return response.body;
}
