import fs from 'fs';
import { User } from '../interfaces/user';
import { UserRepository } from '../interfaces/user-repository';

export class FileUserRepository implements UserRepository {
  save(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      fs.appendFile('users.txt', `${ JSON.stringify(user) }\n`, err => {
        if (err) {
          return reject(err);
        }
        resolve(user);
      });
    });
  }
}