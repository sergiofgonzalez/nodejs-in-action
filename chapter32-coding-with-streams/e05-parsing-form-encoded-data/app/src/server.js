import { createServer } from 'http';
import { getParsedFormData } from './lib/get-parsed-form-data.js';

const server = createServer((req, res) => {
  if (req.method === 'POST' && req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    getParsedFormData(req)
      .then((parsedFormData) => {
        console.log(`INFO: server: Correctly parsed form data:`, parsedFormData);
        res.writeHead('202', { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(parsedFormData));
      });
  }
});

server.listen(5000, () => console.log(`INFO: listening on http://localhost:5000`));