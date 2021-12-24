import { fetchTile } from './tile.service';

export async function getTile (req, res) {
  const { z, x, y } = req.params;
  
  try {
    console.log(`Getting tile for ${z} ${x} ${y}`);
    const tileStream = await fetchTile(z, x, y);

    res.set('Content-Type', 'image/png');
    tileStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
