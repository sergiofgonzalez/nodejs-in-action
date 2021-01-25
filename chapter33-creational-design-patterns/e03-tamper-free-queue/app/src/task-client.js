import http from 'http';

const options = {
  hostname: 'localhost',
  port: 5000,
  path: process.argv[2] ?? '/',
  method: 'GET',
  headers: {
    'x-task-id': process.argv[3] ?? -1
  }
};

console.log(`INFO: task-client: creating task request for http://${ options.hostname }:${ options.port }${ options.path }: taskID: ${ options.headers['x-task-id']}`);
const req = http.request(options, (res) => {
  console.log(`INFO: task-client: response received!`);
  console.log(`INFO: task-client: STATUS: ${ res.statusCode }`);
  console.log(`INFO: task-client: HEADERS: ${ JSON.stringify(res.headers) }`);
  res.setEncoding('utf-8');
  res.pipe(process.stdout);
});

req.on('error', err => {
  console.log(`ERROR: task-client: problem sending request: ${ err.message }`);
});

console.log(`INFO: task-client: sending request`);
req.end();
