import { useContext } from "react";
import { AppContext } from "../Contexts";
import { LANGUAGES } from "../Constants";


const RememberMe = ({ remember, setRemember }) => {
  const { state } = useContext(AppContext);

  //console.log("RememberMe.js remember bool", remember);
  return (
    <div className="form-group form-check">
      <input
        type="checkbox"
        name="checkbox"
        id="checkbox"
       
        checked={remember}
        onChange={() => setRemember(!remember)}
        className="form-check-input h-4 w-4 border border-gray-300 rounded-sm "
      />
      <label className="form-check-label inline-block" htmlFor="checkbox">
        {LANGUAGES[state.lang].Auth.RememberMe}
      </label>
    </div>
  );
};

export default RememberMe;