const reqCache = new Map();


export const superagentCacheHandler = {
  get: (target, property) => {
    if (property === 'get') {
      /* proxied method */
      return function (url, ...args) {
        console.log(`INFO: superagentCacheHandler: get has been called:`, url, args);
        if (reqCache.has(url)) {
          console.log(`INFO: superagentCacheHandler: cache hit for ${ url }`);
          return new Promise((resolve) => {
            process.nextTick(() => resolve(reqCache.get(url)));
          });
        }

        return target.get(url, ...args)
          .then((res) => {
            console.log(`INFO: superagentCacheHandler: adding ${ url } to the cache`);
            reqCache.set(url, {
              text: res.text,
              body: res.body,
              header: res.header,
              type: res.type,
              status: res.status,
              statusType: res.statusType
            });
            return res;
          });
      };
    } else if (property === 'query') {
      /* proxied method */
      return function (param) {
        console.log(`INFO: superagentCacheHandler: ${ param }`);
      };

    }

    /* delegated methods and properties */
    return target[property];
  }
};