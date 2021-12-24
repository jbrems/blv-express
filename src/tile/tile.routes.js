import express from 'express';
import { getTile } from './tile.controller';

export function getTileRouter () {
  const router = express.Router();

  router.route('/:z/:x/:y')
    .get(getTile);

  return router;
}
