import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


console.log(`__filename:`, __filename);
console.log(`__dirname:`, __dirname);

// eslint-disable-next-line no-unused-vars
const require = createRequire(import.meta.url);


