import { useEffect, useState, useContext } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { isValidEmail, isValidZip, isValidPassword } from "../../Helpers";
import { AuthLink, AuthTitle, Input, Title, Select, DatePicker, Button } from "../../Components";
import { AppContext } from "../../Contexts";
import { LANGUAGES, ROUTES, GENDER } from "../../Constants";

export default function SignUp() {
  const location = useLocation();
  const { state } = useContext(AppContext);
  const { setAlert, signUp, signInWithGoogle, signInWithFacebook } = useOutletContext();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [repeat, setRepeat] = useState("");
  const [accept, setAccept] = useState(false);
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    setAlert(location?.state?.alert);

  }, [location?.state?.alert, setAlert]);

  // const isValidPassword =  (pwd) => {
  //   const re = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=+\-^$*.\[\]{}()?"!@#%&/\\,><':;|_~`])\S{8,99}$/);
  //   const isOk = re.test(pwd);
  //   return isOk;
  // }
  
  const disabled = () =>
    email === "" ||
    !isValidEmail(email) ||
    name === "" ||
    pwd === "" ||
    !isValidPassword(pwd) ||
    repeat === "" ||
    pwd !== repeat ||
    accept === false    

    const handlePassword = (p) =>{
      setPwd(p);      
      if(!isValidPassword(p)){
       setAlert({ type: "error", text:LANGUAGES[state.lang].CommonError.NewPassword});  
      }else{
        setAlert();
      }    
    }

    const handleRepeatPassword = (r) =>{
      setRepeat(r);     
      if( r === "" || pwd !== r ){
        setAlert({ type: "error", text:LANGUAGES[state.lang].CommonError.RepeatPassword});  
      }else{
        setAlert();
      }    
    }

    const handleEmail = (e) =>{
      setEmail(e);     
      if(!isValidEmail(e)){
        setAlert({ type: "error", text:LANGUAGES[state.lang].CommonError.InvalidEmail});  
      }else{
        setAlert();
      }   
    }

    const handleBirthdate = (b) => {     
      //convert 2023-02-23 to AWSDate format 1970-01-01Z
      setBirthdate(b);
    }
    const handleAddress = (z) => {
      setAddress(z); //right now, address is only zip
      
      if(!isValidZip(address, state.lang)){
        setAlert({ type: "error", text:LANGUAGES[state.lang].CommonError.InvalidZip}); 
      }else{
        setAlert();
      }
    }
    const handleName = (n) =>{
      setName(n);     
      if(n === ""){
        setAlert({ type: "error", text:LANGUAGES[state.lang].CommonError.InvalidName});  
      }else{
        setAlert();
      }   
    }    
  return (
    <>
   
      <div className="m-4 row text-center">       
        <div className="col " >
          <Button
            text={LANGUAGES[state.lang].Auth.SignUpWithGoogleButton}
            disabled={false}
            handler={signInWithGoogle}
            icon="mx-3 fa-brands fa-google"
          />             
          <Button
            text={LANGUAGES[state.lang].Auth.SignUpWithFacebookButton}
            disabled={false}
            handler={signInWithFacebook}
            icon="mx-3 fa-brands fa-facebook-f"
          />
        </div>
      </div>
    
    <div className="text-color-gray text-xl text-center mb-4 uppercase">OR</div>
    
    <form className=" form-control">
    <AuthTitle text={LANGUAGES[state.lang].Auth.SignUpTitle} />  
    
      <div className="mb-4">      
        <Input
          type="text"
          label={LANGUAGES[state.lang].Name}      
          placeholder={LANGUAGES[state.lang].Name} 
          value={name}
          handler={handleName}  
          required={true}       
        /> 
      </div>
      <div className="mb-4">      
        <Input
          type="email"
          label={LANGUAGES[state.lang].Email}     
          placeholder={LANGUAGES[state.lang].Email}
          value={email}
          handler={handleEmail}  
          required={true}            
        />       
      </div>
      <div className="mb-4">      
        <Input
          type="password"
          label={LANGUAGES[state.lang].Password}
          placeholder={LANGUAGES[state.lang].Password}
          value={pwd}
          handler={handlePassword}          
          showTooltip      
          required={true}        
        />    
      </div>      
      <div className="mb-4">      
        <Input
          type="password"
          label={LANGUAGES[state.lang].Auth.RepeatPassword}
          placeholder={LANGUAGES[state.lang].Auth.RepeatPassword}
          value={repeat}
          handler={handleRepeatPassword}  
          required={true}            
        />       
      </div>
     

      <div className="form-control">
        <Title text={"If you care to share"}
               size={"text-sm"}
               color={"text-color-gray"} />
      
      <div className="row">               
        <div className="col-md-4">
          <Input 
            type={"number"}
            label={LANGUAGES[state.lang].ZipCode}
            placeholder={LANGUAGES[state.lang].ZipCode}
            handler={handleAddress} />          
        </div>
        <div className="col-md-4">        
          <label className="form-label py-1">{LANGUAGES[state.lang].Gender} </label> 
          <Select  value={gender} handler={setGender}>         
            {GENDER.map((l) => (            
             <option key={l} value={l}>
               {LANGUAGES[state.lang].Genders[l]}
            </option>
            ))}
        </Select>        
        </div>
        <div className="col-md-4">
          <DatePicker 
            placeholder={LANGUAGES[state.lang].Birth} 
            label={LANGUAGES[state.lang].Birth}             
            name={"dob"}
            handler={handleBirthdate}
            locale={state.lang}         
            />          
        </div>
      </div>
      </div>

      <div className="form-check my-3">    
        <input
          type="checkbox"       
          id="invalidCheck" 
          checked={accept}       
          onChange={() => setAccept(!accept)}
          className="form-check-input h-4 w-4 border border-gray-300 rounded-sm "
        />
        <label className="form-check-label" htmlFor="invalidCheck">          
          <AuthLink text={LANGUAGES[state.lang].Auth.TermsandConditions} to={ROUTES[state.lang].TERMS} />
          <span className="req">*</span>
        </label>     
      </div>

      <div>
     
        <button       
          disabled={disabled()}
          className="btn btn-outline-primary rounded-pill mx-3 p-3"
          type="button"
          onClick={() => signUp(email, pwd, name, gender, address, birthdate)}
          
        >{LANGUAGES[state.lang].Auth.SignUpButton} </button>
      </div>


      <div className="py-4 my-4">
          <div><strong>Password Requirements:</strong></div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{LANGUAGES[state.lang].PasswordRules.Chars}</li>
              <li className="list-group-item">{LANGUAGES[state.lang].PasswordRules.Lowercase}</li>
              <li className="list-group-item">{LANGUAGES[state.lang].PasswordRules.Uppercase}</li>            
              <li className="list-group-item">{LANGUAGES[state.lang].PasswordRules.Number}</li>
              <li className="list-group-item">{LANGUAGES[state.lang].PasswordRules.Symbol}</li>              
            </ul>            
      </div>
      <div className="w-full text-center">
        <AuthLink text={LANGUAGES[state.lang].Auth.GoToSignIn} to={ROUTES[state.lang].SIGN_IN} size="xl" />
      </div>
    </form>
    <div className="py-4"><hr className="my-4" /></div>
    </>
  );
}