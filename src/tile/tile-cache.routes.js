import express from 'express';
import { serveCacheControl, getTile, deleteTile, listTiles, deleteTiles } from './tile-cache.controller';

export function getTileCacheRouter () {
  const router = express.Router();

  router.route('/control')
    .get(serveCacheControl);
  
  router.route('/:z/:x/:y')
    .get(getTile)
    .delete(deleteTile);

  router.route('/')
    .get(listTiles)
    .delete(deleteTiles);

  return router;
}
