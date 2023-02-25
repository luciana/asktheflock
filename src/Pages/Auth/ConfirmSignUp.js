import { useEffect, useState, useContext } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { isValidEmail } from "../../Helpers";
import { Button, AuthLink, AuthTitle, Input } from "../../Components";
import { AppContext } from "../../Contexts";
import { LANGUAGES, ROUTES } from "../../Constants";

export default function ConfirmSignUp() {
  const { state } = useContext(AppContext); 
  const location = useLocation();
  const { setAlert, resendConfirmationCode, confirmSignUp } =
    useOutletContext();
  const [email, setEmail] = useState(location?.state?.email || "");
  const [code, setCode] = useState("");

  useEffect(() => {   
    setAlert(location?.state?.alert);
  }, [location?.state?.alert, setAlert]);

  const disabled = () =>
    email === "" || !isValidEmail(email) || code === "" || code.length < 6;

  return (
    <form className="form-control">
    <AuthTitle text={LANGUAGES[state.lang].Auth.ConfirmRegistrationTitle} />      
 
      <div className="mb-4">
        <Input
          type="email"
          placeholder={LANGUAGES[state.lang].Email}
          value={email}
          handler={setEmail}
        />
      </div>
      <div className="mb-4">
        <Input type="text" placeholder="Code" value={code} handler={setCode} />
      </div>
      <div className="mb-4 flex justify-end text-indigo-500 hover:text-amber-500 duration-200 transition ease-in-out">
        <button
          type="button"
          onClick={() => resendConfirmationCode(email)}
          className="btn btn-light borders-0"
        >
          {LANGUAGES[state.lang].ResendConfirmationCode}
        </button>
      </div>
      <Button
        text={LANGUAGES[state.lang].Confirm}
        disabled={disabled()}
        handler={() => confirmSignUp(email, code)}
      />
      <div className="w-full text-center mt-6">
        <AuthLink text={LANGUAGES[state.lang].GoToSignIn} to={ROUTES[state.lang].SIGN_IN} size="xl" />
      </div>
    </form>
  );
}