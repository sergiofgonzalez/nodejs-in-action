import express, { Request, Response } from 'express';
import { promises as fsPromises } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT ?? 8080;
/* trick to get __dirname working when using ESM */
const __dirname = dirname(fileURLToPath(import.meta.url));
const filename = join(__dirname, '..', 'names.txt');

const app = express();

app.get('/', async (req: Request, res: Response) => {
  const { name } = req.query;
  if (name) {
    console.log(`INFO: appending ${ name } to ${ filename }`);
    await fsPromises.appendFile(filename, `${ name }\n`);
  }

  res.send(`Hello, ${ name ?? 'world'}!`);
});

app.listen(PORT, () => console.log(`INFO: server listening on ${ PORT }`));
