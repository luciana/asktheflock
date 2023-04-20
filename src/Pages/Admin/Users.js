//import { Auth } from 'aws-amplify';
import React, { useContext, useState, useEffect } from 'react';
import '../pages.css';
import './../profile-nav.css';
import { AppContext} from '../../Contexts';
import { Alert, Loading } from '../../Components';
import  {isAdmin, formatDateTime}   from '../../Helpers';
import { ROUTES } from "../../Constants";
import { useNavigate } from "react-router-dom";
import Queries from "../../Services/queries";
import { Modal } from 'react-bootstrap';


function Admin() {
    const { state } = useContext(AppContext);
    const { user } = state;
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(); 
    const [isAuthorized, setIsAuthorized] = useState(false);
  
   
    const [showUserUserModal, setShowUserUserModal] = useState(false);

    const [users, setUsers] = useState([]);
    const [openQuestion, setOpenQuestion] = useState([]);
    const [userData, setUserData] = useState([]);  
    const navigate = useNavigate();
    useEffect(() => {   
       check();
     
      }, []);
    const check = async () =>{
       const t = await isAdmin();       
       if ( !t ) {
        navigate(ROUTES[user.locale].MAIN);
       }
       getAllUsers();     
       setIsAuthorized(t);   
      
    }

    const numberOfOpenQuestionsSinceThatIhaventVoted = (lastLoggedIn, questionsVoted) => {   

      let votedList = [];
      if (questionsVoted){
        votedList = questionsVoted.map((m)=> m.questionId);
      }

      let result = [];
      if( lastLoggedIn && lastLoggedIn !== "") {
         result = openQuestion.filter(
          (question) => (
              (lastLoggedIn  - new Date(question.createdAt) > 1) 
               &&(!votedList.includes(question.id)) 
               && (question.userID !== user.id)
              )
        );
      }
       
     // console.log("numberOfOpenQuestionsSince", result);  
      return result;
           
    }

    const getAllUsers = async () => {
      try{
        const users= await Queries.GetAllUsers();
       // console.log("all users", users);
        setUsers(users);
      }catch(error){
        console.error("Error getting All Users", error);
      }      
    }

    const getUserInfoForQuestion = async(question)=>{
      try{
        const userId = question.userID;  
        const userName = question.userName;
        const messages = [];
        let votesByUserId = [];
        let userData =[];
        if( users ) {         
          userData = users.filter((u) => u.id === userId)[0];
        }
        if( userId) {              
         console.log("user id to get votes count" , userId);
         votesByUserId = await Queries.GetVotesByUserId(userId);
         console.log("get votes by userid", votesByUserId);
        }
        if (userData  ){
          const userVotes = userData.votes ? JSON.parse(userData.votes) : votesByUserId;
          if(userData.votes) messages.push({type:"vote", text:"user.vote is not empty yet. It means that user hasn't migrated to the new Voting table"});
          const loggedInDate = userData.lastLoggedIn ? userData.lastLoggedIn : "";
          const loggedInCount = userData.loggedInCount ? userData.loggedInCount : 0;

          let openQuestions = numberOfOpenQuestionsSinceThatIhaventVoted(
            loggedInDate, 
            userVotes);
          //console.log("openQuestions", openQuestions);
          const needsAVote =  ( openQuestions || openQuestions.length !== 0 ) ? openQuestions : 0;  
          const voteCount = ( userVotes.length > 0 ) ? userVotes.length : 0;
          return {
            name: userName,
            expert: userData.userTag,
            email:  userData.email,
            votes: voteCount,
            messages: messages,
            needsAVote: needsAVote.length,
            loggedInDate: loggedInDate,
            loggedInCount: loggedInCount,
          }          
        }else{
          return null;         
        }      
      }catch(error){
        console.error("Error Getting User Info Object For A Question", error);
        return null;
      }
    }

    const userInfo = async(question) => {      
      try{
         const userInfoObject = await getUserInfoForQuestion(question);           
        if( userInfoObject){
            setUserData(userInfoObject);
            setAlert();            
        }else{
          setAlert({ type: "error", text: "no data provided" });
        }      
      }catch(error){
        console.error("Error getting user info", error);
        setShowUserUserModal(false);
      }
    }

    return (
    <section className="App container ">
     {loading && <Loading />}
      <Alert type={alert?.type} text={alert?.text} />

      <div className="">      
            { isAuthorized  && (
             <div className="white-bg container p-2 ">
                <Alert type="error" text="THIS IS AN ADMIN PAGE - USE WISELY!" />   


                <div className="my-3 pb-3">        </div>
                {users && (  
                  <>
                  <div className="title">This table shows all the users currently registered.</div>               
                  <table className="table table-sm table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Logged in Count</th>
                        <th scope="col">Last Logged In</th>   
                        <th scope="col">Expertise</th>                                                
                      </tr>
                    </thead>  
                    <tbody>
                    {users.map((user) => (
                      <tr key={user.id} >
                      <th scope="row"><strong>{user.name}</strong></th>
                      <td>{user.email}</td>
                      <td>{user.loggedInCount}</td>
                      <td>{formatDateTime(user.lastLoggedIn)}</td>                     
                      <td>{user.userTag}</td>                                        
                      </tr>
                    ))}                                         
                    </tbody>
                  </table>
                  </>
                )}
               
               { userData && (
                     <Modal  fullscreen={true} show={showUserUserModal} >
                     <Modal.Header closeButton onClick={() => {setShowUserUserModal(false)}}>
                       <Modal.Title>User Info</Modal.Title>
                     </Modal.Header>
                     <Modal.Body >  
                     <p>  {userData.name} </p>
                     <p>  {userData.email} </p>
                     <p>  {userData.userTag} </p>
                     <p>  Last Logged In on {userData.loggedInDate}</p>
                     <p>  Logged in {userData.loggedInCount} time(s)</p>
                     <p>  Contributed {userData.votes} votes.</p>
                     <p>  {userData.needsAVote} new question(s) have been posted since last time you helped someone ( = voted for a question on this site).</p>

                    <p></p>
                    <div> Messages for Internal use only:</div>
                    {userData.messages && (

                      <div className="alert alert-warning">
                       { userData.messages.map((m) => m.text)}
                      </div>
                    )}
                   

                    </Modal.Body>
                     <Modal.Footer>                                                            
                           <button
                             type="button"
                             className="btn btn-outline-dark rounded-pill"
                             onClick={()=> setShowUserUserModal(false)}
                           >
                             Close
                           </button>                  
                     </Modal.Footer>
                   </Modal>
                )}

            
            </div> 
            
            
            )}          
      </div>     
     
    </section>
      )}
    

export default Admin;


