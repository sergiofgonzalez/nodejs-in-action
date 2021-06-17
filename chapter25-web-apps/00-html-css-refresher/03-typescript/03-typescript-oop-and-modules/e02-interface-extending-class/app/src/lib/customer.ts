namespace CustomerLib {
  interface ICustomer {
    id: number;
    name: string;
    age: number;
  }

  class Customer implements ICustomer {
    id = 0;
    name = '';
    age = 0;
  }
}



