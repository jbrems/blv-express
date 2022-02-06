import * as hexService from './hex.service';

export async function createHexTile (req, res) {
  const { z, x, y } = req.params;

  try {
    console.log(`Serving hex tile for ${z} ${x} ${y}`);
    const tileStream = await hexService.createHexTile(parseInt(z), parseInt(x), parseInt(y));

    res.set('Content-Type', 'image/png');
    tileStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
