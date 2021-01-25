"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

/*
  regular JavaScript structures have several probs:
  + there might be clashes with keys named `proto` or `toString`
  + iteration is awkward, having to use `Object(obj).keys.forEach
  + keys are limited to strings

  The first two points can more or less be solved using `Object.create(null)` and
  iterators, but the third one cannot be solved that easily.
*/

const tvShows = Object.create(null); // prevent created data structure from inheriting Object methods

// facilitate iteration
tvShows[Symbol.iterator] = () => {
  const keys = Object.keys(tvShows);
  return {
    next() {
      const done = keys.length === 0;
      const key = keys.shift();
      const value = [key, tvShows[key]];
      return { done, value };
    }
  };
};

function add(title, cast) {
  tvShows[title] = cast;
}

function get(title) {
  return tvShows[title];
}

add("BoJack Horseman", {
  "BoJack Horseman": "Will Arnett",
  "Dyane Nguyen": "Allison Brie",
  "Todd Chavez": "Aaron Paul"
});

add("Modern Family", {
  "Jay Pritchett": "Ed O'Neill",
  "Gloria Delgado-Pritchett": "Sofia Vergara",
  "Claire Dunphy": "Julie Bowen"
});

console.log(get("BoJack Horseman"));
console.log("============================");

for (const tvShow of tvShows) {
  console.log(tvShow);
}
console.log("============================");

/*
  ES6 maps
*/
const tvShowsMap = new Map();
tvShowsMap.set("BoJack Horseman", {
  "BoJack Horseman": "Will Arnett",
  "Dyane Nguyen": "Allison Brie",
  "Todd Chavez": "Aaron Paul"
});
tvShowsMap.set("Modern Family", {
  "Jay Pritchett": "Ed O'Neill",
  "Gloria Delgado-Pritchett": "Sofia Vergara",
  "Claire Dunphy": "Julie Bowen"
});

// You can iterate using spread operator
console.log([...tvShowsMap]);
console.log("============================");

// You can check if the map contains a certain key with has
console.log(tvShowsMap.has("BoJack Horseman"));
console.log("============================");

/*
  Maps don't cast keys the way traditional data structures do
*/

const ds = {
  1: "a"
};

console.log(ds["1"]);

const map = new Map();
map.set(1, "a");

console.log(map.has("1"));  // <- false
console.log(map.has(1));
console.log("============================");

/*
  Use delete to remove keys from the map
*/
tvShowsMap.delete("Modern Family");
console.log(tvShowsMap.get("Modern Family"));
console.log("============================");

/*
  You can delete all keys using clear
*/
tvShowsMap.clear();
console.log([...tvShowsMap]);
console.log("============================");

/*
  You can ask for the number of keys using size
*/
const nums = new Map();
nums.set(1, 2);
nums.set(3, 4);
nums.set(5, 6);
console.log([...nums]);
console.log(`nums.size=${ nums.size }`);

nums.clear();
console.log(`nums.size=${ nums.size }`);
console.log("============================");

/*
  You can create maps with arbitrary
  non-primitive keys
*/
const strangeMap = new Map();
strangeMap.set(new Date(), function today() {});
strangeMap.set(() => "key", {"key": "door"});
strangeMap.set(Symbol("items"), [1, 2]);

/*
  Maps are iterable
*/

for (const [key, value] of tvShows) {
  console.log(`key=${ key }, value=${ value }`);
}
console.log("============================");

/*
  You can copy a map by passing it to the constructor
*/
const numbers = new Map();
numbers.set("one", 1);
numbers.set("two", 2);
numbers.set("three", 3);
numbers.set("catorce", 14);

const copy = new Map(numbers);
console.log([...copy]);
console.log("============================");

/*
  Maps are like hash maps: setting a key
  that exists overwrite its value
*/
numbers.set("catorce", "fourteen");
console.log([...numbers]);
console.log("============================");

/*
  You can also iterate over the map's keys and values
  There's also an entries function that's equal to the map itself
*/
console.log([...numbers.keys()]);
console.log([...numbers.values()]);
console.log([...numbers.entries()]);
console.log([...numbers]);
console.log("============================");

/*
  Map also feature a convenient forEach
*/
numbers.forEach((key, value) => console.log(`${ key }=${ value }`));
console.log("============================");


/*
  WeakMaps are a subset of Map
  that only provide set, get, delete,
  and that:
  + requires keys to be objects
  + references to values are weakly held, meaning they can
    be garbage collected if there are no other references
    to them (apart from the one in the map)

  (Containment in the map is computed by reference)
*/
const friends = new WeakMap();
const peter = { name: "peter" };
friends.set(peter, {surname: "mullins", age: 42, hobbies: "fly kites"});

const susan = { name: "susan" };
friends.set(susan, {surname: "cray", age: 27, hobbies: "run marathons"});
console.log(friends.size);
console.log(friends.get(susan));
console.log(friends.has(peter));
console.log(friends.has({name: "peter"}));
console.log("============================");

/*
  You can initialize a map using this construct
*/
const engDict = new WeakMap([  // eslint-disable-line no-unused-vars
  [{num: "one"}, {es: "uno"}],
  [{num: "two"}, {es: "dos"}]]);


/*
  Sets are like arrays where ever element is distinct from each other
  + they're iterable
  + provide the has, keys, forEach, delete and clear method
  + provides the size property as well
*/
const set = new Set(["a", "b", "c"]);
console.log(set.size);
console.log([...set]);
console.log(set.has("b"));
set.add("d");
set.add("a");
for (const item of set) {
  console.log(item);
}

set.clear();
console.log([...set]);

/*
  WeakSets are like WeakMaps but with sets
  + you can only add, delete and has
  + only objects are allowed
*/
// eslint-disable-next-line no-unused-vars
const weakSet = new WeakSet([{letter:"a"}, new Date(), new Map()]);
