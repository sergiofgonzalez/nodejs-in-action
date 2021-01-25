"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

/*
  This doesn't produce the expected results
*/
async function scenario1() {    // eslint-disable-line no-unused-vars
  const nums = [1, 2, 3, 4, 5];
  
  
  async function processArray(array) {
    const results = [];
    array.forEach(async item => {
      const processedItem = await asyncOperation(item); // this does not block
      results.push(processedItem);
    });
    return results;
  }
  
  async function asyncOperation(item) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`Asynchronously processing item ${ item }`);
        resolve(item + 1);
      }, 1000);
    });
  }
  
  console.log(`before processing = ${ nums }`);
  const processedNums = await processArray(nums);  // This does not block
  console.log(`after processing  = ${ processedNums }`);
  console.log(`===========================\n`);
}

/*
  Processing in sequence using for of: produce the expected results
*/
async function scenario2() {  // eslint-disable-line no-unused-vars
  console.log(`Scenario2: Sequential Scenario using for..of`);
  const nums = [1, 2, 3, 4, 5];
  
  
  async function processArray(array) {
    const results = [];
    for (const item of array) {
      const processedItem = await asyncOperation(item); // using for of results in blocking
      results.push(processedItem);
    }
    return results;
  }
  
  async function asyncOperation(item) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`Asynchronously processing item ${ item }`);
        resolve(item + 1);
      }, 1000);
    });
  }
  
  console.log(`before processing = ${ nums }`);
  const processedNums = await processArray(nums);  // This does not block
  console.log(`after processing  = ${ processedNums }`);
  console.log(`===========================\n`);  
}


/*
  Processing in Parallel
*/
async function scenario3() { // eslint-disable-line no-unused-vars
  console.log(`Scenario 3: Parallel Processing`);
  const nums = [1, 2, 3, 4, 5];
  
  
  async function processArray(array) {
    const promises = array.map(item => asyncOperation(item));
    const results = await Promise.all(promises);
    return results;
  }
  
  async function asyncOperation(item) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`Asynchronously processing item ${ item }`);
        resolve(item + 1);
      }, 1000);
    });
  }
  
  console.log(`before processing = ${ nums }`);
  const processedNums = await processArray(nums);  // This does not block
  console.log(`after processing  = ${ processedNums }`);  
  console.log(`===========================\n`);  
}

//scenario1(); // this doesn't produce the expected results, because await inside forEach is not blocking

(async () => {
  await scenario2();
  await scenario3();
})();



