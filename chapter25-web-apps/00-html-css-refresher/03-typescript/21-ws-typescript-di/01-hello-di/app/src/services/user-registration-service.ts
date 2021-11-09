import { EmailService } from '../interfaces/email-service';
import { UserRepository } from '../interfaces/user-repository';
import bcrypt from 'bcrypt';

export class UserRegistrationService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService,
    private passwordHashSalt: string
  ) {}

  async registerUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, this.passwordHashSalt);
    const registeredUser = await this.userRepository.save({ email, password: hashedPassword });
    await this.emailService.sendEmail(registeredUser.email, 'Welcome to my website!');
  }
}
