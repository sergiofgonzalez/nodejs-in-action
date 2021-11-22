# 02: Misc concepts &mdash; Hello, user-defined type guards!
> introduces the concepts of *user-defined type guards* and *type predicates* which lets you write cleaner code to understand the type of an object.

## Concept description

A **type guard** is a special type of check that inspects the type of a given element.

*Type guards* exist also in JavaScript using `typeof` and `instanceof`, but TypeScript excels in this area giving you the possibility of writing your own *type guards*.

In order to build these *user-defined type guards* you have write functions whose return type is a **type predicate**.

A **type predicate** takes the form `parameterName is Type` where `parameterName` must be the name of a parameter from the type guard function signature.

## Example description

Consider the following example that defines two distinct types and a function that randomly returns an object of either type:

```typescript
interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}

/* randomly returns a Fish or a Bird */
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
```

In our code, if we want to understand what type of pet we're dealing with, we will need to do something like the following:

```typescript
const pet = getSmallPet();
if ('swim' in pet) {
  console.log(`It is a fish!`);
} else if ('fly' in pet) {
  console.log(`It is a bird!`);
} else {
  console.log(`It is a gremlin!`);
}
```

This kind of *type guard* is quite ugly, as the developer needs to understand the underlying shape of both `Fish` and `Bird`.


With TypeScript's user-defined type guards you can provide a much cleaner approach to these use cases. Type guards involve creating a function with this shape:

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

As explained in the concepts section, the function above leverages a *type predicate*. A predicate takes the form `parameterName is Type` where `parameterName` must be the name of a parameter of the function signature.

The function itself returns a boolean, but what we're indicating above is that when the function returns `true` the argument will be a `Fish`.

Then, we can use it to provide a much cleaner code:

```typescript
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

Notice that TypeScript not only knows that `pet` is a `Fish`, but also that the `else` branch is a `Bird`. This saves use from any additional casting.

We can use the type guard function to filter out/classify the elements in our array:

```typescript
const pets: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet(), getSmallPet(), getSmallPet()];
const fishPets: Fish[] = pets.filter(isFish);
const birdPets: Bird[] = pets.filter((pet): pet is Bird => !isFish(pet));
```
