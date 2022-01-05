import express from 'express';
import { getTile, deleteTile, listTiles, deleteTiles } from './tile-cache.controller';

export function getTileCacheRouter () {
  const router = express.Router();

  router.route('/:z/:x/:y')
    .get(getTile)
    .delete(deleteTile);

  router.route('/')
    .get(listTiles)
    .delete(deleteTiles);

  return router;
}
