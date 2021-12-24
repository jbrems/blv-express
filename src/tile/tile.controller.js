import { fetchTile } from './tile.service';

export async function getTile (req, res) {
  const { z, x, y } = req.params;
  console.log(`Getting tile for ${z} ${x} ${y}`);
  const tileStream = await fetchTile(z, x, y);
  tileStream.pipe(res);
}
