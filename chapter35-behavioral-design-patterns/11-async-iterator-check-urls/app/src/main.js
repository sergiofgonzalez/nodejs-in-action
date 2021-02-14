import { CheckUrls } from './lib/check-urls.js';

async function main() {
  const checkUrls = new CheckUrls([
    'https://nodejsdesignpatterns.com',
    'https://example.com',
    'https://this-web-does-not-exist.com'
  ]);

  for await (const status of checkUrls) {
    console.log(status);
  }
}

main()
  .then(() => console.log(`done!`))
  .catch((err) => console.error(`Error: ${ err.message }`));
  