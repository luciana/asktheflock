export const Auth = {
    signUp: jest.fn(),
    resendSignUp: jest.fn(),
    confirmSignUp: jest.fn(),
    signIn: jest.fn(),
    completeNewPassword: jest.fn(),
    rememberDevice: jest.fn(),
    forgetDevice: jest.fn(),
    federatedSignIn: jest.fn(),
    forgotPassword: jest.fn(),
    forgotPasswordSubmit: jest.fn(),
    currentAuthenticatedUser: jest.fn(),
    signOut: jest.fn(),
    updateUserAttributes: jest.fn(),
    verifyCurrentUserAttributeSubmit: jest.fn(),
    changePassword: jest.fn(),
    currentCredentials: jest.fn(),
    deleteUser: jest.fn(),
  };
  
  export const CognitoHostedUIIdentityProvider = {
    Facebook: 'Facebook',
  };
  
  export const API = {
    graphql: jest.fn(),
  };
  
  export const graphqlOperation = jest.fn(() => 'DUMMY_GRAPHQL_OPERATION');

  