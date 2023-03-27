import { Auth as AmplifyAuth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

const SignUp = async (email, password, name, gender, address, birthdate, locale) => {
  return await AmplifyAuth.signUp({
    username: email,
    password,
    attributes: { email, locale, name, gender, address, birthdate},
  });
};

const ResendConfirmationCode = async (email) => {
  await AmplifyAuth.resendSignUp(email);
};

const ConfirmSignUp = async (email, code) => {
  await AmplifyAuth.confirmSignUp(email, code);
};

const SignIn = async (email, pwd, remember) => {
  
  const auth = await AmplifyAuth.signIn(email, pwd);
  if (auth.challengeName === "NEW_PASSWORD_REQUIRED")
    await AmplifyAuth.completeNewPassword(auth, pwd);
  if (remember) await AmplifyAuth.rememberDevice();
  else await AmplifyAuth.forgetDevice();
  return auth;
};

function SignInWithGoogle() {
  return AmplifyAuth.federatedSignIn({ provider: 'Google' });  
 }

 function SignInWithFacebook() {
    return AmplifyAuth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook });  
  }


const ForgotPassword = async (email) => {
  await AmplifyAuth.forgotPassword(email);
};

const RedefinePassword = async (email, code, pwd) => {
  await AmplifyAuth.forgotPasswordSubmit(email, code, pwd);
};

const GetUser = async () => {
  const result = await AmplifyAuth.currentAuthenticatedUser();
  return result.attributes;

};

const IsAdminUser = async() => {
  const result = await AmplifyAuth.currentAuthenticatedUser(); 
  const g = result.signInUserSession.accessToken.payload["cognito:groups"];
  if(g){
    const adminGroup = process.env.REACT_APP_ADMIN;
    return g.includes(adminGroup);
  }else{
    return false;
  }
  
}

const SignOut = async () => {
  try{
    await AmplifyAuth.signOut({ global: true })
  }catch(error){
    await AmplifyAuth.signOut();
  }
};

const ChangeEmail = async (email) => {
  const user = await AmplifyAuth.currentAuthenticatedUser();
  await AmplifyAuth.updateUserAttributes(user, { email: email });
};


const ConfirmChangeEmail = async (code) => {
  await AmplifyAuth.verifyCurrentUserAttributeSubmit("email", code);
};

const ChangePassword = async (pwd, newPwd) => {
  const user = await AmplifyAuth.currentAuthenticatedUser();
  await AmplifyAuth.changePassword(user, pwd, newPwd);
};

// const ChangeLanguage = async (language) => {
//   const user = await AmplifyAuth.currentAuthenticatedUser();
//   await AmplifyAuth.updateUserAttributes(user, { locale: language });
// };

const GetCredentials = async () => {
  const credentials = await AmplifyAuth.currentCredentials();
  return credentials;
}

const DeleteUser =  async () => {
  return await AmplifyAuth.deleteUser();  
}

const Auth = {
  SignUp,
  ResendConfirmationCode,
  ConfirmSignUp,
  SignIn,
  ForgotPassword,
  RedefinePassword,
  GetUser,
  IsAdminUser,
  SignOut,
  ChangeEmail,
  ConfirmChangeEmail,
  ChangePassword,
  GetCredentials,
  SignInWithFacebook,
  SignInWithGoogle,
  DeleteUser,
};

export default Auth;