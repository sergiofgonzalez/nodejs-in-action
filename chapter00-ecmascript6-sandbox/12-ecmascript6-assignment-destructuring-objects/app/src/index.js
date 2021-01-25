"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;


/* Object Destructuring */
const character = {
  name: "Bruce Wayne",
  homeTown: "Gotham",
  pseudonym: "The Batman",
  metadata: {
    age: 34,
    gender: "male"
  },
  weapons: ["batarang", "gas pellet", "batcuffs", "bat-mobile control"]
};

/* 
  The effect of this syntax is not immediately evident,
  but it's just a shortcut for:
     const pseudonym = character.pseudonym;
*/
const { pseudonym } = character;
console.log(`pseudonym=${pseudonym}`);

const { name, homeTown } = character;
console.log(`homeTown=${homeTown}, name=${name}`);

/* you can also redeclared the variable name */
const { pseudonym: alias } = character;
console.log(`alias=${alias}`);

/* and they support deep nesting */
const { metadata: { gender } } = character;
console.log(`gender=${gender}`);

/* and redeclaring variable name in deep nested structures */
const { metadata: { age: characterAge } } = character;
console.log(`characterAge=${characterAge}`);

/* and you can provide default values for those cases where the value is undefined */
const { wearBoots = true } = character;
console.log(`character.wearBoots=${character.wearBoots}`);
console.log(`wearBoots=${wearBoots}`);

/* deep nested properties with default values */
const { metadata: { enemy = "none" } } = character;
console.log(`enemy=${enemy}`);

/* aliasing properties with default values */
const { boots: footwear = true } = character;
console.log(`footwear=${footwear}`);

