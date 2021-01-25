import http from 'http';

const postData = Buffer.from('Hello to Jason Isaacs!', 'utf-8');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/path/to/url',
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log(`INFO: request-client: creating request object for http://${ options.hostname }:${ options.port }${ options.path }`);
const req = http.request(options, (res) => {
  console.log(`INFO: request-client: Response received!`);
  console.log(`INFO: request-client: STATUS: ${ res.statusCode }`);
  console.log(`INFO: request-client: HEADERS: ${ JSON.stringify(res.headers) }`);
  res.setEncoding('utf-8');
  res.pipe(process.stdout);
});

req.on('error', err => {
  console.log(`ERROR: request-client: problem sending request: ${ err.message }`);
});

if (postData) {
  console.log(`INFO: request-client: streaming data`);
  req.write(postData);
}

console.log(`INFO: request-client: finalizing request`);
req.end();
