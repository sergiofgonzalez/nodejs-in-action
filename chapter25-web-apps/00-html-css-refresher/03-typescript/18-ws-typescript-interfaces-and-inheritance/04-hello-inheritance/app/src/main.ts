class UserOne {
  email: string = '';
  createDate: number = 0;
  lastLogin: number = 0;
  private token: string = '';

  setToken(token: string): void {
    this.token = token;
  }

  resetPassword(password: string): string {
    return password;
  }
}

class AdminUser extends UserOne {
  adminPages: string[] =['admin', 'settings'];

  // constructor(email: string) {
  //   super();
  //   this.email = email;
  // }

  resetUserPassword(email: string): string {
    return 'password123';
  }
}

const adminUser: AdminUser = new AdminUser();

class SuperAdmin extends AdminUser {
  superPages: string[] = ['super', 'ultimate'];
  readonly myHash: string;

  constructor() {
    super();
    this.myHash = '12345';
  }

  createAdminUser(adminUser: AdminUser): AdminUser {
    return adminUser;
  }

  // override
  resetPassword(password: string): string {
    return password + this.myHash;
  }
}

const superAdmin = new SuperAdmin();
console.log(superAdmin.resetPassword('secret'));  // -> secret12345
console.log(adminUser.resetPassword('secret'));   // -> secret

// peeking into polymorphic calls (not seen in the concepts yet!)
const users: UserOne[] = [superAdmin, adminUser];
for (const user of users) {
  console.log(user.resetPassword('secret'));
}