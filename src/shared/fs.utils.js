import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export function getPath (pathFromSrc) {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  return path.join(currentDir, '/..', pathFromSrc);
}
