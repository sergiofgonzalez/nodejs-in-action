const { handler } = require('./index');



async function main() {

  const urls = [
    'https://nodejsdesignpatterns.com',
    'https://www.example.com',
    'https://this-web-does-not-exist.com'
  ];
  process.env.WEBSITE_HEALTH_CHECK_URLS=JSON.stringify(urls);

  console.log(`WEBSITE_HEALTH_CHECK_URLS=`, process.env.WEBSITE_HEALTH_CHECK_URLS);

  const result = await handler();
  console.log(`handler execution result: `, result);
}

main()
  .then(() => console.log(`done!`))
  .catch((err) => console.error(`Error: ${ err.message }`));
