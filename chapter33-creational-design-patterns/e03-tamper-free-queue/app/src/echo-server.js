import http from 'http';

const server = http.createServer((req, res) => {
  let requestBody = '';
  req
    .on('data', (chunk) => {
      console.log(`INFO: echo-server: chunk received: ${ req.url }: ${ chunk.length } bytes`);
      requestBody += chunk.toString();
    })
    .on('end', () => {
      console.log(`INFO: echo-server: request body for ${ req.url }: processed`);
      const responseBody = `echo:
        requested method=${ req.method }
        requested URL=${ req.url }
        *parsed* headers=${ JSON.stringify(req.headers) }
        body=${ requestBody ?? '(empty)' }\n`;
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(responseBody)
      });
      res.end(responseBody);
    });
});

server.listen(5000, () => {
  console.log(`INFO: echo-server: listening on port 5000`);
});