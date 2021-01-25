import { RequestBuilder } from './lib/request-builder.js';

const messageData = Buffer.from('Hello to Jason Isaacs!', 'utf-8');

async function main() {
  const res = await new RequestBuilder()
    .setHostname('localhost')
    .setPort(5000)
    .setRequestPath('/path/to/url')
    .setQueryString('?page=12#results')
    .setHttpMethod('GET')
    .setHeaders({ 'Content-Type': 'text/plain', 'Content-Length': Buffer.byteLength(messageData) })
    .setBody(messageData)
    .invoke();

  res.pipe(process.stdout);
}

main()
  .then(() => console.log(`INFO: request-client: Request completed!`))
  .catch((err) => console.error(`ERROR: request-client: problem sending request: ${ err.message }`));
