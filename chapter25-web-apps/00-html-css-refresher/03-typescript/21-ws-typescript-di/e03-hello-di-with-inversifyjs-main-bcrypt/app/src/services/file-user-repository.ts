import fs from 'fs';
import { injectable } from 'inversify';
import { User } from '../interfaces/user';
import { UserRepository } from '../interfaces/user-repository';

@injectable()
export class FileUserRepository implements UserRepository {
  save(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      fs.appendFile('users.txt', `${ JSON.stringify(user) }\n`, (err: unknown) => {
        if (err) {
          return reject(err);
        }
        resolve(user);
      });
    });
  }
}