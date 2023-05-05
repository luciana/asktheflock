import React, {useState} from "react";
import { findCounts, formatName } from './../../Helpers';
import Avatar from 'react-avatar';
import FriendModalDialog from './FriendModalDialog';


const Friends = ({votedList, backendQuestions, userId, handleSwitch}) => {
    const [style, setStyle] = useState({});
    const [active, setActive] = useState();
    const [showRelationshipDialog, setShowRelationshipDialog] = useState(false);
    const [showFriendInfo, setShowFriendInfo] = useState([]);
    const maxNumberOfFriends = 4;   
    const minNumberOfFriendsToDisplay = 4;
    let thoseWhoIHelpedCount =[];
    let thoseWhoHelpedMeCount=[];
    let friends=[];

    if (!backendQuestions) return;
    const handleClick = (u, index) => {

      setShowRelationshipDialog(true);
     
      const iHelped = getThoseWhoIHelpedCountFor(u.userID);
      const iWasHelped = getThoseWhoHelpedMeCountFor(u.userID);
      
      if( iHelped && iHelped.length > 0 ){
        u.iHelped = iHelped[0].value;
      }else{
        u.iHelped = 0;
      }      
      if( iWasHelped  && iWasHelped.length > 0){
        u.iWasHelped = iWasHelped[0].value;
      }else{
        u.iWasHelped = 0;
      }

      setShowFriendInfo(u);
      //console.log("setShowFriendInfo", u);
      //console.log("handle click on a friend", u, iHelped, iWasHelped );
      if (active === index) {
        //console.log("item already clicked, set active to blank", active);    
        //this will highlight the box    
        // setStyle(prevState => ({
        //   ...style,
        //   [index]: !prevState[index]
        // }));
        // setActive();
       // handleSwitch(u.id);
      } else { 
        if(active){
          //console.log("an item is already clicked on", index);
          //TODO: clear selection of type active and set index to active
          // setStyle(prevState => ({
          //   ...style,
          //   [active]: !prevState[active]
          // }));
          // setActive(index); 
        }else{
         // console.log("item is clicked on for the first time", active);
         //this is toggle the highlight in the box
          // setStyle(prevState => ({
          //   ...style,
          //   [index]: !prevState[index]
          // }));
          // setActive(index);
        //  handleSwitch(u.id);
        }       
       
      }
    };

    if(backendQuestions.length>0){
      if(votedList && votedList.length>0){
        //Those who I helped the most
        const votedOnQuestions = backendQuestions.filter((questions) => {
            return votedList.some((voted) => {
            return voted.questionID === questions.id&& voted.questionID === questions.id;
                });
            });            
      
       // console.log("votedOnQuestions", votedOnQuestions);
        thoseWhoIHelpedCount = findCounts(votedOnQuestions, "userID", "userName")
                            .sort((a, b) => b.value - a.value)
                            .filter((item, idx) => idx < maxNumberOfFriends)
                            .filter((l) => l.userId !== userId);
      }

      //Those who helped me the most
      const thoseWhoHelpedMe = backendQuestions.filter((backendQuestion) => (               
          (backendQuestion.parentID === null) && backendQuestion.userID === userId && backendQuestion.stats ))
          .map((q) => JSON.parse(q.stats))
          .flat(1)
          .filter((l) => l.userId !== userId);

      //console.log("thoseWhoHelpedMe",thoseWhoHelpedMe);
       // console.log("thoseWhoHelpedMe",thoseWhoHelpedMe);
      if (thoseWhoHelpedMe && thoseWhoHelpedMe.length > 0){
         thoseWhoHelpedMeCount = findCounts(thoseWhoHelpedMe, "userID", "userName")
        .sort((a, b) => b.value - a.value)
        .filter((item, idx) => idx < maxNumberOfFriends);       
      }
    }
   // console.log("thoseWhoIHelpedCount",thoseWhoIHelpedCount);
  //  console.log("thoseWhoHelpedMeCount",thoseWhoHelpedMeCount);
    const showFriendsSection = (thoseWhoHelpedMeCount && thoseWhoHelpedMeCount.length >0) || 
                                (thoseWhoIHelpedCount && thoseWhoIHelpedCount.length >0);

    if (showFriendsSection ){
      
      //fix issue with userID and userId as properties in the two merged arrays
      // this code can be deleted afterwhile.
      // this was created to fix an issue where stat model data used userId and question model data userID
      // const thoseWhoHelpedMeCountCorrected = thoseWhoHelpedMeCount.map(({ userId: userID, userName: userName, value: value }) => ({
      //   userID,
      //   userName,
      //   value,
      // }));
      //console.log("thoseWhoHelpedMeCountCorrected",thoseWhoHelpedMeCountCorrected);

      const mergeResult = [...thoseWhoIHelpedCount, ...thoseWhoHelpedMeCount];
      //console.log("mergeResult",mergeResult);
      if( mergeResult && mergeResult.length > minNumberOfFriendsToDisplay){
        friends = findCounts(mergeResult, "userID", "userName")
                .sort((a, b) => b.value - a.value)                
                .filter((item, idx) => idx < maxNumberOfFriends);       
     
      }      
    }

    const getThoseWhoIHelpedCountFor = (id) =>{  
      return thoseWhoIHelpedCount.filter((item) => item.userID === id);;

    }

    const getThoseWhoHelpedMeCountFor = (id) =>{
      return  thoseWhoHelpedMeCount.filter((item) => item.userID === id);
    }

    //console.log("friends",friends);   
return (
  <div className="">   

    {showFriendsSection && (
      <>          
          {friends && friends.length > 0  && (
            <div className="row align-items-center ">         
              {friends.map((friend, index) => (                
                      <div key={index} 
                      onClick={() => handleClick(friend, index)}  
                       style={{
                        border:"1px 1px",
                        boxShadow: style[`${index}`] 
                          ? " 4px 3px 8px 0px #076AE0" 
                          : ""
                      }}
                      className="col card p-1 m-1">                                
                          <div className=" d-flex align-items-center">
                            <div className="p-2 d-flex">
                            <Avatar size="42" name={friend.userName} 
                                className="rounded-circle mx-auto mb-0 mx-1 align-items-center" 
                                alt={friend.userName} />
                            <div className="ms-2 ">
                              <h6 className="mb-0 d-none d-lg-block">{formatName(friend.userName, 20)}</h6>
                              <div className="badge rounded-pill bg-secondary">{friend.value}</div> 
                              <span className="text-sm d-none d-lg-block"></span>
                            </div>                              
                           </div>
                        </div>                                                   
                </div>             
                                                      
                ))}
            </div>
          )}
          {showRelationshipDialog && ( <FriendModalDialog
                            modelClose={()=>setShowRelationshipDialog(false)}
                            modelShow={showRelationshipDialog}                           
                            item={showFriendInfo}
                         />
                         
          )}

          </>
    )}



   
  </div>
  )
}
export default Friends;