import fetch from 'node-fetch';

export async function fetchTile (z, x, y) {
  const tileUrl = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  console.log(`Fetching tile from ${tileUrl}`);
  const response = await fetch(tileUrl);

  if (!response.ok) throw new Error(`Failed to fetch tile from ${tileUrl}`);

  return response.body;
}
