interface IFly {
  fly(): void;
}

const duck: IFly = {
  fly() {
    console.log(`duck is flying`);
  }
};

duck.fly();

class Duck implements IFly {
  constructor(public name: string) {}
  fly() {
    console.log(`${this.name} is flying`);
  }
}

const donald: Duck = new Duck('Donald');
donald.fly();

const howard: Duck = {
  name: 'Howard',
  fly() { console.log(`Howard flies!`); } // fails if not including the `fly()` implementation
};

howard.fly();
