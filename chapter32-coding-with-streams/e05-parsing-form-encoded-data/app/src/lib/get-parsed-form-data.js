import querystring from 'querystring';

export function getParsedFormData(req) {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST' || req.headers['content-type'] !== 'application/x-www-form-urlencoded') {
      return reject(new Error('Expected POST request with form data'));
    }

    let rawBodyData = '';
    req
      .on('data', (chunk) => {
        rawBodyData += chunk;
      })
      .on('end', () => {
        resolve(querystring.parse(rawBodyData));
      })
      .on('error', (err) => {
        console.error(`Could not read data from POST request body: ${ err.message }`);
        throw err;
      });
  });
}