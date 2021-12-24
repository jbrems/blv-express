import express from 'express';
import { getTileRouter } from './tile/tile.routes';

const server = express();

server.get('/', (req, res) => {
  res.send('Hello from the Blaasveld.net express server!');
});

server.use('/tile', getTileRouter());

const port = process.env.PORT || 3000;

console.log(`Starting server on port ${port}`);
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
