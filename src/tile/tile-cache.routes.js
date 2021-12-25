import express from 'express';
import { serveCacheControl, getTile, listTiles } from './tile-cache.controller';

export function getTileCacheRouter () {
  const router = express.Router();

  router.route('/control')
    .get(serveCacheControl);

  router.route('/:z/:x/:y')
    .get(getTile);

  router.route('/')
    .get(listTiles);

  return router;
}
