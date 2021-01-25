"use strict";

const util = require("util");

/* old style prototype classes */
function Rabbit(type) {
  this.type = type;
}

Rabbit.prototype.speak = function (line) {
  console.log("The " + this.type + " rabbit says '" + line + "'");
};

Rabbit.prototype.teeth = "small";

var killerRabbit = new Rabbit("killer");
killerRabbit.teeth = "long, sharp and bloody";


var blackRabbit = new Rabbit("black");

killerRabbit.speak("kill, kill, kill");
blackRabbit.speak("Hello, world!");

console.log(killerRabbit.teeth);

// Using EcmaScript 6 classes

class GuineaPig {

  constructor(type) {
    this.type = type;
    this.teethSize = "medium";
    GuineaPig.numInstances++; /* static variable */
  }

  /*
    Setters and Getters allows for extra logic to be  added when giving or
    retrieving values to/from properties, but all properties will be exposed
    whether or not setters/getters are defined (i.e. teethSize will also be
    available from client code)
  */
  get teeth() {
    return this.teethSize;
  }

  set teeth(size) {
    this.teethSize = size;
  }

  speak(line) {
    console.log("The " + this.type + " guinea pig says '" + line + "'");
  }
}

GuineaPig.numInstances = 0; // this is ridiculous, but i don't seem to find a way to initialize the static var from inside the class

var myGuineaPig = new GuineaPig("yellow");
myGuineaPig.speak("woof, woof");

myGuineaPig.teeth = "teeny-weeny";
console.log(myGuineaPig.teeth);
console.log(myGuineaPig.type);
console.log(GuineaPig.numInstances);
console.log("===========================================");


/* A more comprehensive example */
class Fruit {
  constructor(name, calories) {
    this.name = name;
    this.calories = calories;
    this.pieces = 1;
  }

  chop() {
    this.pieces++;
  }

  bite(person) {
    if (this.pieces < 1) {
      return;
    }
    const calories = this.calories / this.pieces;
    person.satiety += calories;
    this.calories -= calories;
    this.pieces--;
  }
}

// classes can be declared as expressions
const Person = class {
  constructor(name) {
    this.name = name;
    this.satiety = 0;
  }
};

const person = new Person("a someone");

const apple = new Fruit("apple", 140);

// chop three times so that the apple has 4 pieces
apple.chop();
apple.chop();
apple.chop();

// person gives three bites
apple.bite(person);
apple.bite(person);
apple.bite(person);

console.log(`person.satiety=${ person.satiety }`);
console.log(`apple.pieces=${ apple.pieces }`);
console.log(`apple.calories=${ apple.calories }`);



// classes as expressions are ideal to create factories
// Functions that return classes
const personFactory = name => class extends Person {
  constructor() {
    super(name);
  }
};

const JakePersons = personFactory("Jake");
const aJake = new JakePersons();
console.log(`aJake.name=${ aJake.name }`);

/* Setters and Getters */

// Note that the property cannot be called age
// because the setter would cause infinite recursion
class Kid {
  constructor() {
    this.ageValue = undefined;
  }

  get age() {
    return this.ageValue;
  }

  set age(age) {
    this.ageValue = age;
  }
}

const myKid = new Kid();
myKid.age = 8;
console.log(`myKid.age=${ myKid.age }`);

/* ES6 static methods */
class MathHelper {
  static getNextRandomInt({minInclusive = 0, maxExclusive = 100} = {}) {
    return Math.floor(Math.random() * (maxExclusive - minInclusive) + minInclusive);
  }
}

console.log(`nextRandomInt=${ MathHelper.getNextRandomInt({minInclusive: 1, maxExclusive: 7}) }`);

/* You can also declare static properties, but maybe you're better off using plain JavaScript */
let NUM_INSTANCES = 0;
class Foo {

  constructor(name) {
    this.name = name;
    NUM_INSTANCES++;
  }

  static get numInstances() {
    return NUM_INSTANCES;
  }
}


new Foo();
new Foo();
new Foo();
console.log(`instance.numInstances=${ Foo.numInstances }`);

/* new syntax for class inheritance */
class Banana extends Fruit {
  constructor() {
    super("banana", 105);
  }

  slice() {
    this.pieces = 12;
  }
}

const banana = new Banana();
console.log(`banana.pieces=${ banana.pieces }`);
banana.slice();
console.log(`banana.pieces=${ banana.pieces }`);

/* any expression that returns a constructor function can be fed to extends */
const createJuicyFruit = (...params) => class JuicyFruit extends Fruit {
  constructor() {
    super(...params);
    this.juice = 0;
  }

  squeeze() {
    if (this.calories <= 0) {
      return;
    }
    this.calories -= 10;
    this.juice += 3;
  }
};
class Plum extends createJuicyFruit("plum", 30) {
}

const plum = new Plum();
console.log(`plum.calories=${ plum.calories }`);

/* before ES6 you had to either go with Object.create or Node's util.inherits */
function Vehicle(name, numWheels) {
  this.name = name;
  this.numWheels = numWheels;
}

Vehicle.prototype.driveTo = function(where) {
  console.log(`driving to ${ where }`);
};


function Car() {
  Vehicle.call(this, "car", 4);  // No super!
}

Car.prototype = Object.create(Vehicle.prototype); // No extends!

const car = new Car();
console.log(`car.numWheels=${ car.numWheels }`);
car.driveTo("San Jose, CA");

function Bike() {
  Vehicle.call(this, "bike", 2);
}

util.inherits(Bike, Vehicle); // Node's way for inherits
Bike.prototype.doWheelie = function () {
  console.log(`Look ma! I'm on one wheel!`);
};

const bike = new Bike();
bike.driveTo("Santa Monica, CA");
bike.doWheelie();