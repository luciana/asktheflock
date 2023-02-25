import React, {useState} from "react";
import { findCounts } from './../../Helpers';
import Avatar from 'react-avatar';

const Friends = ({votedList, backendQuestions, userId, handleSwitch}) => {
    const [style, setStyle] = useState({});
    const [active, setActive] = useState();
    const maxNumberOfFriends = 3;   
    let thoseWhoIHelpedCount =[];
    let thoseWhoHelpedMeCount=[];
    let friends=[];

    const handleClick = (userID, index) => {

      // console.log("active", active);
      // console.log("index", index);
      
      if (active === index) {
        console.log("item already clicked, set active to blank", active);       
        setStyle(prevState => ({
          ...style,
          [index]: !prevState[index]
        }));
        setActive();
        handleSwitch(userID);
      } else { 
        if(active){
          console.log("an item is already clicked on", index);
          //TODO: clear selection of type active and set index to active
          // setStyle(prevState => ({
          //   ...style,
          //   [active]: !prevState[active]
          // }));
          // setActive(index); 
        }else{
          console.log("item is clicked on for the first time", active);
          setStyle(prevState => ({
            ...style,
            [index]: !prevState[index]
          }));
          setActive(index);
          handleSwitch(userID);
        }       
       
      }
    };

    if(backendQuestions.length>0){
      if(votedList.length>0){
        //Those who I helped the most
        const votedOnQuestions = backendQuestions.filter((questions) => {
            return votedList.some((voted) => {
            return voted.questionId === questions.id&& voted.questionId === questions.id;
                });
            });            
      
        thoseWhoIHelpedCount = findCounts(votedOnQuestions, "userID", "userName")
                            .sort((a, b) => b.value - a.value)
                            .filter((item, idx) => idx < maxNumberOfFriends);
      }

      //Those who helped me the most
      const thoseWhoHelpedMe = backendQuestions.filter((backendQuestion) => (               
          (backendQuestion.parentID === null) && backendQuestion.userID === userId && backendQuestion.stats ))
          .map((q) => JSON.parse(q.stats))
          .flat(1)
          .filter((l) => l.userId && l.userName && l.userId !== userId);

       // console.log("thoseWhoHelpedMe",thoseWhoHelpedMe);
      if (thoseWhoHelpedMe && thoseWhoHelpedMe.length > 0){
         thoseWhoHelpedMeCount = findCounts(thoseWhoHelpedMe, "userId", "userName")
        .sort((a, b) => b.value - a.value)
        .filter((item, idx) => idx < maxNumberOfFriends);       
      }
    }
    //console.log("thoseWhoIHelpedCount",thoseWhoIHelpedCount);
   // console.log("thoseWhoHelpedMeCount",thoseWhoHelpedMeCount);
    const showFriendsSection = (thoseWhoHelpedMeCount && thoseWhoHelpedMeCount.length >0) || (thoseWhoIHelpedCount && thoseWhoIHelpedCount.length >0);

    if (showFriendsSection ){
      
      //fix issue with userID and userId as properties in the two merged arrays
      // this code can be deleted afterwhile.
      // this was created to fix an issue where stat model data used userId and question model data userID
      const thoseWhoHelpedMeCountCorrected = thoseWhoHelpedMeCount.map(({ userId: userID, userName: userName, value: value }) => ({
        userID,
        userName,
        value,
      }));
      //console.log("thoseWhoHelpedMeCountCorrected",thoseWhoHelpedMeCountCorrected);

      const mergeResult = [...thoseWhoIHelpedCount, ...thoseWhoHelpedMeCountCorrected];
      //console.log("mergeResult",mergeResult);
      friends = findCounts(mergeResult, "userID", "userName")
                .sort((a, b) => b.value - a.value)
                .filter((item, idx) => idx < maxNumberOfFriends);
      console.log("friends",friends);
    }

    const displayName = (name) => {
      const maxChars = 15;
      if ( name.length > maxChars){
        return name.substring(0, maxChars-3)+'...';
      }else if ( name.length === maxChars){
        return name;
      }else{
       return name;
      }
  
    }
   
   
return (
  <div className="container">   

    {showFriendsSection && (
      <>          
          {friends && friends.length > 0  && (
            <div className="row align-items-center ">         
              {friends.map((u, index) => (                
                      <div key={index} 
                       onClick={() => handleClick(u.userID, index)}  
                       style={{
                        border:"1px 1px",
                        boxShadow: style[`${index}`] 
                          ? " 4px 3px 8px 0px #076AE0" 
                          : ""
                      }}
                      className="col card p-1 m-1">                                
                          <div className=" d-flex align-items-center">
                            <div className="p-2 d-flex">
                            <Avatar size="48" name={u.userName} 
                                className="rounded-circle mx-auto mb-0 mx-1 align-items-center" 
                                alt={u.userName} />
                                <div className="ms-2 d-none d-lg-block">
                                    <h6 className="mb-0">{displayName(u.userName)}</h6>
                                </div>
                                </div>
                                </div>                                                   
                            </div>             
                                                      
                ))}
            </div>
          )}
          </>
    )}
  </div>
  )
}
export default Friends;