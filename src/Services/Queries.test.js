import Queries from './Queries';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';

jest.mock('aws-amplify');

// ... Your tests for the Queries module


describe('Queries', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a user by email', async () => {
    const email = 'test@example.com';

    const mockResponse = {
      data: {
        userByEmail: {
          items: [
            {
              id: '123',
              email: 'test@example.com',
            },
          ],
        },
      },
    };

    API.graphql.mockResolvedValue(mockResponse);

    const result = await Queries.GetUserByEmail(email);

    expect(result).toEqual(mockResponse.data.userByEmail.items[0]);
    expect(graphqlOperation).toHaveBeenCalledWith(queries.userByEmail, { email });
    expect(API.graphql).toHaveBeenCalledWith('DUMMY_GRAPHQL_OPERATION');
  });

  // Add more tests for other functions like GetQuestionByUserId, GetAllQuestions, GetSingleQuestion, etc.
  // Follow the pattern used in the GetUserByEmail test to mock API.graphql function calls and test the expected behavior.
});
