import { createRabbit } from './lib/rabbit.js';
import { Person } from './lib/person.js';
import { Car } from './lib/car.js';
import { Countdown } from './lib/countdown.js';
import { Container } from './lib/container.js';

function encapsulationWithClosures() {
  const whiteRabbit = createRabbit();
  whiteRabbit.setType('white');
  whiteRabbit.setTeeth('small');
  whiteRabbit.speak('Hello, there!');

  // Nothing prevents the consumer from adding properties but those
  // won't override the ones defined in the object
  const killerRabbit = createRabbit();
  killerRabbit.type = 'killer';
  killerRabbit.teeth = 'long, sharp and bloody';
  killerRabbit.speak('screeeeeeech!');
  // killerRabbit.scream('yikeeeeeees'); // killerRabbit.scream() is not a function
  killerRabbit.setType('killer');
  killerRabbit.speak('screeeeeeech!');
}

function encapsulationWithPrivateFieldsAndMethods() {
  const me = new Person('sergio');
  me.age = 47;
  console.log(me.toString());
  console.log(`I was born on ${ me.birthyear }`);
  // me.setBirthyear(); // not a function
  // me.#setBirthyear(); // private gield must be declared in enclosing class
}

function encapsulationWithWeakMaps() {
  const dreamCar = new Car('Mercedes', 'A-class', 2005);
  console.log(dreamCar.toString());
}

function encapsulationWithSymbols() {
  const symbol1 = Symbol();
  const symbol2 = Symbol('foo');
  const symbol3 = Symbol('foo');
  console.log(symbol2 == symbol3);
  console.log(Symbol('foo') === Symbol('foo'));
  console.log(symbol1);
  console.log(symbol2);
  console.log(symbol3);
  console.log(symbol3.description);

  console.log(Symbol.for('tokenString'));
  console.log(Symbol.keyFor(Symbol.for('tokenString')));

  // now the encapsulation part
  const countdown = new Countdown(3, () => console.log('done!'));
  countdown.dec();
  countdown.dec();
  countdown.dec();
  console.log(countdown.counterSymbol); // nope
  //console.log(countdown[counterSymbol]); // nope
  console.log(countdown.counter);

  // However, not completely bulletproof:
  const [ counterSymbol ] = Reflect.ownKeys(countdown);
  console.log(countdown[counterSymbol]++);
  console.log(countdown.counter);
}

function encapsulationWithOldSchoolObjects() {
  const container = new Container('hello');
  console.log(container.toString());

  const result = container.service('foo');
  console.log(result);
  const result2 = container.use('bar');
  console.log(result2);
}

encapsulationWithClosures();
encapsulationWithPrivateFieldsAndMethods();
encapsulationWithWeakMaps();
encapsulationWithSymbols();
encapsulationWithOldSchoolObjects();
