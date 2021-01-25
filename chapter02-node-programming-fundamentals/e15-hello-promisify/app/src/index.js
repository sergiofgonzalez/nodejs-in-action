"use strict";

const util = require("util");

const wait = (delay, callback) => {
  const id = setInterval(() => {
    const rand = Math.random();
    if (rand > 0.95) {
      callback(null, "Finished!");
      clearInterval(id);
    } else if (rand < 0.01) {
      callback("Timeout reached!", null);
      clearInterval(id);
    } else {
      console.log("waiting");
    }
  }, Number(delay));
};

const waitAsync = util.promisify(wait);

/* Regular Invocation
wait(1000, (err, data) => {
  if (err) {
    console.error(`wait responded with an error: ${ err }`);
  } else {
    console.log(`wait responded with a message: ${ data }`);
  }
});
*/

/* Using promises


waitAsync(100)
  .then(data => console.log(`wait responded with a message: ${ data }`))
  .catch(err => console.error(`wait responded with an error: ${ err }`));
*/

/* Using async/await */
(async () => {
  try {
    const data = await waitAsync(100);
    console.log(`wait responded with a message: ${ data }`);
  } catch (err) {
    console.error(`wait responded with an error: ${ err }`);
  }
})();

