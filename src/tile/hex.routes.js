import express from 'express';
import * as hexController from './hex.controller';

export function getHexRouter () {
  const router = express.Router();

  router.route('/:z/:x/:y')
    .get(hexController.createHexTile);

  return router;
}
