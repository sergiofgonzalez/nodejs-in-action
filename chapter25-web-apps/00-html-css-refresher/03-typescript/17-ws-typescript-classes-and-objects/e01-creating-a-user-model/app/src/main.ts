class Login {
  email: string;
  password: string;

  constructor(args: ILogin) {
    this.email = args.email;
    this.password = args.password;

  }
}

interface ILogin {
  email: string;
  password: string;
}

class Auth {
  user: Login;
  source: string;

  constructor(args: IAuth) {
    this.user = args.user;
    this.source = args.source;
  }

  validUser(): boolean {
    return this.user.email === 'admin@example.com' && this.user.password === 'secret123';
  }
}

interface IAuth {
  user: Login;
  source: string;
}

// inline creation of auth
// not that `user` is defined using duck-typing
const auth = new Auth({
  source: 'Yammer',
  user: {
    email: 'admin@example.com',
    password: 'secret123'
  }
});

console.log(`Validating user sourced from ${ auth.source }: ${ auth.validUser() }`);

auth.user.password = 'tiger123';
console.log(`Validating user sourced from ${ auth.source }: ${ auth.validUser() }`);

// another way to define user
const badUser = new Login({
  email: 'badmin@example.com',
  password: 'secret'
});

const failingAuth = new Auth({
  source: 'Twitter',
  user: badUser
});

console.log(`Validating user sourced from ${ failingAuth.source }: ${ failingAuth.validUser() }`);