import fs from 'fs';
import express from 'express';
import { getPath } from './shared/fs.utils';
import { getTileRouter } from './tile/tile.routes';

const server = express();

server.get('/', (req, res) => {
  fs.createReadStream(getPath('/index.html')).pipe(res);
});

server.use('/tiles', getTileRouter());

const port = process.env.PORT || 3000;

console.log(`Starting server on port ${port}`);
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
