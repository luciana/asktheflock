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

  const showProfileMissingMessage = () => {
    if (user.userTag && (!user.gender || user.gender === "") && user.address && user.birthdate){
     // console.log("only gender is missing");
      setAlert({ type: "warning", text: LANGUAGES[user.locale].Profile.OnlyGenderMissing, link: "/Profile"});  
    }else if (user.userTag && user.gender && (!user.address || user.address === "") && user.birthdate){
     // console.log("only address is missing");
      setAlert({ type: "warning", text: LANGUAGES[user.locale].Profile.OnlyAddressMissing, link: "/Profile"});  
    }else if (user.userTag && user.gender && user.address && (!user.birthdate || user.birthdate === "")){
     // console.log("only birthday is missing");
      setAlert({ type: "warning", text: LANGUAGES[user.locale].Profile.OnlyBirthdayMissing, link: "/Profile"});  
    }else if ((!user.userTag || user.userTag === "") && user.gender && user.address && user.birthdate){
     // console.log("only expert Tag is missing");
      setAlert({ type: "warning", text: LANGUAGES[user.locale].Profile.OnlyExpertTagMissing, link: "/Profile"});  
    }else if(!user.userTag || user.userTag === "") {
      // console.log("expert tag is empty - and other field(s) too");
       setAlert({ type: "warning", text: LANGUAGES[user.locale].Profile.OnlyExpertTagMissing, link: "/Profile"});  
    }else if(!user.address || user.address === "") {
        // console.log("address is empty - and other field(s) too");
         setAlert({ type: "warning", text: LANGUAGES[user.locale].Profile.OnlyAddressMissing, link: "/Profile"}); 
    }else if(!user.gender || user.gender === "") {
          // console.log("gender is empty - and other field(s) too");
           setAlert({ type: "warning", text: LANGUAGES[user.locale].Profile.OnlyGenderMissing, link: "/Profile"});  
    }else if(!user.userTag || !user.gender || !user.address || !user.birthdate){
     // console.log("generic profile missing message");
      setAlert({ type: "warning", text: LANGUAGES[user.locale].Profile.CompleteProfile, link: "/Profile"});  
    }
  }

  useEffect(() => {
    showProfileMissingMessage();     
  }, []);
  
  return (
    <div className="App">                            
        <div className="white-bg container p-2 ">
          <Alert type={alert?.type} text={alert?.text} link={alert?.link} />      
          <Questions />
        </div>               
        <hr className="m-0"></hr>                         
    </div>
  );
}

export default Main;
