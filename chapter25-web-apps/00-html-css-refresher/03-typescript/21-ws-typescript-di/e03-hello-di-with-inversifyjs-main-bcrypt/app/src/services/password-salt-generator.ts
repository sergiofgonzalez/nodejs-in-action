import bcrypt from 'bcrypt';
import { injectable } from 'inversify';

@injectable()
export class PasswordSaltGenerator {
  async getSalt(): Promise<string> {
    const salt = bcrypt.genSalt();
    return salt;
  }
}