import { PNG } from 'pngjs';
import * as tileService from './tile.service';

const TILE_SIZE = 256;

export async function createHexTile (z, x, y) {
  if (x % 2 === 0) return mergeTiles(z, x, y, 3, 1);
  return mergeTiles(z, x, y, 3, 2);
}

async function mergeTiles (z, x, y, cols, rows) {
  const hexTile = new PNG({ width: TILE_SIZE * cols, height: TILE_SIZE * rows });

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const tile = await tileService.getTile(z, x + col, y + row);
      await appendTile(tile, hexTile, col, row);
    }
  }

  fadeHexagon(hexTile);

  return hexTile.pack();
}

async function appendTile (tile, dest, col, row) {
  return new Promise((resolve, reject) => {
    tile.pipe(new PNG()).on('parsed', function () {
      console.log(`Tile parsed of size ${this.width} x ${this.height}`);
      this.bitblt(dest, 0, 0, TILE_SIZE, TILE_SIZE, TILE_SIZE * col, TILE_SIZE * row);
      resolve(this);
    }).on('error', reject);
  });
}

function fadeHexagon (tile) {
  for (let row = 0; row < tile.height; row++) {
    for (let col = 0; col < tile.width; col++) {
      const opacityIndex = (tile.width * row + col) * 4 + 3;
      // TODO: clean up
      if (tile.height === 256 && row < 128 && col < 256 + 54 - row * 0.8453125) tile.data[opacityIndex] = 0;
      if (tile.height === 256 && row >= 128 && col < 256 - 54 + (row - 128) * 0.8453125) tile.data[opacityIndex] = 0;
      if (tile.height === 256 && row < 128 && col > 256 + 54 + 148 + row * 0.8453125) tile.data[opacityIndex] = 0;
      if (tile.height === 256 && row >= 128 && col > 256 + 256 + 54 - (row - 128) * 0.8453125) tile.data[opacityIndex] = 0;

      if (tile.height === 512 && row < 256 && col < 256 + 54 - (row - 128) * 0.8453125) tile.data[opacityIndex] = 0;
      if (tile.height === 512 && row >= 256 && col < 256 - 54 + (row - 256) * 0.8453125) tile.data[opacityIndex] = 0;
      if (tile.height === 512 && row < 256 && col > 256 + 54 + 148 + (row - 128) * 0.8453125) tile.data[opacityIndex] = 0;
      if (tile.height === 512 && row >= 256 && col > 256 + 256 + 54 - (row - 256) * 0.8453125) tile.data[opacityIndex] = 0;
      if (tile.height === 512 && row < 128) tile.data[opacityIndex] = 0;
      if (tile.height === 512 && row >= 265 + 128) tile.data[opacityIndex] = 0;
    }
  }
}
