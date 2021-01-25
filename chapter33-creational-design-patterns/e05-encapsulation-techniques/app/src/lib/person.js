export class Person {
  #name
  #ageInYears
  #birthyear

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get age() {
    return this.#ageInYears;
  }

  set age(years) {
    this.#ageInYears = years;
    this.#setBirthyear();
  }

  #setBirthyear() {
    const currentYear = new Date().getFullYear();
    this.#birthyear = currentYear - this.#ageInYears;
  }

  get birthyear() {
    return this.#birthyear;
  }

  toString() {
    return `Hi, this is ${ this.#name } and I am ${ this.#ageInYears} years old.`;
  }
}