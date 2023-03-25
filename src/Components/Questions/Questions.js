import { useState, useEffect, useContext } from "react";
import Question from "./Question";
import { Loading, Alert, Switch, Friends }  from '../../Components';
import QuestionAndPoll2 from '../../Components/Questions/QuestionAndPoll2';
import Queries from "../../Services/queries";
import Mutations from "../../Services/mutations";
import { AppContext} from '../../Contexts'; 
import { LANGUAGES, ROUTES, TYPES } from "../../Constants";
import { findGeneration, findAge } from "../../Helpers";
import { inBoth } from "../../Helpers/arrayComparison";
import { Routes, useLocation, useNavigate } from "react-router-dom";
import { Modal } from 'react-bootstrap';



const Questions = () => {
    const [backendQuestions, setBackendQuestions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [votedList, setVotedList] = useState([]);
    const [votedOptionsList, setVoteOptionsdList] = useState([]);
    const [isFriendQuestionFilterChecked, setIsFriendQuestionFilterChecked] = useState(false);  
    const [loading, setLoading] = useState(false);
    const [isVoteFilterChecked, setIsVoteFilterChecked] = useState(false);  
    const [isQuestionFilterChecked, setIsQuestionFilterChecked] = useState(false);   
    const [isAlreadyVotedFilterChecked , setIsAlreadyVotedFilterChecked] = useState(false);
    const [questionFilteredList, setQuestionFilteredList] =    useState([]);
    const [voteFilteredList, setVoteFilteredList] =    useState([]);
    const [alreadyVotedFilterList, setAlreadyVotedFilterList] = useState([]);
    const [myVotes, setMyVotes] = useState([]);
    const navigate = useNavigate();
    const { state, dispatch } = useContext(AppContext);
    const { user } = state;
    const [filterList, setFilterList]= useState([]);
    const [showSingleQuestionModal, setShowSingleQuestionModal] = useState(false);
    const query = new URLSearchParams(useLocation().search);
    const questionQueryId = query.get("id");    

    useEffect(() => {


      const loadSingleQuestion = async () => {
        try{
          setLoading(true);       
         
          //direct link to question - queryString id - URL paramenters
          if (questionQueryId){                   
            const singleQuestion = await Queries.GetSingleQuestion(questionQueryId);
            if(singleQuestion){
              setActiveQuestion(singleQuestion);  
              setShowSingleQuestionModal(true);        
            } 
          }else{
            setActiveQuestion(null); 
            setShowSingleQuestionModal(false);
          }                       
          setLoading(false);
        }catch(err){
          console.error("Questions.js Loading Single Question from queries error", err);
          setActiveQuestion(null);    
          setShowSingleQuestionModal(false);          
        }
      }

      const loadQuestions = async () => {
        try{
          setLoading(true);     
         

          let q = await Queries.GetAllQuestions();
          if(q){
              setBackendQuestions(q.filter(
                (backendQuestion) => ((backendQuestion.parentID === null) )
              )            
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .sort((a, b) => ((new Date(a.voteEndAt) - new Date() < 1) - (new Date(b.voteEndAt) - new Date() < 1)))); 
          
          // initial setFilter list is the same as backendquestions retrieved from the server.
              setFilterList(q.filter(
                (backendQuestion) => ((backendQuestion.parentID === null) )
              )
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .sort((a, b) => ((new Date(a.voteEndAt) - new Date() < 1) - (new Date(b.voteEndAt) - new Date() < 1))));           
          }
         
          
          
          setLoading(false);
        }catch(err){
          console.error("Questions.js Loading Questions from queries error", err);
        
          setBackendQuestions([]);
          setLoading(false);
         // alert("Error getting all the questions from database");
        }
      };
    
      const loadVotes = async () => {
        try{
          if(user.votes) {
            let votes = JSON.parse(user.votes);
            setVotedList(votes);                    
            const newArray = [];            
            for (let i = 0; i < votes.length; i++) {
              newArray.push(votes[i].optionId);
            }
            setVoteOptionsdList(newArray);
          }; 
        }catch(err){
          console.error("Questions.js Loading Votes from queries error", err);
          setBackendQuestions([]);
          setLoading(false);
          //alert("Error getting question voltes from database");
        }
      };

      const loadMyVotes = () => {
        setMyVotes(JSON.parse(user.votes));
      }
      
        loadQuestions();
        loadVotes();
        loadSingleQuestion();    
        loadMyVotes();                                
      }, [user,setFilterList ]);
      

      

      const handleAlreadyVotedFilterSwitch = () => {
        setIsAlreadyVotedFilterChecked(!isAlreadyVotedFilterChecked);  
             
        if(!isAlreadyVotedFilterChecked){
          // already voted switch is on
          //const myVotes = JSON.parse(user.votes);
          const myVotesList = myVotes.map((p) => p.questionId);      
          const haventVotedYet = filterList.filter(
                (backendQuestion) => ( !myVotesList.includes(backendQuestion.id) &&
                                      (backendQuestion.parentID === null))
            ).sort(
              (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );             
          setAlreadyVotedFilterList(haventVotedYet);
          setFilterList(haventVotedYet);   

         
          if(isQuestionFilterChecked && isVoteFilterChecked){     
            console.log("Already voted clicked - all three swithes are on "); 
            const filterListTwoArrays = inBoth(voteFilteredList,questionFilteredList);              
            const filterListArray = inBoth(filterListTwoArrays,haventVotedYet);        
            setFilterList(filterListArray);
           
          }else if(!isQuestionFilterChecked && isVoteFilterChecked){  
             //already voted switch and my questions are on, and open questions is off
             console.log("already voted switch and open questions are on, and my question is off"); 
             const filterListArray =  inBoth(haventVotedYet,voteFilteredList); 
             setFilterList(filterListArray);
          }else if(isQuestionFilterChecked && !isVoteFilterChecked){  
             //already voted switch and open questions are on, and my questionss is off
             console.log("already voted switch and my questions are on, and open questionss is off"); 
             const filterListArray =  inBoth(haventVotedYet,questionFilteredList); 
             setFilterList(filterListArray);
          }else{
             //only already voted switch is on
             console.log("only already voted switch is on");  
             setFilterList(haventVotedYet);     
          }

        }else{
          //already voted switch is off         
          if(isQuestionFilterChecked && isVoteFilterChecked){  
            console.log("already voted switch is off, my questions and open questions switch are on");  
            const filterListArray =  inBoth(voteFilteredList,questionFilteredList);          
            //console.log("dfafilterListArray", filterListArray);
            setFilterList(filterListArray);
          }else if(!isQuestionFilterChecked && isVoteFilterChecked){  
            console.log("already voted switch and my questions are off, and open questions switch is on");  
            setFilterList(voteFilteredList);
          }else if(isQuestionFilterChecked && !isVoteFilterChecked){  
            console.log("already voted switch and open questions are off, and my questions switch is on"); 
            setFilterList(questionFilteredList);
          }else{
            //both switches are off
            console.log("all switches are off");  
            setFilterList(backendQuestions); 
          }
         
        }
      }

      const handleVoteFilterSwitch = () => {               
          setIsVoteFilterChecked(!isVoteFilterChecked);  
             
          if(!isVoteFilterChecked){
            // open questions filter
            const v = filterList.filter(
             (backendQuestion) => (((new Date(backendQuestion.voteEndAt) - new Date() > 1 ) 
                           && (backendQuestion.parentID === null)) )
             ).sort(
               (a, b) =>
               new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
             ); 
             setVoteFilteredList(v);                      
          
          if(isQuestionFilterChecked && isAlreadyVotedFilterChecked){              
            console.log("Open questions clicked - all three swithes are on "); 
            const filterListTwoArrays =  inBoth(v,questionFilteredList);           
            const filterListArray =  inBoth(filterListTwoArrays,alreadyVotedFilterList);                  
            setFilterList(filterListArray);
          } else if(isQuestionFilterChecked && !isAlreadyVotedFilterChecked){      
            console.log("open questions and my questions swithes are on and already voted is off") ;           
            const filterListArray =  inBoth(questionFilteredList,v); 
            setFilterList(filterListArray);
            } else if(!isQuestionFilterChecked && isAlreadyVotedFilterChecked){     
              console.log("open questions and already swithes are on and my questions is off");
              const filterListArray =  inBoth(v,alreadyVotedFilterList); 
              setFilterList(filterListArray);

            }else if(!isQuestionFilterChecked && !isAlreadyVotedFilterChecked){  
              //only this switch is on
              console.log("only open questions swich is on");  
              setFilterList(v);                     
            }        
           
         }else{
          //vote switch is off
          if(isQuestionFilterChecked && isAlreadyVotedFilterChecked){
            console.log("question switch and already voted switches are on and open questions is off");                  
            const filterListArray =  inBoth(alreadyVotedFilterList,questionFilteredList);                     
            setFilterList(filterListArray);

         }else if(isQuestionFilterChecked && !isAlreadyVotedFilterChecked){
            console.log("question switch is on and open questions and already voted switches are off");          
            setFilterList(questionFilteredList);
          }else if(!isQuestionFilterChecked && isAlreadyVotedFilterChecked){
            console.log("question switch and open questions are off and already voted switch is on ");  
            setFilterList(alreadyVotedFilterList);
          }else{
            //all switches are off
            console.log("all switches are off");  
            setFilterList(backendQuestions); 
          }
         }                                   
        }; 

      

        const handleQuestionFilterSwitch =() => {    
          setIsQuestionFilterChecked(!isQuestionFilterChecked);       
          if(!isQuestionFilterChecked){                      
            //my questions switch is on
            const q = filterList.filter(
              (backendQuestion) => ((backendQuestion.parentID === null) && 
                                    ( backendQuestion.userID === user.id) )
              ).sort(
                (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );
            setQuestionFilteredList(q);             
           
            if(isVoteFilterChecked && isAlreadyVotedFilterChecked){ 
              console.log("My questions clicked - all three swithes are on "); 
              const filterListTwoArrays =  inBoth(voteFilteredList,q); 
              const filterListArray =  inBoth(filterListTwoArrays,alreadyVotedFilterList);                
              setFilterList(filterListArray);
            }else if(!isVoteFilterChecked && isAlreadyVotedFilterChecked){ 
              console.log(" my question  and already voted questions switches are on, and open question switch is off"); 
              const filterListArray =  inBoth(q,alreadyVotedFilterList); 
              setFilterList(filterListArray);

            }else if(isVoteFilterChecked && !isAlreadyVotedFilterChecked){     
              console.log(" my question  and open questions switches are on, and already voted switch is off");                                                
             const filterListArray =  inBoth(q,voteFilteredList); 
             setFilterList(filterListArray);
                    
            }else{
              console.log("only my question swith is on");
              setFilterList(q); 
            }           
          }else{       
            //my questions switch is off        
            if(isVoteFilterChecked && isAlreadyVotedFilterChecked ){ 
              console.log("my questions swtich is off and open questions and already voted switch are on");  
              const filterListArray =  inBoth(alreadyVotedFilterList,voteFilteredList);                     
              setFilterList(filterListArray);

            }else if(!isVoteFilterChecked && isAlreadyVotedFilterChecked ){    
              console.log("my questions and open questions switches are off and already voted switch is on", alreadyVotedFilterList);     
              setFilterList(alreadyVotedFilterList);

            }else if(isVoteFilterChecked && !isAlreadyVotedFilterChecked ){
             console.log("my questions and already voted switch are off and vote switch is on");            
             setFilterList(voteFilteredList);

            }else{
              //all switches are off
              console.log("all switches are off");
              setFilterList(backendQuestions); 
            }
          }         
        }
        
        const handleFriendsQuestionFilterSwitch = (userID) => {
          setIsFriendQuestionFilterChecked(!isFriendQuestionFilterChecked);          
          if(!isFriendQuestionFilterChecked){
            if (!userID || userID === "") return;          
            //questions by user id
            const q = filterList.filter(
              (backendQuestion) => ((backendQuestion.parentID === null) && 
                                    ( backendQuestion.userID === userID) )
              ).sort(
                (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );
            setQuestionFilteredList(q);   
            setFilterList(q);
          }   
        }
      const getReplies = (questionId) =>{       
        return backendQuestions
        .filter((backendQuestion) => backendQuestion.parentId === questionId)
        .sort(
            (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );}

   
      const updateStats = async(question, optID, optionsInQuestion) => {
        try{
          //Update Stats
        let statsInQuestion = [];
        if (question.stats) {
          statsInQuestion = JSON.parse(question.stats);
        };     
         let stat ={};
         stat.optionId = optID;
         stat.userID = user.id;
         stat.userName = user.name;
         stat.userTag = user.userTag  ? user.userTag : '';      
         stat.userGender = user.gender ? user.gender : '';       
         stat.userAddress = user.address ? user.address : '';    

         if(user.birthdate){        
         stat.userBirthdate = user.birthdate;
         stat.userAge =  findAge(new Date(user.birthdate));
         stat.userGen = findGeneration(new Date(user.birthdate));
        }else{
          stat.userBirthdate = "";
          stat.userAge =  "";
          stat.userGen ="";
        }
         stat.userLanguage = user.locale;
         const newStatsArray = [...statsInQuestion];
         newStatsArray.push(stat);   
         return await Mutations.UpdateQuestionOptions(
            question.id,
            JSON.stringify(optionsInQuestion),
            JSON.stringify(newStatsArray),
          );
        }catch(err){
          console.error("Mutations.UpdateQuestionOptions error", err);
          return null;
        } 
        


      }

      const updateQuestionVoteTime = async (question, voteEndAt) => {

        try{
          
          const updatedQuestions = await Mutations.UpdateQuestionVoteEndAt(
            question.id,
            voteEndAt,
          );
                  
          const newA = [];             
          if(updatedQuestions){
            newA.push(updatedQuestions);                             
          }       
          const updatedBackendQuestions =  backendQuestions.map(obj => newA.find(o => o.id === obj.id) || obj);
          setBackendQuestions(updatedBackendQuestions);
          setFilterList(updatedBackendQuestions);

        }catch(err){
          console.error("Mutations.UpdateQuestion voteEndAt error", err);
          return null;        
        }
      }

      const updateQuestion = async (question, option) => {       
        if(! question.options) return; //TODO: alert

        //Update Options
        let optionsInQuestion = JSON.parse(question.options);
        let optID = option.id;        
        try{        
          if (optionsInQuestion && optionsInQuestion.length >0 ){
            if (optID){
              for (var i = 0, len = optionsInQuestion.length; i < len; i++) {               
                if (optionsInQuestion[i].id === optID){
                  optionsInQuestion[i] = option;      
                  break;
                }
              }            
            }
          }
          const newA = [];  
          const stats = updateStats(question, optID, optionsInQuestion);   
          if(stats){
            newA.push(stats);                             
          }       
          const updatedBackendQuestions =  backendQuestions.map(obj => newA.find(o => o.id === obj.id) || obj);
          // console.log("Questions.js updatedBackendQuestions result", updatedBackendQuestions);        
           setBackendQuestions(updatedBackendQuestions);
           setActiveQuestion(null);     
         
        }catch(err){
          console.error("Mutations.UpdateQuestion error", err);
        } 
      };

      const addQuestion = async (question) => {       
        try{
          setLoading(true);  
          const text = question.text;
          const parentID = question.parentId;
          const questionTag = question.questionTag;
          const userID = question.userId;
          const voteEndAt = question.voteEndAt;
          const sentiment = question.sentiment;
          const options  = JSON.stringify(question.options);
          const userName = user.name;
                      
          let q = await Mutations.CreateQuestion(
            text, 
            userID,
            voteEndAt,
            sentiment,
            userName,
            parentID,
            questionTag,
            options
          );
          

          const updatedBackendQuestions = [...backendQuestions];
          updatedBackendQuestions.push(q);          


          setBackendQuestions(updatedBackendQuestions.filter(
            (backendQuestion) => ((backendQuestion.parentID === null) )
          )
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .sort((a, b) => ((new Date(a.voteEndAt) - new Date() < 1) - (new Date(b.voteEndAt) - new Date() < 1)))); 

          setFilterList(updatedBackendQuestions.filter(
            (backendQuestion) => ((backendQuestion.parentID === null) )
          )
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .sort((a, b) => ((new Date(a.voteEndAt) - new Date() < 1) - (new Date(b.voteEndAt) - new Date() < 1)))); 
        
          setLoading(false);    
   
        }catch(err){
          console.error("Error on Mutations.CreateQuestion ", err);
        }        
      };

      const deleteQuestion = async (id) => {
        if (window.confirm("Are you sure you want to remove question?")) {
          try{        
            setLoading(true);  
            await Mutations.DeleteQuestion(
              id             
            );

            const updatedBackendQuestions = backendQuestions.filter(
                  (backendQuestion) => backendQuestion.id !== id
                );
            setBackendQuestions(updatedBackendQuestions);
            setFilterList(updatedBackendQuestions);
            setLoading(false);  

          } catch (err){
            setLoading(false); 
            console.error("Error on deleteQuestion ", err);
          }        
        }
      };
      const updateUserVotes = async (userVote) =>{        
        try{                
          let userVotes = [];
          if (user.votes) userVotes = JSON.parse(user.votes);
          userVotes.push(userVote);
          //user.votes = "[{\"optionId\":3942,\"questionId\":\"7998615d-88dd-427a-a20f-1a2851d009b3\"}]"


         
          let userVotesUpdated = await Mutations.UpdateUserVotes(
            user.id,
            JSON.stringify(userVotes)
          );
      
         
         
          dispatch({ type: TYPES.UPDATE_USER, payload: userVotesUpdated });
         
        }catch(err){
          console.error("Mutations.UpdateUserVotes Error ", err);
        }      
      }

      const clearUrlParamsAfterVote = () => {
        console.log("there is a id param after vote, must clear it");
        if (questionQueryId ){
          navigate(ROUTES[user.locale].MAIN);
        }
      }

      const handleVote = async (question, option, userVote) =>{                     
        try{
        

         setLoading(true);         
         updateQuestion(question, option);
         updateUserVotes(userVote);
         setLoading(false);     
         clearUrlParamsAfterVote();
         
        }catch(err){
          console.error("Error on handleVote ", err);
        }      
      }

      const updateVotedList = (item) => {    
        setVotedList(votedList => {           
          const newArray = [...votedList];
          newArray.push(item);
          return newArray;
        });        
      }

      const updateVotedOptionsList = (id) => {    
        setVoteOptionsdList(votedOptionsList => {           
          const newArray = [...votedOptionsList];
          newArray.push(id);
          return newArray;
        });        
      }
      
      const handleSingleQuestionClose = () => {
        setShowSingleQuestionModal(false);
        navigate(ROUTES[user.locale].MAIN);
      }
      
      const showNoQuestions = filterList.length === 0;
      return ( 
        <>
            {loading && <Loading />}
            {( !loading && showNoQuestions ) && <Alert type="warning" text={LANGUAGES[state.lang].Questions.NoQuestionsPosted} link={ROUTES[state.lang].NEW_QUESTION} />}          
            
            <QuestionAndPoll2 user={user} addQuestion={addQuestion} />

             {/* Friends Sections    */}
             <div className="white-bg px-2 ">
                {(!loading) && <Friends votedList={votedList} 
                                        backendQuestions={backendQuestions} 
                                        userId={user.id}
                                        handleSwitch={handleFriendsQuestionFilterSwitch}/>}
              </div>


            {/* Question Filter Section */}
            <div className="white-bg border border-1 mt-2 ">
                <div className="d-flex align-items-start">
                  <div className="p-2 flex-fill">
                  { backendQuestions && backendQuestions.length > 0 && (
                    <Switch label={LANGUAGES[state.lang].Questions.FilterOpenQuestionLabel}
                      handleSwitch={handleVoteFilterSwitch}/> 
                    )}        
                </div>      
                <div className="p-2 flex-fill">                         
                  { backendQuestions && backendQuestions.length > 0 && (   
                    <Switch label={LANGUAGES[state.lang].Questions.FilterAlreadyVotedLabel}
                      handleSwitch={handleAlreadyVotedFilterSwitch}/>   
                  )} 
                  </div>       
                  <div className="p-2 flex-fill">                   
                  { backendQuestions && backendQuestions.length > 0 && (   
                      <Switch label={LANGUAGES[state.lang].Questions.FilterMyQuestionsLabel}
                        handleSwitch={handleQuestionFilterSwitch}/>   
                    )}
                  </div>                
                  
              </div>           
            </div>  

           
            {/* Question List Section */}
              <div id="all-questions" className="py-1 my-1">
                  {filterList.map((rootQuestion) => (
                      <Question 
                          key={rootQuestion.id}
                          question={rootQuestion}
                          //replies={getReplies(rootQuestion.id)}                        
                          //setActiveQuestion={setActiveQuestion}
                          //activeQuestion={activeQuestion}   
                          handleVote={handleVote}
                          updateVotedList={updateVotedList}
                          updateVotedOptionsList={updateVotedOptionsList}
                          votedList={votedList}
                          votedOptionsList={votedOptionsList}
                          //openQuestion={openQuestion}      
                          updateQuestionVoteTime={updateQuestionVoteTime}                                        
                          deleteQuestion={deleteQuestion}
                          updateQuestion={updateQuestion}                        
                          user={user}
                      />
                  ))}
              </div>   


              { ( activeQuestion ) && (
                  <Modal  fullscreen={true} show={showSingleQuestionModal} >
                    <Modal.Header closeButton onClick={() => {setShowSingleQuestionModal(false)}}>
                      <Modal.Title>{activeQuestion.text}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >                              
                        <Question 
                            key={activeQuestion.id}
                            question={activeQuestion}                                                                      
                            handleVote={handleVote}
                            updateVotedList={updateVotedList}
                            updateVotedOptionsList={updateVotedOptionsList}
                            votedList={votedList}
                            votedOptionsList={votedOptionsList}
                          // openQuestion={openQuestion}                                       
                            deleteQuestion={deleteQuestion}
                            updateQuestion={updateQuestion}                        
                            user={user}
                        />                                                 
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
              
       
        </>
      );
};

export default Questions;