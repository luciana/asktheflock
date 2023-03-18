import Mutations from './mutations';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';

jest.mock('aws-amplify');

// Mock response data for your tests
const mockCreateUserResponse = {
  data: {
    createUser: {
      id: '1234',
      email: 'test@example.com',
      locale: 'en',
      name: 'John Doe',
      address: '123 Main St',
      birthdate: '2000-01-01',
      gender: 'male',
    },
  },
};

// Tests for the CreateUser function
describe('Mutations', () => {
  beforeEach(() => {
    API.graphql.mockClear();
    graphqlOperation.mockClear();
  });

  it('should create a user', async () => {
    const { email, locale, name, address, birthdate, gender } = mockCreateUserResponse.data.createUser;
    API.graphql.mockResolvedValue(mockCreateUserResponse);

    const result = await Mutations.CreateUser(email, locale, name, address, birthdate, gender);

    expect(result).toEqual(mockCreateUserResponse.data.createUser);
    expect(graphqlOperation).toHaveBeenCalledWith(mutations.createUser, {
      input: { email, locale, name, address, birthdate, gender },
    });
    expect(API.graphql).toHaveBeenCalledWith(expect.anything());
  });

  // Add more tests for other functions in the Mutations module
});
