import { useEffect, useState, useContext } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { AppContext } from "../../Contexts";
import { LANGUAGES, ROUTES } from "../../Constants";
import { isValidEmail } from "../../Helpers";

import {
    Button,
    AuthLink,
    AuthTitle,
    Input,
    RememberMe,
  } from "../../Components";

export default function SignIn() {
  const location = useLocation();
  const { state } = useContext(AppContext);
    const { setAlert, signIn, signInWithGoogle, signInWithFacebook } = useOutletContext();
    const [email, setEmail] = useState(location?.state?.email || "");
    const [pwd, setPwd] = useState("");
    const [remember, setRemember] = useState(false);
  
    useEffect(() => {
      setAlert(location?.state?.alert);
    }, [location?.state?.alert, setAlert]);
  
    const disabled = () => email === "" || !isValidEmail(email) || pwd === "";
    //console.log("Signin.js state context", state);

  
    return (
      <>    
      <hr className="my-2" />  
      <div className="m-4 row text-center">       
        <div className="col " >
          <Button
            text={LANGUAGES[state.lang].Auth.SignInWithGoogleButton}
            disabled={false}
            handler={signInWithGoogle}
            icon="mx-3 fa-brands fa-google"
          />             
          <Button
            text={LANGUAGES[state.lang].Auth.SignInWithFacebookButton}
            disabled={false}
            handler={signInWithFacebook}
            icon="mx-3 fa-brands fa-facebook-f"
          />
        </div>
        </div> 
      <form className="form-control">
        <AuthTitle text={LANGUAGES[state.lang].Auth.SignInTitle} />
        <div className="mb-4">
          <Input
            type="email"
            placeholder={LANGUAGES[state.lang].Email}
            value={email}
            handler={setEmail}
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder={LANGUAGES[state.lang].Password}
            value={pwd}
            handler={setPwd}
          />
        </div>
        <div className="d-flex justify-between mb-4">
          <RememberMe remember={remember} setRemember={setRemember} />
        </div>
        <div className="d-flex justify-between mb-4">
          <AuthLink
          to={ROUTES[state.lang].FORGOT_PASSWORD}
          text={LANGUAGES[state.lang].Auth.ForgotPassword}
        />
        </div>
        <Button
        text={LANGUAGES[state.lang].Auth.SignInButton}
        disabled={disabled()}
        handler={() => signIn(email, pwd, remember)}       
      />
        <div className="w-full text-center mt-5">
        <AuthLink
          to={ROUTES[state.lang].SIGN_UP}
          text={LANGUAGES[state.lang].Auth.NotRegistered}
          size="xl"
        />
      </div>
      </form>
      </>
    );
  }