interface Identifiable<Id extends string | number = number> {
  id: Id;
}

interface Person extends Identifiable {
  name: string;
  age: number;
}

interface Car extends Identifiable<string> {
  make: string;
}

const p: Person = {
  id: 1,
  age: 55,
  name: 'Jason Isaacs'
};

const c: Car = {
  id: 'W12',
  make: 'Mercedes'
};

// eslint-disable-next-line @typescript-eslint/ban-types
interface Component<P = {}, S = {}> {
  id: string;
  update() : void;
  properties?: P;
  state?: S;
}

const mySpanComponent: Component = {
  id: 'span1',
  update: () => { console.log(`${ mySpanComponent.id } has been updated`); }
};

mySpanComponent.update();

const myButtonComponent: Component<{ color: string, label: string }, { isDisabled: boolean, isPressed: boolean }> = {
  id: 'btn1',
  properties: {
    color: 'blue',
    label: 'Press me!'
  },
  state: {
    isDisabled: false,
    isPressed: false
  },
  update: () => { console.log(`${ myButtonComponent.id } has been updated`); }
};

