import { FileUserRepository } from './services/file-user-repository';
import { FakeEmailService } from './services/fake-email-service';
import { EmailService } from './interfaces/email-service';
import { UserRepository } from './interfaces/user-repository';
import { UserRegistrationService } from './services/user-registration-service';
import bcrypt from 'bcrypt';



/* injector */
async function run() {
  const userRepository: UserRepository = new FileUserRepository();
  const emailService: EmailService = new FakeEmailService();
  const salt = await bcrypt.genSalt();
  const userRegistrationService = new UserRegistrationService(userRepository, emailService, salt);

  userRegistrationService.registerUser('jason.isaacs@example.com', 'secret123');
}

run()
  .then(() => console.log('finished'))
  .catch((err) => console.log(`ERROR: `, err));
