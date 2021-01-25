function createPerson(name) {
  const privateProperties = {};

  const person = {
    setName(name) {
      if (!name) {
        throw new Error(`A person must have a name`);
      }
      privateProperties.name = name;
    },
    getName() {
      return privateProperties.name;
    }
  };

  person.setName(name);
  return person;
}

const person = createPerson('Jason Isaacs!');
console.log(`Hello to ${ person.getName() }`);

console.log(`Hello to ${ person.name }`);
console.log(`Hello to ${ person.privateProperties }`);