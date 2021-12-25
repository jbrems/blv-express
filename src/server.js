import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import express from 'express';
import { getTileRouter } from './tile/tile.routes';

const server = express();

server.get('/', (req, res) => {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  fs.createReadStream(path.join(currentDir, 'index.html')).pipe(res);
});

server.use('/tiles', getTileRouter());

const port = process.env.PORT || 3000;

console.log(`Starting server on port ${port}`);
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
