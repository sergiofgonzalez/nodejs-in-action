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