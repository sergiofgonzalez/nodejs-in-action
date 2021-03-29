const { CheckUrls } = require('./lib/check-urls');


// eslint-disable-next-line no-unused-vars
exports.handler = async (event) => {

  const urls = process.env.WEBSITE_HEALTH_CHECK_URLS? JSON.parse(process.env.WEBSITE_HEALTH_CHECK_URLS) : [];

  const checkUrls = new CheckUrls(urls);

  const statuses  = [];
  for await (const status of checkUrls) {
    console.log(status);
    statuses.push(status);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(statuses)
  };

  return response;
};
