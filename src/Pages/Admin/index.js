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

function Admin() {
    const { state } = useContext(AppContext);
    const { user } = state;
    const [loading, setLoading] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const query = new URLSearchParams(useLocation().search);
    const [statData, setStatData] = useState([]);
    const [optionList, setOptionList] = useState([]);
    const [backendQuestions, setBackendQuestions] = useState([]);
    const [showSingleQuestionModal, setShowSingleQuestionModal] = useState(false);
    const [showUserQuestionModal, setShowUserQuestionModal] = useState(false);
    const [expertOverallMessage, setExpertOverallMessage] = useState(null);
    const [genderOverallMessage, setGenderOverallMessage] = useState(null);
    const [genderWinningMessage, setGenderWinningMessage] = useState(null);
    const [winner, setWinner] = useState(null);
    const [winnerOption, setWinnerOption] = useState(null);
    const [winnerOptionItem, setWinnerOptionItem] = useState(null);
    const [optionWinnerOptionId, setOptionWinnerOptionId] = useState(null);
    const [totalVotes, setTotalVotes] = useState(null);
    const [userData, setUserData] = useState([]);
    const [openQuestion, setOpenQuestion] = useState([]);
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
              setBackendQuestions(q.filter(
                (backendQuestion) => (((new Date() - new Date(backendQuestion.voteEndAt)  > 1 ) 
                && (backendQuestion.parentID === null)) 
               // && (JSON.parse(backendQuestion.stats) && JSON.parse(backendQuestion.stats).length) > process.env.REACT_APP_MIN_VOTES_TO_SHOW_STAT
               )
              )            
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .sort((a, b) => ((new Date(a.voteEndAt) - new Date() < 1) - (new Date(b.voteEndAt) - new Date() < 1))));   
              
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
       loadQuestions();
       setIsAuthorized(t);    
    }

    const numberOfOpenQuestionsSinceThatIhaventVoted = (lastUsed, questionsVoted) => {   

      let votedList = [];
      if (questionsVoted){
        votedList = questionsVoted.map((m)=> m.questionId);
      }

       const result = openQuestion.filter(
          (question) => (
              (lastUsed  - new Date(question.createdAt) > 1) 
               &&(!votedList.includes(question.id)) 
               && (question.userID !== user.id)
              )
        );
      console.log("numberOfOpenQuestionsSince", result);  
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

    const userInfo = async (question) => {
      const userId = question.userID;  
      const userName = question.userName;
      try{
        let userData = await Queries.GetUserById(userId);
        let needsAVote = numberOfOpenQuestionsSinceThatIhaventVoted(
          new Date(user.updatedAt), 
          JSON.parse(user.votes));
       
        if ( !needsAVote || needsAVote.length === 0 ) needsAVote = 0;       
        const voteCount = (JSON.parse(userData.votes) && JSON.parse(userData.votes).length > 0 ) ? JSON.parse(userData.votes).length : 0;
        console.log("needs a vote",needsAVote);
        if ( userData) {
          setUserData({
            name: userName,
            expert: userData.userTag,
            email:  userData.email,
            votes: voteCount,
            needsAVote: needsAVote.length,

          });
          setShowUserQuestionModal(true);
        } 

      }catch(error){
        console.error("Error getting user info for question", error);
        setShowUserQuestionModal(false);
      }
    }

    return (
    <section className="App ">
     {loading && <Loading />}
      <Alert type={alert?.type} text={alert?.text} />

      <div className="">      
            { isAuthorized  && (
             <div className="white-bg container p-2 ">
                <Alert type="error" text="THIS IS AN ADMIN PAGE - USE WISELY!" />            
                {backendQuestions && (  
                  <>
                  <div className="title">This table shows all the questions that are closed with has enough votes to show meaningful stats.</div>               
                  <table className="table table-sm table-hover">
                  <thead>
                      <tr>
                        <th scope="col">Question</th>
                        <th scope="col">Author</th>
                        <th scope="col">Votes Ended</th>
                        <th scope="col"># of Options</th>     
                        <th scope="col"># Votes</th>     
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
                      <td>
                      <button type="button" className="btn btn-outline-dark rounded-pill"                            
                          onClick={()=> prepareEmail(question)}> Prepare Email </button>
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
                     <p>  {userData.email} </p>
                     <p>  {userData.userTag} </p>
                     <p>  {userData.votes} votes you have contributed so far.</p>
                     <p>  {userData.needsAVote} new question(s) have been posted since last time you helped someone ( = voted for a question on this site).</p>

                    

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
                )};
                { activeQuestion && (
                     <Modal  fullscreen={true} show={showSingleQuestionModal} >
                     <Modal.Header closeButton onClick={() => {setShowSingleQuestionModal(false)}}>
                       <Modal.Title>Email Template</Modal.Title>
                     </Modal.Header>
                     <Modal.Body >                              
                     <div className="container m-2 border border-1">
                        <p className="align-center" >We are here to help you with your decision:</p>
                        <p>  {activeQuestion.text} </p>
                        <p>  <img src={logo} /></p>
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


                        <table className="table table-sm table-hover">                  
                        <tbody>
                      
                          <tr>                        
                          <td> <WinningStats  dataInput={optionList} total={totalVotes}/>   </td>
                          <td>  <GenderStats dataInput={statData} optionId={null} /> </td>
                          <td> <LanguageStats dataInput={statData} optionId={null} />      </td>                          
                          </tr>                                                             
                        </tbody>
                      </table>

                         

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
    ;

export default Admin;


