import superagent from 'superagent';
import { superagentCacheHandler } from './lib/superagent-cache-handler.js';
import util from 'util';

async function main() {
  const superagentCachingProxy = new Proxy(superagent, superagentCacheHandler);

  /* first call submits the request */
  const res = await superagentCachingProxy
    .get('https://example.com');
  console.log(`STATUS: ${ res.status }`);
  console.log(`HEADERS: ${ util.inspect(res.header) }`);
  console.log(`BODY: ${ res.text.slice(0, 50) }`);

  /* second call, gets it from the cache */
  const cachedRes = await superagentCachingProxy
    .get('https://example.com');
  console.log(`STATUS: ${ cachedRes.status }`);
  console.log(`HEADERS: ${ util.inspect(cachedRes.header) }`);
  console.log(`BODY: ${ cachedRes.text.slice(0, 50) }`);
}

main()
  .then(() => console.log('done!'))
  .catch((err) => console.error(`ERROR: ${ err.message }`));
