"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;


/* case 1: assigning default values in function params */
function powerOf(base, exp = 2) {
  return Math.pow(base, exp);
}
console.log(`powerOf(7)=${powerOf(7)}`);

// also in arrow functions
const doubleIt = (val = 0) => val * 2;
console.log(`doubleIt()=${doubleIt()}`);
console.log(`doubleIt(5)=${doubleIt(5)}`);

// and it's not restricted to last param
function sumOf(a = 1, b = 2, c = 3) {
  return a + b + c;
}
console.log(`sumOf(5, undefined, 5)=${sumOf(5, undefined, 5)}`);

/* case 2: assigning a default options object to a function */
function carFactory(options = { brand: "vw", year: 1999}) {
  console.log(`brand=${options.brand}; year=${options.year}`);
}

carFactory();
carFactory({brand: "gm"}); // we lose the default for year

// this is a better approach
function betterCarFactory({brand = "vw", year = "1990"} = {}) {
  console.log(`brand=${brand}; year=${year}`);
}
betterCarFactory();
betterCarFactory({brand: "gm"}); // we lose the default for year

/* case 3: describing the shape of objects a function can handle */
const plane = {
  owner: {
    id: "f32be0f680cd",
    name: "Akeem Olajuwon"
  },
  brand: "Cessna",
  make: "2017",
  model: "Skylight",
  preferences: {
    gps: true,
    defrost: true
  }
};

const getPlaneProductModel = ({brand, make, model}) => ({
  sku: `${brand}:${make}:${model}`,
  brand,
  make,
  model
});

console.log(getPlaneProductModel(plane));