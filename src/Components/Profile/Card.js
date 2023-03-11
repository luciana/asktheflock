import { useContext } from "react";
import { Badge, QuestionBadge } from './../../Components/Votes';
import { LANGUAGES } from "../../Constants";
import { AppContext } from "../../Contexts";
import './Card.css';
import { isOwner } from "../../Helpers/owner";
import WebNotification from "../Notification/WebNotification";
import {formatDateTime} from '../../Helpers';

const Card = ({voteCounts, questionCounts, whoHelpedMeCounts}) => {

  const { state } = useContext(AppContext);
  const { user } = state;

 // const userCount = (user.userTag) ? user.userTag.length : 1;
  const isModerator = isOwner(user.email);

  return (

    <>
    <WebNotification />
    <div className="border border-1  p-3 my-2">
   
       <h3 className="profile-name ">{user.name}</h3>  
       <div className="">{user.email}   {isModerator && (<span className="text-sm text-color-green"> (You are a moderator) </span>)}</div>
       <div className="border border-1  p-3 my-2">
        <div className="" >                    
          <div className=" fw-bolder"> 
             {user.userTag && user.userTag.length > 0 && (
                <span className="">
                {LANGUAGES[user.locale].Expertise + " : "}  #{user.userTag}
                </span>           
                )} 
          </div>  
          <div className="fw-bolder"> 
          {user.gender && user.gender.length > 0 && (              
             <div className="">{LANGUAGES[user.locale].Gender + " : "} {user.gender}</div>
           )} 
          </div>  
          <div className="fw-bolder"> 
          {user.address && user.address.length > 0 && (   
            <div className="">{LANGUAGES[user.locale].ZipCode + " : "}{user.address}</div>
            )}
          </div>  
          <div className="fw-bolder"> 
          {user.birthdate && user.birthdate.length > 0 && (   
            <div className="">{LANGUAGES[user.locale].Birth + " : "}{user.birthdate}</div>
          )}
          </div>  
          <div className="fw-bolder">   {LANGUAGES[user.locale].Profile.LanguagePreference + " : "} {LANGUAGES[user.locale].Languages[user.locale]  }</div>       
        <div className="fw-bolder text-sm">{LANGUAGES[user.locale].Profile.Joined} {formatDateTime(user.createdAt)}</div>
      </div>
      </div>
      <div className="border border-1 d-flex p-3 my-2"> 
        <h3 className="profile-name ">{LANGUAGES[user.locale].BadgesLabel}</h3>  
        <div className="row" >
        <div className="col">
        {voteCounts >0 && <Badge count={voteCounts} />}
        </div>
        <div className="col">
          {voteCounts >0 && 
          ( 
            <div className="d-flex flex-row  mt-3"> 
              <span className="number">{voteCounts} <span className="follow">{LANGUAGES[user.locale].Questions.Helped}</span></span> 
            </div>)
        }
        </div>
        <div className="col">
        {questionCounts &&  questionCounts > 0 && (
           <QuestionBadge count={questionCounts} />        
        )}
         </div>
        <div className="col">
          {questionCounts && questionCounts > 0 && (            
            <div className="d-flex flex-row  mt-3"> 
            <span className="number">{questionCounts} <span className="follow">{LANGUAGES[user.locale].Questions.Asked}</span></span> 
          </div>
          )}
        </div>
        <div className="col">
        {whoHelpedMeCounts &&  whoHelpedMeCounts > 0 && (
           <QuestionBadge count={whoHelpedMeCounts} />        
        )}
         </div>
        <div className="col">
          {whoHelpedMeCounts && whoHelpedMeCounts > 0 && (            
            <div className="d-flex flex-row  mt-3"> 
            <span className="number">{whoHelpedMeCounts} <span className="follow">{LANGUAGES[user.locale].Questions.WhoHelped}</span></span> 
          </div>
          )}
        </div>

        </div>
      </div>
      
      </div>
      </>
  );
};

export default Card;