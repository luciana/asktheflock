import { useState, useEffect, useContext } from "react";
import Question from "./Question";
import { Loading, Alert, Switch, Friends }  from '../../Components';
import Queries from "../../Services/queries";
import Mutations from "../../Services/mutations";
import { AppContext} from '../../Contexts'; 
import { LANGUAGES, ROUTES, TYPES } from "../../Constants";
import { findGeneration, findAge } from "../../Helpers";
import { useLocation } from "react-router-dom";
import { Modal } from 'react-bootstrap';


const Questions = () => {
    const [backendQuestions, setBackendQuestions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [votedList, setVotedList] = useState([]);
    const [votedOptionsList, setVoteOptionsdList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isVoteFilterChecked, setIsVoteFilterChecked] = useState(false);  
    const [isQuestionFilterChecked, setIsQuestionFilterChecked] = useState(false);   
    const [isFriendQuestionFilterChecked, setIsFriendQuestionFilterChecked] = useState(false);  
    const [isAlreadyVotedFilterChecked , setIsAlreadyVotedFilterChecked] = useState(false);
    const [questionFilteredList, setQuestionFilteredList] =    useState([]);
    const [voteFilteredList, setVoteFilteredList] =    useState([]);
    const [alreadyVotedFilterList, setAlreadyVotedFilterList] = useState([]);
    
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
         
          //direct link to question - queryString id
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
              ).sort(
              (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            ));
          
          // initial setFilter list is the same as backendquestions retrieved from the server.
              setFilterList(q.filter(
                (backendQuestion) => ((backendQuestion.parentID === null) )
              ).sort(
              (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            ));
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

      
        loadQuestions();
        loadVotes();
        loadSingleQuestion();                                    
      }, [user ]);
       
        
      const mergeArrayOfObjects = (original, newdata, selector = 'key') => {
        newdata.forEach(dat => {
          const foundIndex = original.findIndex(ori => ori[selector] == dat[selector]);
          if (foundIndex >= 0) original.splice(foundIndex, 1, dat);
              else original.push(dat);
        });
      
        return original;
      };

      const handleAlreadyVotedFilterSwitch = () => {
        setIsAlreadyVotedFilterChecked(!isAlreadyVotedFilterChecked);  
             
        if(!isAlreadyVotedFilterChecked){
          // already voted switch is on
          const myVotes = JSON.parse(user.votes);
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
             //all three swithes are on 
             console.log("all three swithes are on "); 
             const filterListTwoArrays = mergeArrayOfObjects(voteFilteredList,questionFilteredList, 'id'); 
             const filterListArray = mergeArrayOfObjects(filterListTwoArrays,haventVotedYet, 'id'); 
             setFilterList(filterListArray);
          }else if(!isQuestionFilterChecked && isVoteFilterChecked){  
             //already voted switch and my questions are on, and open questions is off
             console.log("already voted switch and my questions are on, and open questions is off"); 
             const filterListArray = mergeArrayOfObjects(haventVotedYet,questionFilteredList, 'id'); 
             setFilterList(filterListArray);
          }else if(isQuestionFilterChecked && !isVoteFilterChecked){  
             //already voted switch and open questions are on, and my questionss is off
             console.log("already voted switch and open questions are on, and my questionss is off"); 
             const filterListArray = mergeArrayOfObjects(haventVotedYet,voteFilteredList, 'id'); 
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
            const filterListArray = mergeArrayOfObjects(voteFilteredList,questionFilteredList, 'id');          
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
            //all three swithes are on 
            console.log("all three swithes are on "); 
            const filterListTwoArrays = mergeArrayOfObjects(voteFilteredList,questionFilteredList, 'id'); 
            const filterListArray = mergeArrayOfObjects(filterListTwoArrays,alreadyVotedFilterList, 'id'); 
            setFilterList(filterListArray);
          } else if(isQuestionFilterChecked && !isAlreadyVotedFilterChecked){      
            console.log("open questions and my questions swithes are on and already voted is off") ;    
            // const filterFromTwoArrays = questionFilteredList.filter(
            //   (backendQuestion) => ((backendQuestion.parentID === null) &&                               
            //                         (new Date(backendQuestion.voteEndAt) - new Date() > 1 ) ) //open questions
            //   ).sort(
            //     (a, b) =>
            //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            //   );                         
            //   console.log("both switches are on (my questions first then open questions next)");
            //   if(filterFromTwoArrays){
            //     setFilterList(filterFromTwoArrays);   
            //    }else{
            //     setFilterList([]);   
            //    }
              const filterListArray = mergeArrayOfObjects(questionFilteredList,voteFilteredList, 'id'); 
              setFilterList(filterListArray);
            } else if(!isQuestionFilterChecked && isAlreadyVotedFilterChecked){     
              console.log("open questions and already swithes are on and my questions is off");
              const filterListArray = mergeArrayOfObjects(questionFilteredList,alreadyVotedFilterList, 'id'); 
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
            const filterListArray = mergeArrayOfObjects(alreadyVotedFilterList,questionFilteredList, 'id');                     
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
              console.log("all three swithes are on "); 
              const filterListTwoArrays = mergeArrayOfObjects(voteFilteredList,q, 'id'); 
              const filterListArray = mergeArrayOfObjects(filterListTwoArrays,alreadyVotedFilterList, 'id'); 
              setFilterList(filterListArray);
            }else if(!isVoteFilterChecked && isAlreadyVotedFilterChecked){ 
              console.log(" my question  and already voted questions switches are on, and open question switch is off"); 
              const filterListArray = mergeArrayOfObjects(q,alreadyVotedFilterList, 'id'); 
              setFilterList(filterListArray);

            }else if(isVoteFilterChecked && !isAlreadyVotedFilterChecked){     
              console.log(" my question  and open questions switches are on, and already voted switch is off");                                     
            //  const filterFromTwoArrays = voteFilteredList.filter(
            //   (backendQuestion) => ((backendQuestion.parentID === null) && 
            //                         ( backendQuestion.userID === user.id) ) //my questions
            //                        // (new Date(backendQuestion.voteEndAt) - new Date() > 1 ))  //open questions
            //   ).sort(
            //     (a, b) =>
            //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            //   );             
  
            //  console.log("both switches are on (open questions first then my questions next)");
            //  if(filterFromTwoArrays){
            //   setFilterList(filterFromTwoArrays);   
            //  }else{
            //   setFilterList([]);   
            //  }
              const filterListArray = mergeArrayOfObjects(q,voteFilteredList, 'id'); 
              setFilterList(filterListArray);
                    
            }else{
              console.log("only this swith is on");
              setFilterList(q); 
            }           
          }else{       
            //my questions switch is off        
            if(isVoteFilterChecked && isAlreadyVotedFilterChecked ){ 
              console.log("my questions swtich is off and open questions and already voted switch are on");  
              const filterListArray = mergeArrayOfObjects(alreadyVotedFilterList,voteFilteredList, 'id');                     
              setFilterList(filterListArray);

            }else if(!isVoteFilterChecked && isAlreadyVotedFilterChecked ){    
              console.log("my questions and open questions switches are off and already voted switch is on");     
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

        //Update Stats
        let statsInQuestion = [];
        if (question.stats) {
          statsInQuestion = JSON.parse(question.stats);
        };     
         let stat ={};
         stat.optionId = optID;
         stat.userID = user.id;
         stat.userName = user.name;
         stat.userTag = user.userTag;
         stat.userGender = user.gender;       
         stat.userAddress = user.address;

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
     



          let q = await Mutations.UpdateQuestionOptions(
            question.id,
            JSON.stringify(optionsInQuestion),
            JSON.stringify(newStatsArray),
          );

          const newA = [];  
          newA.push(q);          
          const updatedBackendQuestions =  backendQuestions.map(obj => newA.find(o => o.id === obj.id) || obj);
         // console.log("Questions.js updatedBackendQuestions result", updatedBackendQuestions);        
          setBackendQuestions(updatedBackendQuestions);
          setActiveQuestion(null);             
        }catch(err){
          console.error("Mutations.UpdateQuestion error", err);
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

      const handleVote = async (question, option, userVote) =>{                     
        try{
        

         setLoading(true);         
         updateQuestion(question, option);
         updateUserVotes(userVote);
         setLoading(false);     
         
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
      
      const showNoQuestions = filterList.length === 0;



      return ( 
        <>
            {loading && <Loading />}
            {( !loading && showNoQuestions ) && <Alert type="warning" text={LANGUAGES[state.lang].Questions.NoQuestionsPosted} link={ROUTES[state.lang].NEW_QUESTION} />}          
            <div className="row border border-1 ">
              <div className=" col">
                { backendQuestions && backendQuestions.length > 0 && (
                  <Switch label={LANGUAGES[state.lang].Questions.FilterOpenQuestionLabel}
                    handleSwitch={handleVoteFilterSwitch}/> 
                  )}
              </div>
              <div className=" col">             
                { backendQuestions && backendQuestions.length > 0 && (   
                  <Switch label={LANGUAGES[state.lang].Questions.FilterMyQuestionsLabel}
                    handleSwitch={handleQuestionFilterSwitch}/>   
                )}
              </div>     
              <div className=" col">             
                { backendQuestions && backendQuestions.length > 0 && (   
                  <Switch label={LANGUAGES[state.lang].Questions.FilterAlreadyVotedLabel}
                    handleSwitch={handleAlreadyVotedFilterSwitch}/>   
                )}
              </div>           
            </div>     
            <div className=" ">{(!loading) && <Friends votedList={votedList} 
                                        backendQuestions={backendQuestions} 
                                        userId={user.id}
                                        handleSwitch={handleFriendsQuestionFilterSwitch}/>}
              </div>
              <div id="all-questions" className=" ">
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
                            onClick={()=> {setShowSingleQuestionModal(false)}}
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