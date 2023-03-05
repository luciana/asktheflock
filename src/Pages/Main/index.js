import React, { useContext } from 'react';
import '../pages.css';
import './../profile-nav.css';
import { AppContext} from '../../Contexts';
import Questions from '../../Components/Questions/Questions';
import { LANGUAGES } from "../../Constants";
import { Alert } from '../../Components';


function Main() {  
  const { state } = useContext(AppContext);
  const { user } = state;
  return (
    <div className="App  ">      
       
        {(!user.name || !user.userTag || !user.gender || !user.address || !user.birthdate) && <Alert type="warning" text={LANGUAGES[state.lang].Profile.CompleteProfile} link="/Profile" />}
        <div className="white-bg container p-2 ">
        <Questions />
        </div>               
        <hr className="m-0"></hr>       
                  
    </div>
  );
}

export default Main;
