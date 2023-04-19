//import { Auth } from 'aws-amplify';
import React, { useContext, useState, useEffect } from 'react';
import '../pages.css';
import './../profile-nav.css';
import { AppContext} from '../../Contexts';
import { Alert, Loading, Button } from '../../Components';
import  {isAdmin, findCounts, formatDateTime}   from '../../Helpers';
import { ROUTES } from "../../Constants";
import { useNavigate, useLocation } from "react-router-dom";
import Queries from "../../Services/queries";
import logo from'../../Assets/Images/logos/logo-image-blue-small.png';
import { Modal } from 'react-bootstrap';
import { GenderStats, GenerationStats, LanguageStats, AgeStats, ExpertStats, LocationStats, WinningStats } from './../../Components/Stats';
import { use } from 'echarts';
import { listenToAuthHub } from '@aws-amplify/ui';

function Admin() {
    const { state } = useContext(AppContext);
    const { user } = state;
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(); 
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const query = new URLSearchParams(useLocation().search);
    const [statData, setStatData] = useState([]);
    const [optionList, setOptionList] = useState([]);
    const [backendQuestions, setBackendQuestions] = useState([]);
    const [showSingleQuestionModal, setShowSingleQuestionModal] = useState(false);
    const [showUserQuestionModal, setShowUserQuestionModal] = useState(false);
    const [showVoteMattersEmail, setShowVoteMattersEmail] = useState(false);
    const [showNeQuestionEmail, setShowNeQuestionEmail] = useState(false);
    const [voteMatterEmailData, setVoteMatterEmailData] = useState({});
    const [newQuestionEmailData, setNewQuestionEmailData] = useState({});
    const [expertOverallMessage, setExpertOverallMessage] = useState(null);
    const [genderOverallMessage, setGenderOverallMessage] = useState(null);
    const [genderWinningMessage, setGenderWinningMessage] = useState(null);
    const [winner, setWinner] = useState(null);
    const [winnerOption, setWinnerOption] = useState(null);
    const [winnerOptionItem, setWinnerOptionItem] = useState(null);
    const [optionWinnerOptionId, setOptionWinnerOptionId] = useState(null);
    const [totalVotes, setTotalVotes] = useState(null);
    const [userData, setUserData] = useState({});
    const [users, setUsers] = useState([]);
    const [openQuestion, setOpenQuestion] = useState([]);
    const [comments, setComments] = useState([]);
    const questionQueryId = query.get("id");    
    const navigate = useNavigate();
    useEffect(() => {   
       check();
     
      }, []);

      const loadQuestions = async () => {
        try{
          setLoading(true);             
          let q = await Queries.GetAllQuestions();              
          if(q){                     

            //closed questions that have has a minimum of stats

            const closedQuestions = q.filter(
              (backendQuestion) => (((new Date() - new Date(backendQuestion.voteEndAt)  > 1 ) 
              && (backendQuestion.parentID === null)) 
              && (JSON.parse(backendQuestion.stats) && JSON.parse(backendQuestion.stats).length) > process.env.REACT_APP_MIN_VOTES_TO_SHOW_STAT
             )).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .sort((a, b) => ((new Date(a.voteEndAt) - new Date() < 1) - (new Date(b.voteEndAt) - new Date() < 1)));

              setBackendQuestions(closedQuestions);           
              
              
              const openQuestions = (q.filter(
                (question) => ((new Date(question.voteEndAt) - new Date() > 1 ))
              ));
              //console.log("openQuestions",openQuestions);
              setOpenQuestion(openQuestions);
          }      
          setLoading(false);
        }catch(err){
          console.error("ADMIN: Loading All Questions from queries error", err);        
          setBackendQuestions([]);
          setLoading(false);
       
        }
      };   

    const check = async () =>{
       const t = await isAdmin();       
       if ( !t ) {
        navigate(ROUTES[user.locale].MAIN);
       }
       getAllUsers(); 
       //getAllVotes();
       getAllComments();
       loadQuestions();
       setIsAuthorized(t);   
      
    }

    const commentsOnQuestion = (question) =>  {
     // console.log("all comments ", comments, question.id);
      const result = comments.filter(
        (comment) => (comment.questionID === question.id)
      );
     // console.log("comments result for one question", result);

      return result && result.length > 0 ? result.length : 0;
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

    const getTotalVotes = (statData) =>{
        let totalVoteCount = 0;
        if (statData) {
            totalVoteCount = statData && statData.length;
        }
        return totalVoteCount;
      }

    const handleSingleQuestionClose = () => {
      setShowSingleQuestionModal(false);     
    }

    const handleUserQuestionClose = () => {
      setShowUserQuestionModal(false);
    }

    const getExpertOverallMessage = (statData) => {
      let expertOverallMessage = null;
      const userQuestionTag = activeQuestion && activeQuestion.questionTag;
      const expertsTags = findCounts(statData, "userTag", "userTag")
      .map((item) => {
            Object.keys(item).map((key) => {
              item[key] = (item[key] == '' ? 'No data' : item[key]); return item[key]
            });
            return item;
        })
        .sort((a, b) => b.value - a.value)
        .filter((fil) => fil.userTag === userQuestionTag)

      // console.log("expertsTags", expertsTags);
        if( expertsTags && expertsTags.length > 0  ){          
              expertOverallMessage = ` You asked for #${userQuestionTag} and ${expertsTags[0].value} people with this expertise helped! `;   
                
        }       
       setExpertOverallMessage(expertOverallMessage);
    }

    const getGenderOverallMessage = (statData) => {
      const allMaleGender = (statData).filter((i) => i.userGender === 'male');
      const allFemaleGender = (statData).filter((i) => i.userGender === 'female');
      const allNonBinaryGender = (statData).filter((i) => i.userGender === 'non-binary');
      const allNoneGender = (statData).filter((i) => i.userGender === '' || !i.userGender);
      const mergeGenderOverallResult = [...allMaleGender, ...allFemaleGender,allNonBinaryGender,allNoneGender];    

      let genderOverallMessage = null;
        if( mergeGenderOverallResult && mergeGenderOverallResult.length > 0  ){
          const f = findCounts(mergeGenderOverallResult, "userName", "userGender")
                  .filter((v)=> v.userName !== undefined)
                  .sort((a, b) => b.value - a.value) 
          
          //must account for duplicated
          if(f.length === 1){
              genderOverallMessage = `Vote was unanimous from ${f[0].userGender} users! Total of ${f[0].value}`;
          }else if (f.length > 1){
              
              genderOverallMessage = `Most of the votes were from ${f[0].userGender} users!`;
          }
        }
       setGenderOverallMessage(genderOverallMessage);
    }

    const getGenderWinningMessage = (statData) => {
     // const optionId = wininingOptionItem && wininingOptionItem.length>0 && wininingOptionItem[0].id;
      const noneGenderListFor =(optionWinnerOptionId) => ((statData).filter((i) => i.optionWinnerOptionId === optionWinnerOptionId && (i.userGender === '' || !i.userGender)));
      const maleGenderListFor =(optionWinnerOptionId) => ((statData).filter((i) => i.optionWinnerOptionId === optionWinnerOptionId && i.userGender === 'male'));
      const femaleGenderListFor =(optionWinnerOptionId) => ((statData).filter((i) => i.optionWinnerOptionId === optionWinnerOptionId && i.userGender === 'female'));
      const nonBinaryGenderListFor =(optionWinnerOptionId) => ((statData).filter((i) => i.optionWinnerOptionId === optionWinnerOptionId && i.userGender === 'non-binary'));
      const mergeGenderOverallResultFor = [...nonBinaryGenderListFor(optionWinnerOptionId), ...femaleGenderListFor(optionWinnerOptionId),noneGenderListFor(optionWinnerOptionId),maleGenderListFor(optionWinnerOptionId)];   
      let genderWinningMessage = null;
        if( mergeGenderOverallResultFor && mergeGenderOverallResultFor.length > 0  ){
          const w = findCounts(mergeGenderOverallResultFor, "userName", "userGender")
                  .filter((v)=> v.userName !== undefined)
                  .sort((a, b) => b.value - a.value) 
          
          //must account for duplicated
          if(w.length === 1){
              genderWinningMessage = `The winning choice got all votes from ${w[0].userGender} users! Total of ${w[0].value}`;
          }else if (w.length > 1){
              
              genderWinningMessage = `Most of the votes for the winning choice were from ${w[0].userGender} users!`;
          }
        }
        setGenderWinningMessage(genderWinningMessage);
    }
  

    const getWinner = (optionList) => {
      setWinnerOption(optionList && Math.max(...optionList.map((o) => o.votes)));
      const winningOption = optionList && Math.max(...optionList.map((o) => o.votes));  
      const wininingOptionItem = optionList && winningOption &&  optionList.filter((i) => i.votes === winningOption ); 
      const winners = wininingOptionItem &&  wininingOptionItem.map((i) => i.text + ' ');
      const optionId = wininingOptionItem && wininingOptionItem.length>0 && wininingOptionItem[0].id;
      setWinner(wininingOptionItem && wininingOptionItem.length === 1 ? wininingOptionItem[0].text : winners);
      setWinnerOptionItem(wininingOptionItem);
      setOptionWinnerOptionId(optionId);
      //console.log("winning values", wininingOptionItem);
    }

  

    const prepareEmail = (question) => {     
      const data = question.stats ? JSON.parse(question.stats) : [];
      const optionList = question.options ? JSON.parse(question.options) : [];  
      setStatData(data);
      setOptionList(optionList);
      setActiveQuestion(question);
      if(data && data.length > 0){    
        setShowSingleQuestionModal(true);
        getWinner(optionList);       
        setTotalVotes(getTotalVotes(data));
        getExpertOverallMessage(data);
        getGenderOverallMessage(data);
        getGenderWinningMessage(data);                
      } 
    }

    const prepareVoteMattersEmail = async ( question ) => {
      setShowVoteMattersEmail(!showVoteMattersEmail);
      const emailData = await getUserInfoForQuestion(question);   
      console.log("emailData for Vote Matter Email", emailData);
      if (emailData.needsAVote > 0) {
        setVoteMatterEmailData(emailData);
      }else{
        setAlert({ type: "error", text: "there are not enough data to send a Vote Matters email. Could be because the user is up to date on voting." });
      }
     
    }

    const prepareNewQuestionEmail = async ( question ) => {
      setShowNeQuestionEmail(!showNeQuestionEmail);
      setNewQuestionEmailData(question);
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

    // const getAllVotes = async () => {
    //   try{
    //     const votes = await Queries.GetAllVotes();
    //    // console.log("all votes", votes);
    //   }catch(error){
    //     console.error("Error getting All Votes", error);
    //   }      
    // }

    const getAllComments = async () => {
      try{
        const comments = await Queries.GetAllComments();
        setComments(comments);
      }catch(error){
        console.error("Error getting All Votes", error);
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
            setShowUserQuestionModal(true);          
        }else{
          setAlert({ type: "error", text: "no data provided" });
        }      
      }catch(error){
        console.error("Error getting user info for question", error);
        setShowUserQuestionModal(false);
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


                <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                  <div className="col m-3 p-3 rounded border-secondary border border-2 bg-light text-dark">
                    <h4>Users</h4> 
                    <span className="text-lg fs-1 text align-self-centerr">{users.length}  </span> 
                  </div>
                  <div className="col m-3 p-3 rounded border-secondary border border-2 bg-light text-dark">
                  <h4>Open Questions</h4> 
                    <span className="text-lg fs-1 text">{openQuestion.length}  </span> 
                  </div>
                  <div className="col m-3 p-3 rounded border-secondary border border-2 bg-light text-dark">
                  <h4>Closed Questions</h4> 
                    <span className="text-lg fs-1 text">{backendQuestions.length}  </span> 
                  </div>     
                  <div className="col m-3 p-3 rounded border-secondary border border-2 bg-light text-dark">
                  <h4>Comments</h4> 
                    <span className="text-lg fs-1 text">{comments && comments.length > 0 ? comments.length : 0}  </span> 
                  </div>                   
                            
                </div>

                <div className="my-3 pb-3">        </div>
                {backendQuestions && (  
                  <>
                  <div className="title">This table shows all the questions that are closed and has enough votes to show meaningful stats.</div>               
                  <table className="table table-sm table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Question</th>
                        <th scope="col">Author</th>
                        <th scope="col">Votes Ended</th>
                        <th scope="col"># of Options</th>     
                        <th scope="col"># Votes</th>  
                        <th scope="col"># Comments</th>  
                        <th scope="col">Email Templates</th>   
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {backendQuestions.map((question) => (
                      <tr key={question.id} >
                      <th scope="row"><strong>{question.text}</strong></th>
                      <td>{question.userName}</td>
                      <td>{formatDateTime(question.voteEndAt)}</td>
                      <td>{JSON.parse(question.options).length}</td>
                      <td>{question.stats && JSON.parse(question.stats).length}</td>
                      <td>{commentsOnQuestion(question)}</td>
                      <td>
                       <button type="button" className="btn btn-outline-dark rounded-pill"                            
                          onClick={()=> prepareEmail(question)}> Results </button>
                        <button type="button" className="btn btn-outline-dark rounded-pill"                            
                          onClick={()=>prepareNewQuestionEmail(question)}> Question </button>
                        <button type="button" className="btn btn-outline-dark rounded-pill"                            
                          onClick={()=>prepareVoteMattersEmail(question)}> Voting </button>                       
                      </td>
                      <td>                
                      <button type="button" className="btn btn-outline-dark rounded-pill"                            
                          onClick={()=>  navigate(`/main/${question.id}/stats`)}> Stats </button>
                       <button type="button" className="btn btn-outline-dark rounded-pill"                            
                          onClick={()=>  userInfo(question)}> User </button>                      
                      </td>
                      </tr>
                    ))}                                         
                    </tbody>
                  </table>
                  </>
                )}
               
               { userData && (
                     <Modal  fullscreen={true} show={showUserQuestionModal} >
                     <Modal.Header closeButton onClick={() => {setShowUserQuestionModal(false)}}>
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
                             onClick={handleUserQuestionClose}
                           >
                             Close
                           </button>                  
                     </Modal.Footer>
                   </Modal>
                )}

                { newQuestionEmailData && (
                   <Modal  fullscreen={true} show={showNeQuestionEmail} >
                   <Modal.Header closeButton onClick={() => {setShowNeQuestionEmail(false)}}>
                     <Modal.Title>Keep the Questions Coming on AskTheFlock.com!</Modal.Title>
                   </Modal.Header>
                   <Modal.Body > 
                    <div className="fs-4 text mb-3">Hey {newQuestionEmailData.userName},</div>

                     <p> It's been a while since we've heard from you, and we're getting a bit worried. We need your help to keep the community buzzing with fresh content.</p>
                      
                     <p> If you have any burning decisions or curious conundrums, we can help. Your fellow flockmates are eagerly waiting to share their thoughts and opinions.</p>

                     <p>  <a href="AskTheFlock.com" className="btn btn-primary my-2">Let Us Help You With A Decision Today</a></p>
                      
                     <p> No question is too big or too small. Whether you're pondering the meaning of life or wondering why your cat always licks its paws, we want to hear from you. </p>
                      
                      <p>So, what are you waiting for? Start typing away, and let's keep the conversation going!      </p>            
                
                  <p>Thanks for your support, </p>
                    <p> LoriKeet <br/>
                    <a href="http://www.asktheflock.com">http://www.asktheflock.com</a></p>
                  </Modal.Body>
                     <Modal.Footer>                                                            
                           <button
                             type="button"
                             className="btn btn-outline-dark rounded-pill"
                             onClick={() => {setShowNeQuestionEmail(false)}}
                           >
                             Close
                           </button>                  
                     </Modal.Footer>
                   </Modal>
                )}

                { voteMatterEmailData && voteMatterEmailData.needsAVote > 0 && (
                    <Modal  fullscreen={true} show={showVoteMattersEmail} >
                    <Modal.Header closeButton onClick={() => {setShowVoteMattersEmail(false)}}>
                      <Modal.Title>Your Vote Matters... and So Do You!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >  
                    <div className="fs-4 text mb-3">Hey {voteMatterEmailData.name},</div>

                    <p>There are {voteMatterEmailData.needsAVote} new opportunities to help others with their decisions on <a href="AskTheFlock.com">AskTheFlock.com</a>. 
                    Your participation is vital! Other people are would appreciate your valuable opnion.</p>

                    
                    <p>So, let's not keep them waiting any longer! Head over to <a href="AskTheFlock.com">AskTheFlock.com</a>, cast your vote, and feel like a hero. You'll be doing your part in helping us make informed decisions and keeping the flock happy.</p>

                    <p>  <a href="AskTheFlock.com" className="btn btn-primary my-2">Start Helping Today</a></p>

                    <p>Thanks for your support, and don't forget to have some fun while you're at it!</p>

                    <p>Best regards, </p>
                    <p> LoriKeet <br/>
                    <a href="http://www.asktheflock.com">http://www.asktheflock.com</a></p>
                    </Modal.Body>
                     <Modal.Footer>                                                            
                           <button
                             type="button"
                             className="btn btn-outline-dark rounded-pill"
                             onClick={() => {setShowVoteMattersEmail(false)}}
                           >
                             Close
                           </button>                  
                     </Modal.Footer>
                   </Modal>
                )}

                
                { activeQuestion && (
                     <Modal  fullscreen={true} show={showSingleQuestionModal} >
                     <Modal.Header closeButton onClick={() => {setShowSingleQuestionModal(false)}}>
                       <Modal.Title>Email Template</Modal.Title>
                     </Modal.Header>
                     <Modal.Body >                              
                     <div className="container m-2 border border-1">
                        <p className="align-center" >We are here to help you with your decision:</p>
                        <p>  {activeQuestion.text} </p>                       
                        <p>  {activeQuestion.userName}, here is  the data to help you finalize your decision. </p>                          
                        <ul>  
                        {winner && (
                             <li>The winning choice was “{winner}” with {(winnerOption/totalVotes)*100}% of the total votes ({winnerOption}/{totalVotes})</li>
                        )}   
                        { expertOverallMessage &&(
                            <li> {expertOverallMessage}</li>
                        )}  
                         { expertOverallMessage &&(
                            <li>A total of xx #parents experts answered. xxx%  of them AGREED with the winning option.</li>
                        )}   
                        {genderOverallMessage && (
                            <li>{genderOverallMessage} </li>
                        )}  

                        {genderWinningMessage && (
                            <li>{genderWinningMessage}</li>
                        )}                   
                            
                        </ul> 
                        <a href={`/main/${activeQuestion.id}/stats`} className="btn btn-primary my-2">Dig into the results details</a>



                         

                        <p className="py-3">Thank you for ASKing THE FLOCK!  We  are looking forward to helping you with your next question.</p>
                        <p>Ask The Flock Team<br/><a href="http://www.asktheflock.com">http://www.asktheflock.com</a></p>
                    </div>                                                
                     </Modal.Body>
                     <Modal.Footer>                                                            
                           <button
                             type="button"
                             className="btn btn-outline-dark rounded-pill"
                             onClick={handleSingleQuestionClose}
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


