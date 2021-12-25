import * as tileService from './tile.service';

export async function getTile (req, res) {
  const { z, x, y } = req.params;
  
  try {
    console.log(`Serving tile for ${z} ${x} ${y}`);
    const tileStream = await tileService.getTile(z, x, y);

    res.set('Content-Type', 'image/png');
    tileStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
