import express from 'express';
import { getTileCacheRouter } from './tile-cache.routes';
import { getTile } from './tile.controller';

export function getTileRouter () {
  const router = express.Router();

  router.use('/cache', getTileCacheRouter());

  router.route('/:z/:x/:y')
    .get(getTile);

  return router;
}
