// User (object interface)
interface UserObj {
  email: string;
  loginAt?: number;
  token?: string;
}

// User (class interface)
interface IUserClass {
  user: UserObj;
  getUser(): UserObj;
  login(user: UserObj, password: string): UserObj;
}

// UserClass
class UserClass implements IUserClass {
  user: UserObj = { email: '' };

  login(user: UserObj, password: string): UserObj {
    this.user = user;
    return this.user;
  }

  getUser() {
    return this.user;
  }
}

const jasonIsaacs = new UserClass();
jasonIsaacs.login({ email: 'jason.isaacs@example.com'}, 'hello!');
console.log(jasonIsaacs.getUser());

const chuckles = new UserClass();
console.log(chuckles.login({ email: 'ken@example.com', token: 'the-token-1'}, 'secret'));
console.log(chuckles.getUser());

const margot = new UserClass();
console.log(margot.login({ email: 'mrobbie@example.com', token: 'the-token-2', loginAt: 12345 }, 'scott'));
console.log(margot.getUser());
