import { injectable, inject } from 'inversify';
import { TYPES } from '../constants/types';
import { EmailService } from '../interfaces/email-service';
import { UserRepository } from '../interfaces/user-repository';
import bcrypt from 'bcrypt';
import { PasswordSaltGenerator } from './password-salt-generator';



@injectable()
export class UserRegistrationService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.EmailService) private emailService: EmailService,
    @inject(TYPES.PasswordSaltGenerator) private passwordSaltGenerator: PasswordSaltGenerator
  ) {}

  async registerUser(email: string, password: string): Promise<void> {
    const salt = await this.passwordSaltGenerator.getSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const registeredUser = await this.userRepository.save({ email, password: hashedPassword });
    await this.emailService.sendEmail(registeredUser.email, 'Welcome to my website!');
  }
}
