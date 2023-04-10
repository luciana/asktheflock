

import { useEffect, useState, useContext } from "react";
import { useOutletContext, useNavigate} from "react-router-dom";
import { LANGUAGES, ROUTES, TAGS, GENDER } from "../../Constants";
import { AppContext } from "../../Contexts";
import { Badge, QuestionBadge } from './../../Components/Votes';
import Auth from "../../Services/auth";
import Mutations from "../../Services/mutations";
import { Alert, Button, DatePicker, Form, Input, Select, Title, Card } from "../../Components";
import { isValidEmail, isValidZip } from "../../Helpers";
import Queries from "../../Services/queries";


export default function Profile() {
  const { state } = useContext(AppContext);
  const { user } = state;
  const navigate = useNavigate();
  const { loadUser, setLoading  } = useOutletContext();
  const [alert, setAlert] = useState();
  const [showCode, setShowCode] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [code, setCode] = useState("");
  const [tag, setTag] = useState("");
  const [voteCounts, setVoteCounts] = useState("");
  const [questionCounts, setQuestionCounts] = useState(0);
  const [whoHelpedMeCounts, setWhoHelpedMeCounts] = useState(0);  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [language, setLanguage] = useState(user.locale);

  useEffect(() => {
   // user && setEmail(user?.email) 
   // user && setName(user?.name)   
    user && setTag(user?.userTag === null ? "" : user.userTag)
    user && setGender(user?.gender)  
    user && user.birthday && setBirthdate(user?.birthdate)  
    user && user.address && setAddress(user?.address)  
    const validateUser = async () => {     
      try {
        const attributes = await Auth.GetUser();
        if ( attributes ){        
         setEmail(attributes.email);
         setName(attributes.name);
        }       
      } catch (error) {
        console.error("Error validating user - unauthorized", error);
      }
    };    
    validateUser();
    userVoteCount();
    userQuestionsAskedCount();
    whoHelpedMe();
  }, [user]);

  
  const loading = () => {
    setAlert()
    setLoading(true);
  }
  const handleErrors = (message) => {
    let errorMessage = message;
    switch (message) {
      case "Attempt limit exceeded, please try after some time.":
        errorMessage = LANGUAGES[user.locale].CommonError.AttemptLimit;
        break;
      case "An account with the given email already exists.":
        errorMessage = LANGUAGES[user.locale].CommonError.Email;
        break;
      case "Invalid verification code provided, please try again.":
        errorMessage = LANGUAGES[user.locale].CommonError.CodeError;
        break;
      case "Incorrect username or password.":
        errorMessage = LANGUAGES[user.locale].CommonError.Password;
        break;
      case "Password did not conform with policy: Password must have symbol characters":
        errorMessage = LANGUAGES[user.locale].CommonError.NewPassword;
        break;
      default:
        errorMessage = message;
    }
    setAlert({ type: "error", text: errorMessage });
  };

  const handleChangeEmail = async () => {
    loading();
    try {
      await Auth.ChangeEmail(email);
      setShowCode(true);
    } catch (error) {
      handleErrors(error.message);
    }
    setLoading(false);
  };

  const handleVerifyCode = async () => {
    loading();
    try {
      await Auth.ConfirmChangeEmail(code);
      await Mutations.UpdateUser({ id: user.id, email, locale: user.locale });
      loadUser({ force: true, email });
      setShowCode(false);
      setAlert({
        type: "success",
        text: LANGUAGES[user.locale].Profile.EmailSuccess,
      });
    } catch (error) {
      handleErrors(error.message);
    }
    setLoading(false);
  };

  const handlePassword = async () => {
    loading();
    try {
      await Auth.ChangePassword(currentPassword, newPassword);
      setAlert({
        type: "success",
        text: LANGUAGES[user.locale].Profile.PasswordSuccess,
      });
    } catch (error) {
      handleErrors(error.message);
    }
    setLoading(false);
  };

  const handleChangeUserTag = (value) => {
    
    if ( value && value.length > 0){
      setTag(value);
    }else{
      setAlert({
        type: "error",
        text: LANGUAGES[user.locale].Profile.SetExpertiseMessage,
      }); 
    }
   
  }
  

  const handleProfileInfo = async () => {
    loading();
    try {
      const validBirthDate = (birthdate || birthdate.length !== 0 )? birthdate : null; 
     
      if (validBirthDate && tag){      
        await Mutations.UpdateUser({ id: user.id, email: user.email, locale: language, name: name, gender: gender, address: address, birthdate: birthdate, userTag: tag });
      }else if (!validBirthDate && tag){
        await Mutations.UpdateUser({ id: user.id, email: user.email, locale: language, name: name, gender: gender, address: address, userTag: tag });
      }else if (validBirthDate && !tag){
        await Mutations.UdateUser({ id: user.id, email: user.email, locale: language, name: name, gender: gender, address: address, birthdate: birthdate });
      } else { //if (!validBirthDate && !tag){
        await Mutations.UpdateUser({ id: user.id, email: user.email, locale: language, name: name, gender: gender, address: address});
      } 
     
      loadUser({ force: true, 
        email: email,
        name: name, 
        locale: language  ? language : "en-US",         
        gender: gender ? gender : "",
        address: address ? address : "",
        birthdate: validBirthDate ? birthdate : "",
        userTag: tag ? tag : "",     
      });
      navigate(ROUTES[language].PROFILE);
      setAlert({ type: "success", text: LANGUAGES[user.locale].Profile.ProfileUpdatedMessage});
    } catch (error) {
      console.error("handleProfileInfo error", error);
      setAlert({ type: "error", text: LANGUAGES[user.locale].CommonError.UpdateUser});
      //navigate(ROUTES[user.locale].SIGN_IN);

    }
    setLoading(false);
  };

  const disabledEmail = () =>
    !email || email === user.email || !isValidEmail(email);

  const disabledCode = () => !code || code.length > 6;

  const disabledPassword = () =>
    !currentPassword ||
    newPassword !== repeatPassword ||
    newPassword.length < 8;

  //const disabledName = () => !name || name.length < 0;
  //const disabledTag = tag === user.userTag;
  const disabledZip = address !== "" && !isValidZip(address, user.locale);
  // const disabledLanguage = () => language === user.locale;
  // const disabledGender = () => gender === user.gender;
  // const disabledBirthdate = () => birthdate === user.birthdate;

  //const disableProfileButton = disabledTag || disabledZip || disabledLanguage || disabledGender || disabledBirthdate;
  const disableProfileButton = disabledZip;

  const userVoteCount = () => {
   
    if (user.votes) {
        setVoteCounts(JSON.parse(user.votes).length);
    }
   
  }
 
  const userQuestionsAskedCount = async () => {
    try{
      const questions = await Queries.GetQuestionByUserId(user.id);
      if ( questions ){
      //  console.log("questions by this user ", questions);
        setQuestionCounts(questions);
      }
    }catch(error){     
      console.error("Questions by user error", error);
    }
   
  }

  const whoHelpedMe = async () => {
    try{
      const questions = await Queries.GetAllQuestions();     
      if ( questions ){
        const thoseWhoHelpedMeCounts = questions.filter((backendQuestion) => (
          (backendQuestion.parentID === null) && backendQuestion.userID === user.id && backendQuestion.stats ))
        .map((q) => JSON.parse(q.stats))
        .flat(1)
        .filter((l) => l.userID !== user.id).length;
       
        setWhoHelpedMeCounts(thoseWhoHelpedMeCounts);
      }
    }catch(error){     
      console.error("Users who helped error", error);
    }
   
  }
              
 

  const renderEmail = () => (
    <>
      <Input
        type="email"
        placeholder={LANGUAGES[user.locale].Email}
        value={email}
        handler={setEmail}
      />
      <Button
        text={LANGUAGES[user.locale].Profile.ChangeEmail}
        disabled={disabledEmail()}
        handler={() => handleChangeEmail()}
      />
    </>
  );

  const renderChangeName = () => (
    
    
     <div className="mb-4 w-full flex flex-col gap-4 justify-center">
      <Input
        type="text"
        placeholder={LANGUAGES[user.locale].Name}
        value={name}
        handler={setName}
        disabled={true}
        label={LANGUAGES[user.locale].Profile.YourName}
      />   
      {/* <Button
        text={LANGUAGES[user.locale].Profile.ChangeName}
        disabled={disabledName()}
        handler={() => handleChangeName()}
      /> */}
    </div>

  );

  const renderChangeZip = () => (         
   
      <div className="mb-4 w-full flex flex-col gap-4 justify-center">      
      <Input
        type="text"
        placeholder={LANGUAGES[user.locale].ZipCode}
        value={address}
        handler={setAddress}
        label={LANGUAGES[user.locale].Profile.YourZipCode}
      />
      <div className="text-sm text-color-gray">{LANGUAGES[user.locale].Profile.ZipFormat}</div>
      {/* <Button
        text={LANGUAGES[user.locale].Profile.ChangeZip}
        disabled={disabledZip()}
        handler={() => handleChangeZip()}
      /> */}
    </div>
   
  );

  const renderChangeBirthdate = () => (         
    
      <div className="mb-4 w-full flex flex-col gap-4 justify-center">

      <DatePicker 
            placeholder={LANGUAGES[user.locale].Birth} 
            label={LANGUAGES[user.locale].Birth} 
            name={"dob"}
            handler={setBirthdate}
            locale={user.locale}    
            value={user.birthdate}     
        />   

      {/* <Button
        text={LANGUAGES[user.locale].Profile.ChangeBirthdate}
        disabled={disabledBirthdate()}
        handler={() => handleChangeBirthdate()}
      /> */}
    </div>
   
  );

  const renderCode = () => (
    <>
      <Title
        text={LANGUAGES[user.locale].Profile.CodeAlert}
        color="text-amber-500"
        size="text-sm"
      />
      <Input type="text" placeholder="Code" value={code} handler={setCode} />
      <Button
        text="Send Code"
        disabled={disabledCode()}
        handler={() => handleVerifyCode()}
      />
    </>
  );

  const renderChangeEmail = () => (
    <Form>
      <div className="mb-4 w-full flex flex-col gap-4 justify-center">
        {!showCode ? renderEmail() : renderCode()}
      </div>
    </Form>
  );

  const renderChangePassword = () => (

  <div className="card">
    <div className="card-header">
    {LANGUAGES[user.locale].Profile.ChangePassword}
    </div>
     <div className="card-body">  
    <Form>
      <div className="mb-4 w-full flex flex-col gap-4 justify-center">
        <Input
          type="password"
          placeholder={LANGUAGES[user.locale].Profile.CurrentPassword}
          value={currentPassword}
          handler={setCurrentPassword}
        />
        <Input
          type="password"
          placeholder={LANGUAGES[user.locale].Profile.NewPassword}
          value={newPassword}
          handler={setNewPassword}
          showTooltip
        />
        <Input
          type="password"
          placeholder={LANGUAGES[user.locale].Profile.RepeatNewPassword}
          value={repeatPassword}
          handler={setRepeatPassword}
        />
        <Button
          text={LANGUAGES[user.locale].Profile.ChangePassword}
          disabled={disabledPassword()}
          handler={() => handlePassword()}
        />
      </div>
    </Form>
    </div>
</div>
  );


  const renderChangeTag = () => (
    
      <div className="mb-4 w-full flex flex-col gap-4 justify-center">
      <label className="form-label py-1"> {LANGUAGES[user.locale].Profile.YourExpertise}</label> <span className="req">*</span>
        <Select value={tag} handler={handleChangeUserTag}>            
          {TAGS.map((l) => (
            <option key={l} value={l}>
              {LANGUAGES[user.locale].Tags[l]}
            </option>
          ))}
        </Select>     
        {/* <Button
          text={LANGUAGES[user.locale].Profile.ChangeTag}
          disabled={disabledTag()}
          handler={() => handleUserTag()}
        /> */}
      </div>
   
  );

  const renderChangeLanguage = () => (
     
      <div className="mb-4 w-full flex flex-col gap-4 justify-center">
      <label className="form-label py-1">{LANGUAGES[user.locale].Profile.LanguagePreference}</label>
        <Select value={language} handler={setLanguage}>
          {Object.keys(LANGUAGES).map((l) => (
            <option key={l} value={l}>
              {LANGUAGES[user.locale].Languages[l]}
            </option>
          ))}
        </Select>
        {/* <Button
          text={LANGUAGES[user.locale].Profile.ChangeLanguage}
          disabled={disabledLanguage()}
          handler={() => handleChangeLanguage()}
        /> */}
      </div>
    
  );

  const renderChangeGender = () => (
    
      <div className="mb-4 w-full flex flex-col gap-4 justify-center">
      <label className="form-label py-1">{LANGUAGES[user.locale].Profile.YourGender}</label>
        <Select value={(!gender)?"":gender} handler={setGender}>
          {GENDER.map((l) => (
            <option key={l} value={l}>
              {LANGUAGES[user.locale].Genders[l]}
            </option>
          ))}
        </Select>
        {/* <Button
          text={LANGUAGES[user.locale].Profile.ChangeGender}
          disabled={disabledGender()}
          handler={() => handleChangeGender()}
        /> */}
      </div>
    
  );

  return (
   <div className="container pb-5">     
      <Alert type={alert?.type} text={alert?.text} />
      <Card />
    
      <hr className="m-3"></hr>     
      <div className="grid sm:grid-cols-3 gap-2">  
       <div className="card">
        <div className="card-header">          
          {LANGUAGES[state.lang].Profile.ChangeProfileInfo}
        </div>
        <div className="card-body">   
        <form className=" form-control">
          <div className="row">               
            <div className="col-md-4">
              {renderChangeName()}
            </div>
            <div className="col-md-4">  
              {renderChangeTag()}
            </div>
          
            <div className="col-md-4">  
              {renderChangeGender()}
            </div>
                
            <div className="col-md-4">  
              {renderChangeBirthdate()}
            </div>
            <div className="col-md-4">  
              {renderChangeZip()}
            </div>
            <div className="col-md-4">  
              {renderChangeLanguage()}
            </div>
        </div>

        <Button
          text={LANGUAGES[state.lang].Profile.UpdateProfile}
          disabled={disableProfileButton}
          handler={() => handleProfileInfo(email, language, name, gender, address, birthdate, tag)}
        />       
      </form>
      </div>
      
      </div>
      <hr className="m-2" /> 

      <div className="border border-1 p-3 my-2" id="badges"> 
        <h3 className="profile-name ">{LANGUAGES[user.locale].BadgesLabel}</h3>  
       
         <div className="row">
         <div className="col">
            {voteCounts >0 && (
               <Badge count={voteCounts} label={LANGUAGES[user.locale].Questions.Helped}/>             
            )}           
         </div><div className="col">
            {questionCounts >0 && (            
                <QuestionBadge count={questionCounts} label={LANGUAGES[user.locale].Questions.Asked}/>                  

              )}       
        </div><div className="col">
            {whoHelpedMeCounts >0 && (
               <QuestionBadge count={whoHelpedMeCounts} label={LANGUAGES[user.locale].Questions.WhoHelped}/>   
                

              )}    
              </div>   
        </div>
      </div>

      <hr className="my-3" /> 
        {/* {renderChangePassword()} */}
                      
      </div>
      </div>
  
  );
}