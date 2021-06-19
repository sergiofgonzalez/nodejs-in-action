import { createServer } from 'http';
import { promises as fsPromises } from 'fs';

const server = createServer(async (req, res) => {
  console.log(`INFO: ${req.method} ${req.url}`);
  if (req.method === 'GET' && req.url === '/' && req.headers['accept']?.includes('text/html')) {
    console.log(`INFO: serving index.html`);
    res.writeHead(200, { 'Content-Type': 'text/html'});
    const contents = await fsPromises.readFile('./app/src/public/index.html', 'utf8');
    res.end(contents);
  } else if (req.method === 'GET' && req.url === '/public/js/global-logger.js') {
    console.log(`INFO: serving transpiled JS global-logger.js`);
    res.writeHead(200, { 'Content-Type': 'text/javascript'});
    const contents = await fsPromises.readFile('./dist/public/ts/global-logger.js', 'utf8');
    res.end(contents);
  } else if (req.method === 'GET' && req.url === '/public/js/global-logger.js.map') {
    console.log(`INFO: serving source map for JS global-logger.js`);
    res.writeHead(200, { 'Content-Type': 'application/json'});
    const contents = await fsPromises.readFile('./dist/public/ts/global-logger.js.map', 'utf8');
    res.end(contents);
  } else if (req.method === 'GET' && req.url === '/favicon.ico') {
    console.log(`INFO: serving favicon.ico`);
    res.writeHead(200, { 'Content-Type': 'image/x-icon'});
    const contents = await fsPromises.readFile('./app/src/public/icons/favicon.ico', 'binary');
    res.end(contents);
  } else {
    console.log(`ERROR: unexpected URL in request: ${req.url}: returning 400`);
    res.writeHead(400);
    res.end();
  }
});

server.listen(5000, () => console.log(`INFO: listening on http://localhost:5000`));
