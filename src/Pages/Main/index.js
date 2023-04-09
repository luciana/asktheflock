import React, { useContext, useState, useEffect } from 'react';
import '../pages.css';
import './../profile-nav.css';
import { AppContext} from '../../Contexts';
import Questions from '../../Components/Questions/Questions';
import { LANGUAGES } from "../../Constants";
import { Alert } from '../../Components';


function Main() {  
  const { state } = useContext(AppContext);
  const { user } = state;
  const [alert, setAlert] = useState({});

  console.log("user info ", user);
  const showProfileMissingMessage = () => {
    if (user.userTag && (!user.gender || user.gender === "") && user.address && user.birthdate){
      console.log("only gender is missing");
      setAlert({ type: "warning", text: LANGUAGES[user.locale].Profile.OnlyGenderMissing, link: "/Profile"});  
    }else if (user.userTag && user.gender && (!user.address || user.address === "") && user.birthdate){
      console.log("only address is missing");
      setAlert({ type: "warning", text: LANGUAGES[user.locale].Profile.OnlyAddressMissing, link: "/Profile"});  
    }else if (user.userTag && user.gender && user.address && (!user.birthdate || user.birthdate === "")){
      console.log("only birthday is missing");
      setAlert({ type: "warning", text: LANGUAGES[user.locale].Profile.OnlyBirthdayMissing, link: "/Profile"});  
    }else if ((!user.userTag || user.userTag === "") && user.gender && user.address && user.birthdate){
      console.log("only expert Tag is missing");
      setAlert({ type: "warning", text: LANGUAGES[user.locale].Profile.OnlyExpertTagMissing, link: "/Profile"});  
    }else{
      console.log("generic profile missing message");
      setAlert({ type: "warning", text: LANGUAGES[user.locale].Profile.CompleteProfile, link: "/Profile"});  
    }
  }

  useEffect(() => {
    showProfileMissingMessage();     
  }, []);
  
  return (
    <div className="App  ">      
        
                             
        <div className="white-bg container p-2 ">
        <Alert type={alert?.type} text={alert?.text} link={alert?.link} />
        {/* <QuestionAndPoll2 user={user}  /> */}
        <Questions />
        </div>               
        <hr className="m-0"></hr>       
                  
    </div>
  );
}

export default Main;
