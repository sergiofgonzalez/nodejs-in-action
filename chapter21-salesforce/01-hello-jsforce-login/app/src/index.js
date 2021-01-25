'use strict';

const jsforce = require('jsforce');
const util = require('util');

util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;


// ## SessionId based connection ## 
// const conn = new jsforce.Connection({
//   serverUrl: 'https://demoxyz.my.salesforce.com',
//   sessionId: '<a valid session id>'
// });



const conn = new jsforce.Connection({
  loginUrl: 'https://demoxyz.my.salesforce.com'
});

conn.login('user@demoxyz.com', 'demoxyz.com!<token>', (err, data) => {
  if (err) {
    return console.log(err);
  }
  console.log(data);
  const soqlQuery = 'select Id, Name from Account';


  conn.query(soqlQuery, (err, result) => {
    if (err) {
      return console.log(`Error: ${ util.inspect(err) }`);
    }
    console.log(`result: ${ util.inspect(result) }`);
  });  
});




