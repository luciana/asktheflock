import { useEffect, useState, useContext } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { isValidEmail } from "../../Helpers";
import { Button, AuthLink, AuthTitle, Input } from "../../Components";
import { AppContext } from "../../Contexts";
import { LANGUAGES, ROUTES } from "../../Constants";

export default function RedefinePassword() {
    const { state } = useContext(AppContext);
    const location = useLocation();
    const { setAlert, redefinePassword } = useOutletContext();
    const [email, setEmail] = useState(location?.state?.email || "");
    const [code, setCode] = useState("");
    const [pwd, setPwd] = useState("");
    const [repeat, setRepeat] = useState("");
  
    useEffect(() => {      
      setAlert(location?.state?.alert);
    }, [location?.state?.alert, setAlert]);
  
    const disabled = () =>
      email === "" ||
      !isValidEmail(email) ||
      code === "" ||
      code.length < 4 ||
      pwd === "" ||
      repeat === "" ||
      pwd !== repeat;
  
    return (
      <form className="form-control">
         <AuthTitle text={LANGUAGES[state.lang].Auth.RedefinePassword} />      
        <div className="mb-4">
          <Input
            type="email"
            placeholder={LANGUAGES[state.lang].Email}
            value={email}
            handler={setEmail}
          />
        </div>
        <div className="mb-4">
          <Input type="text" 
           placeholder={LANGUAGES[state.lang].Code}
          value={code} handler={setCode} />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder={LANGUAGES[state.lang].Password}
            value={pwd}
            handler={setPwd}
            showTooltip
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder={LANGUAGES[state.lang].Auth.RepeatPassword}
            value={repeat}
            handler={setRepeat}
          />
        </div>
        <Button
          text={LANGUAGES[state.lang].Auth.RedefinePasswordButton}
          disabled={disabled()}
          handler={() => redefinePassword(email, code, pwd, repeat)}
        />
        <div className="w-full text-center mt-6">
          <AuthLink text={LANGUAGES[state.lang].Auth.GoToSignIn} to={ROUTES[state.lang].SIGN_IN} size="xl" />
        </div>
      </form>
    );
  }