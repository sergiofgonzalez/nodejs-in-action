/* Conditional types */
console.log(`=== implementing a custom type guard with conditional types`);
type NotNull<T> = T extends null | undefined ? never : T;

function isNotNull<T>(x: T): x is NotNull<T> {
  return x !== null && x !== undefined;
}

const items = [1, 2, null, 3, undefined, 4];

const nonNullItems = items.filter(isNotNull);
console.log(items);
console.log(nonNullItems);

/* There's already a built-in type for that anyways */

function isNotNullable<T>(x: T): x is NonNullable<T> {
  return x !== null && x !== undefined;
}

console.log(items.filter(isNotNullable));


/* type guards */
console.log(`\n=== understanding type guards and type predicates`);
interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}


function getSmallPet(): Fish | Bird {
  const randomBoolean = Math.random() < 0.5;
  if (randomBoolean) {
    return {
      swim: () => { console.log(`swim()`); }
    };
  } else {
    return {
      fly: () => { console.log(`swim()`); }
    };
  }
}

const pet = getSmallPet();
if ('swim' in pet) {
  console.log(`It is a fish!`);
} else if ('fly' in pet) {
  console.log(`It is a bird!`);
} else {
  console.log(`It is a gremlin!`);
}

// type-guards provide a much cleaner approach:
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

// and we can use the type predicate as an argument for filter functions
const pets: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet(), getSmallPet(), getSmallPet()];
const fishPets: Fish[] = pets.filter(isFish);
const birdPets: Bird[] = pets.filter((pet): pet is Bird => !isFish(pet));

console.log(fishPets);
console.log(birdPets);

console.log(`\n=== unboxing an array element with infer`);
/* infer: inferring a type from another type */
interface Person {
  name: string;
  age: number;
}

type Team = Array<Person>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ArrayItem<T extends any[]> = T extends Array<infer U> ? U : never;
type ExtractedPerson = ArrayItem<Team>;

function processPerson(p: ExtractedPerson) {
  console.log(`${ p.name } (${ p.age })`);
}

const actors: Team = [
  { name: 'Jason Isaacs', age: 57 },
  { name: 'Idris Elba', age: 52 }];

for (const p of actors) {
  processPerson(p);
}


/* unboxing promises */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PromiseValueType<T> = T extends Promise<infer U> ? U : never;

console.log(`\n=== unboxing a promise with infer`);
type PromisedPerson = Promise<Person>;
type UnpromisedPerson = PromiseValueType<PromisedPerson>;

function printPersonInfo(p: UnpromisedPerson) {
  console.log(p.name);
  console.log(p.age);
}


async function fetchPerson(): PromisedPerson {
  return Promise.resolve({
    name: 'Jason Isaacs',
    age: 57
  });
}

fetchPerson()
  .then(printPersonInfo);
