import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getContentPath(type: 'konsepter' | 'collections' = 'konsepter'): string {
  return path.join(__dirname, type);
}
