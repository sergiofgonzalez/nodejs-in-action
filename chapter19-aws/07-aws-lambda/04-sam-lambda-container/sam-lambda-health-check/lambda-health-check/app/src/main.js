const CheckUrls = require('./lib/check-urls.js');

// eslint-disable-next-line no-unused-vars
const lambdaHandler = async (event) => {
  const checkUrls = new CheckUrls([
    'https://nodejsdesignpatterns.com',
    'https://example.com',
    'https://this-web-does-not-exist.com'
  ]);

  const outputLines = [];
  for await (const status of checkUrls) {
    console.log(status);
    outputLines.push(status);
  }

  return outputLines.join('\n');
};

module.exports = { lambdaHandler };