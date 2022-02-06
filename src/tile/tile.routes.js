import express from 'express';
import { getHexRouter } from './hex.routes';
import { getTileCacheRouter } from './tile-cache.routes';
import { getTile } from './tile.controller';

export function getTileRouter () {
  const router = express.Router();

  router.use('/cache', getTileCacheRouter());

  router.use('/hex', getHexRouter());

  router.route('/:z/:x/:y')
    .get(getTile);

  return router;
}
