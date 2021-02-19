const CheckUrls = require('./lib/check-urls');

console.log('INFO: Loading function');

exports.handler = async () => {
  const checkUrls = new CheckUrls([
    'https://nodejsdesignpatterns.com',
    'https://example.com',
    'https://this-web-does-not-exist.com'
  ]);

  for await (const status of checkUrls) {
    console.log(status);
  }
};
