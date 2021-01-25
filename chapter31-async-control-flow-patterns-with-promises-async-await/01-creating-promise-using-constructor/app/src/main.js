/* eslint-disable no-unused-vars */

function delay(millis) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date());
    }, millis);
  });
}

console.log(`Delaying...${ new Date().getSeconds() }`);
delay(1000)
  .then(newDate => {
    console.log(`Done: ${ newDate.getSeconds() }`);
  });