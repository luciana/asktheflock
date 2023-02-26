import { Auth as AmplifyAuth } from "aws-amplify";

const SignUp = async (email, password, name, gender, address, birthdate, locale) => {
  console.log("Auth Sign up");
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
  console.log("Service Auth.js SignIn Auth returned from Amplify", auth);
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
    return AmplifyAuth.federatedSignIn({ provider: 'Facebook' });  
  }


const ForgotPassword = async (email) => {
  await AmplifyAuth.forgotPassword(email);
};

const RedefinePassword = async (email, code, pwd) => {
  await AmplifyAuth.forgotPasswordSubmit(email, code, pwd);
};

const GetUser = async () => {
  const result = await AmplifyAuth.currentAuthenticatedUser();
  console.log("Service Auth.js GetUser  currentAuthenticatedUser returned from Amplify", result);
  return result.attributes;

};

const SignOut = async () => {
  await AmplifyAuth.signOut({ global: true });
  // await AmplifyAuth.signOut()
  // .then(data => console.log("signout data", data))
  // .catch(err => console.log("signout error",err));

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
  return await Auth.deleteUser();  
}

const Auth = {
  SignUp,
  ResendConfirmationCode,
  ConfirmSignUp,
  SignIn,
  ForgotPassword,
  RedefinePassword,
  GetUser,
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