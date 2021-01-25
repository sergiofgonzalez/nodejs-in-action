import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';

/*
  ESM trick to reconstruct CommonJS `__dirname` value

  In ESM, you can get a reference to the current file URL
  using the special object `import.meta`.
  Specifically, `import.meta.url` will return a reference
  to the current module path in the format
  `file:///path/to/current_module.js`
  which can be used to reconstruct `__filename` and
  `__dirname`.
*/
const __dirname = dirname(fileURLToPath(import.meta.url));
export const db = new sqlite3.Database(join(__dirname, 'data.sqlite'));
