"use strict";

/*
  Uncomment/Comment to test separately
*/


/*
  Scenario 1:
  getting the results separately
*/

/*
fetch("/products")
  .then(data =>  JSON.parse(data))
  .then(products => {products.forEach((item) => console.log(`product: ${item.id} - ${item.name}`));});

fetch("/prices")
  .then(data =>  JSON.parse(data))
  .then(prices => {prices.forEach((item) => console.log(`price: ${item.id} - ${item.price}`));});
*/

/* 
  Scenario 2: 
  getting the results in parallel using Promise.all 
*/

/*
Promise
  .all([
    fetch("/products")
      .then(JSON.parse), 
    fetch("/prices")
      .then(JSON.parse)])
  .then(results => { 
    const products = results[0];
    const prices = results[1];
    products.forEach((product) => {
      console.log(`${product.id} - ${product.name} - $${prices[product.id].price}`);
    });
  });
*/


/* Scenario 3:
  Getting results in parallel but using parameter destructuring to improve the ugliness 
  of using indices in the result array
*/

/*
Promise
  .all([
    fetch("/products")
      .then(data => {
        console.log("Products already available");
        return data;
      })
      .then(JSON.parse), 
    fetch("/prices")
      .then(data => {
        console.log("Prices already available");
        return data;
      })
      .then(JSON.parse)])
  .then(([products, prices]) => {
    console.log("Products and Prices are available!!!"); 
    products.forEach((product) => {
      console.log(`${product.id} - ${product.name} - $${prices[product.id].price}`);
    });
  });
*/

/*
  Scenario 4: 
  Using Promise.race which resolves the promises as soon as one
  of the promises are resolved
*/

/*
Promise
  .race([
    fetch("/products")
      .then(data => {
        console.log("Products already available");
        return data;
      })
      .then(JSON.parse), 
    fetch("/products-2")
      .then(data => {
        console.log("Products-2 already available");
        return data;
      })
      .then(JSON.parse)])
  .then((products) => {
    products.forEach((product) => {
      console.log(`${product.id} - ${product.name}`);
    });
  });
*/

/*
  Scenario 5: 
  Using Promise.race is useful to timeout Promises out of our control
*/
function timeout(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      reject("timeout");
    }, delay);
  });
}


Promise
  .race([
    timeout(5000), 
    fetch("/products-2")
      .then(data => {
        console.log("Products-2 already available");
        return data;
      })
      .then(JSON.parse)])
  .then(products => {
    products.forEach((product) => {
      console.log(`${product.id} - ${product.name}`);
    });
  })
  .catch(err => console.log(`error: ${err}`));


/* Simulate db access that returns a promise */
function fetch(key) {
  if (key === "/products") {
    return new Promise(resolve => {
      setTimeout(function () {
        resolve(`[{"id": 0, "name": "Product #1"}, {"id": 1, "name": "Product #2"}]`);
      }, 2500);
    });
  } else if (key === "/prices") {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`[{"id": 0, "price": 12.34}, {"id": 1, "price": 23.45}]`);
      }, 1500);
    });
  } else if (key === "/products-2") {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`[{"id": 0, "price": 12.34}, {"id": 1, "price": 23.45}]`);
      }, 15000);
    });    
  }
}

console.log("No more sync code to run!!!");