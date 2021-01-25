"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

/*
  Shorthand notation and object destructuring
*/
function objectDestructuring() {
  const unitPrice = 1.25;
  const tomato = {
    name: "Tomato",
    color: "red",
    unitPrice       // no need to use `unitPrice: unitPrice when the name matches`
  };
  console.log(tomato);

  function getGroceryModel({name, unitPrice}, units) {  // nice way to specify that i need an object with name and unitPrice
    return {
      name,
      unitPrice,
      units,
      totalPrice: unitPrice * units
    };
  }

  console.log(getGroceryModel(tomato, 4));
  const { name, totalPrice } = getGroceryModel(tomato, 4); // nice way to specify const totalPrice = {}.totalPrice
  console.log(`${ name }: $${ totalPrice }`);


  // object destructuring with arrays is also cool!
  const [, item2, item3] = ["first", "second", "third"];
  console.log(item2, item3);

  console.log("==================");
}
objectDestructuring();