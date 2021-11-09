import { EmailService } from '../src/interfaces/email-service';
import { UserRepository } from '../src/interfaces/user-repository';
import { User } from '../src/interfaces/user';
import { UserRegistrationService } from '../src/services/user-registration-service';
import bcrypt from 'bcrypt';

test('User Registration Service', async () => {
  const mockUserRepository: UserRepository = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    save: jest.fn( async (user: User) => user)
  };

  const mockEmailService: EmailService = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    sendEmail: jest.fn( async (to: string, subject: string, body?: string) => {})
  };


  const userRegistrationService = new UserRegistrationService(
    mockUserRepository,
    mockEmailService,
    await bcrypt.genSalt()
  );

  await userRegistrationService.registerUser(
    'jason@example.com',
    '1234');

  expect(mockUserRepository.save).toHaveBeenCalled();
  expect(mockEmailService.sendEmail).toHaveBeenCalled();
});
