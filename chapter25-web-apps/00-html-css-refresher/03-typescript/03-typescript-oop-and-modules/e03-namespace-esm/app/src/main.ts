class Customer {
  private _id = 0;
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
}

interface ICustomer extends Customer {
  name: string;
}

class NewCustomer extends Customer implements ICustomer {
  constructor(public name: string) {
    super();
  }
}

const customer = new NewCustomer('Jason Isaacs');
customer.id = 55;

console.log(customer);