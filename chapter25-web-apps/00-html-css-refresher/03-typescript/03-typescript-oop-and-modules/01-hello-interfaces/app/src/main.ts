/* Hello Interface */
interface IIdName {
  id: number;
  name: string;
}

//const idObject: IIdName = { id: 2 }; /* ERROR: name is missing */

const idNameObj: IIdName = {
  id: 1,
  name: 'Jason Isaacs'
};

console.log(idNameObj);


/* Interfaces with optional properties */
interface IOptional {
  id: number,
  name?: string
}

const optionalId: IOptional = {
  id: 5
};

const optionalIdName: IOptional = {
  id: 5,
  name: 'Idris Elba'
};

/* Weak types */
interface IWeakType {
  id?: number,
  name?: string
}

const weakTypeObj1: IWeakType = {};
const weakTypeObj2: IWeakType = { id: 1 };
const weakTypeObj3: IWeakType = { name: 'Riz Ahmed' };
const weakTypeObj4: IWeakType = { id: 5, name: 'Ed Norton' };
// const weakTypeObj5: IWeakType = { category: 'actor' }; /* ERROR: not assignable */

/* the `in` operator */
interface IName {
  id: number,
  name: string;
}

interface IDescrValue {
  descr: string;
  value: number;
}

function printNameOrValue(obj: IName | IDescrValue): void {
  if ('id' in obj) {
    console.log(`obj.name:`, obj.name);
  }
  if ('descr' in obj) {
    console.log(`obj.value:`, obj.value);
  }
}

/* they `keyof` keyword */

interface IPerson {
  id: number;
  name: string;
}

type PersonProperty = keyof IPerson; // equivalent to type PersonPropertyLiteral = 'id' | 'name';

function displayProperty(key: PersonProperty, obj: IPerson) {
  console.log(`${key} = ${obj[key]}`);
}

displayProperty('id', {id: 1, name: 'Jason Isaacs'} );
displayProperty('name', {id: 1, name: 'Jason Isaacs'} );
// displayProperty('age', {id: 2, name: 'Ed Norton'} ); /* ERROR: not assignable */
