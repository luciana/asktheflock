import Auth from './Auth';
import { Auth as AmplifyAuth, CognitoHostedUIIdentityProvider } from 'aws-amplify';

jest.mock('aws-amplify');

describe('Auth', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should sign up a user', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const name = 'John Doe';
    const gender = 'male';
    const address = '123 Main St';
    const birthdate = '1990-01-01';
    const locale = 'en-US';

    AmplifyAuth.signUp.mockResolvedValue('success');

    const result = await Auth.SignUp(email, password, name, gender, address, birthdate, locale);

    expect(result).toBe('success');
    expect(AmplifyAuth.signUp).toHaveBeenCalledWith({
      username: email,
      password,
      attributes: { email, locale, name, gender, address, birthdate },
    });
  });

  // Add more tests for other functions like ResendConfirmationCode, ConfirmSignUp, SignIn, etc.
  // Follow the pattern used in the SignUp test to mock AmplifyAuth function calls and test the expected behavior.
});
