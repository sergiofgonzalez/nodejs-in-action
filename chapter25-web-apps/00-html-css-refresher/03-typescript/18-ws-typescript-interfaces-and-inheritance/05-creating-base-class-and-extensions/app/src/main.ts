class User {
  private userName: string;
  private token: string;
  readonly timestamp: number = new Date().getTime();

  constructor(username: string, token: string) {
    this.userName = username;
    this.token = token;
  }

  logOut(): void {
    this.userName = '';
    this.token = '';
  }

  getUser() {
    return {
      userName: this.userName,
      token: this.token,
      createdAt: this.timestamp
    };
  }

  protected renewToken(newToken: string) {
    this.token = newToken;
  }
}

class Cashier extends User {
  balance: number = 0;
  float: number = 0;

  start(balance: number, float: number): void {
    this.balance = balance;
    this.float = float;
  }
}

class Inventory extends User {
  products: string[] = [];

  constructor(username: string, token: string, products: string[]) {
    super(username, token);
    this.products = products;
  }
}

class FloorWorker extends Inventory {
  floorStock: string[] = [];

  checkOut(id: number) {
    if (this.products.length >= id) {
      this.floorStock.push(this.products[id]);
    }
  }
}

const basicUser = new User('user1', 'token1');
console.log(basicUser);

const cashUser = new Cashier('user2', 'token2');
console.log(cashUser);
cashUser.start(10, 1.5);
console.log(cashUser);

const inventoryUser = new Inventory('user3', 'token3', ['orange', 'mango', 'plum']);
console.log(inventoryUser);

const floorWorker = new FloorWorker('user4', 'token4', ['orange', 'mango', 'plum']);
console.log(floorWorker);
floorWorker.checkOut(0);
console.log(floorWorker);
floorWorker.checkOut(2);
floorWorker.checkOut(4);
console.log(floorWorker);