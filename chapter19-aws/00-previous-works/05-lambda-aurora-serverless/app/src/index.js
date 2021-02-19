const createMySqlClient = require('serverless-mysql');

console.log('INFO: Loading function');

const config = {
  host: process.env.ENDPOINT,
  database: process.env.DATABASE,
  user: process.env.USERNAME,
  password: process.env.PASSWORD
};

console.log('INFO: Creating client to connect to ${ config.host }');
const mysqlClient = createMySqlClient({ config });

exports.handler = async () => {
  console.log('INFO: handler: Accessing Aurora Serverless');
  console.log(`INFO: handler: Creating client to connect to host=${ config.host }, database=${ config.database }, username=${ config.user }`);

  try {
    const results = await mysqlClient.query(`SELECT * FROM irgnoiddairds01.delete_me`);
    return results;
  } catch (err) {
    console.log(`ERROR: handler: could not process query: ${ err.message }`);
  } finally {
    await mysqlClient.end();
  }
};
