import { useEffect, useState, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { isValidEmail } from "../../Helpers";
import { Button, AuthLink, AuthTitle, Input } from "../../Components";
import { AppContext } from "../../Contexts";
import { LANGUAGES, ROUTES } from "../../Constants";

export default function ForgotPassword() {
  const { state } = useContext(AppContext);
  const { setImg, setAlert, sendForgotPasswordCode } = useOutletContext();
  const [email, setEmail] = useState("");

  useEffect(() => {  
    setAlert();
  }, [setAlert, setImg]);

  const disabled = () => email === "" || !isValidEmail(email);

  return (
    <form className="form-control">
    <AuthTitle text={LANGUAGES[state.lang].Auth.ForgotPassword} />      
 
   
      <div className="mb-4">
        <Input
          type="email"
          placeholder={LANGUAGES[state.lang].Auth.EnterYourEmail}
          value={email}
          handler={setEmail}
        />
      </div>
      <Button
        text={LANGUAGES[state.lang].Auth.SendCode}
        disabled={disabled()}
        handler={() => sendForgotPasswordCode(email)}
      />
      <div className="w-full text-center mt-6">
        <AuthLink text={LANGUAGES[state.lang].Auth.GoToSignIn} to={ROUTES[state.lang].SIGN_IN} size="xl" />
      </div>
    </form>
  );
}