import { useState, useEffect, useContext, useCallback, useSelector } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Question from "./Question";
import QuestionAndPoll from './QuestionAndPoll';
import { Modal } from 'react-bootstrap';
import { Loading, Alert, Switch, Friends }  from '../../Components';
import { AppContext} from '../../Contexts'; 
import { LANGUAGES, ROUTES, TYPES } from "../../Constants";
import { findGeneration, findAge } from "../../Helpers";
import { inBoth } from "../../Helpers/arrayComparison";
import Queries from "../../Services/queries";
import Mutations from "../../Services/mutations";
import {subscribeToQuestion} from "../../Services/Subscriptions";
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';
import { Hub } from 'aws-amplify';

const Questions = () => {
    const [backendQuestions, setBackendQuestions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [isFriendQuestionFilterChecked, setIsFriendQuestionFilterChecked] = useState(false);  
    const [loading, setLoading] = useState(false);
    const [isVoteFilterChecked, setIsVoteFilterChecked] = useState(false);  
    const [isQuestionFilterChecked, setIsQuestionFilterChecked] = useState(false);   
    const [isAlreadyVotedFilterChecked , setIsAlreadyVotedFilterChecked] = useState(false);
    const [questionFilteredList, setQuestionFilteredList] =    useState([]);
    const [voteFilteredList, setVoteFilteredList] =    useState([]);
    const [alreadyVotedFilterList, setAlreadyVotedFilterList] = useState([]);
    const navigate = useNavigate();
    const { state, dispatch } = useContext(AppContext);
    const { user, myVotes, questions } = state;
    const [alert, setAlert] = useState(); 
    const [filterList, setFilterList]= useState([]);
    const [showSingleQuestionModal, setShowSingleQuestionModal] = useState(false);
    const query = new URLSearchParams(useLocation().search);
    const questionQueryId = query.get("id");    
    
    const loadQuestions = useCallback(() => { 
        //console.log("about to load questions");
        try{
          setLoading(true);         
          let priorConnectionState = ConnectionState;
          Hub.listen('api', (data) => {
            const { payload } = data;
            if (payload.event === CONNECTION_STATE_CHANGE) {
              const connectionState = payload.data.connectionState;
              console.log(connectionState);
            }
          });            
            Hub.listen("api", (data) => {
              const { payload } = data;
              if (
                payload.event === CONNECTION_STATE_CHANGE
              ) {
            
                if (priorConnectionState === ConnectionState.Connecting && payload.data.connectionState === ConnectionState.Connected) {
                    fetchQuestions();
                }
                priorConnectionState = payload.data.connectionState;
              }
            });
          setLoading(false);
        }catch(err){
          console.error("Questions.js Loading Questions from queries error", err);        
          setBackendQuestions([]);
          setFilterList([]);
          setLoading(false);        
        }
      }, []); 

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

    useEffect(() => {    
      const initQuestions = async () => {
        try {   
          await loadQuestions();
          subscribeToQuestion(dispatch);
        }catch(error){
          console.error("Error on init questions", error);
        }
      }
      initQuestions();
      loadSingleQuestion();
    }, [loadQuestions]); //tells React to execute the load method on first mount.
      
   
      const fetchQuestions = async () => {       
        setLoading(true);      
        let q = await Queries.GetAllQuestions();         
        if(q){        
          const questions = q.filter(
            (backendQuestion) => ((backendQuestion.parentID === null) )
          )            
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .sort((a, b) => ((new Date(a.voteEndAt) - new Date() < 1) - (new Date(b.voteEndAt) - new Date() < 1)));

            // initial setFilter list is the same as backendquestions retrieved from the server.
          setBackendQuestions(questions);                  
          setFilterList(questions);      
            
          dispatch({type: TYPES.ADD_QUESTIONS, payload: questions});
          setLoading(false);
        }
      }
      
      const handleAlreadyVotedFilterSwitch = () => {
        setIsAlreadyVotedFilterChecked(!isAlreadyVotedFilterChecked);  
             
        if(!isAlreadyVotedFilterChecked){
          // already voted switch is on     
          const myVotesList = myVotes.map((p) => p.questionId);      
          //console.log("my Votes needed for handleAlreadyVotedFilterSwitch ", myVotes);
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
            //console.log("Already voted clicked - all three swithes are on "); 
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

   
      const prepStatData = (question, user, optID) => {

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
         return newStatsArray;

        }catch(error){
          console.error("Error in prep Stat data for update", error);
          return null;
        }

      }

      const updateStatsAndOptionsInQuestionTable = async(question, optionsInQuestion, statsInQuestion) => {     
        try{        
          return await Mutations.UpdateQuestionOptions(
            question.id,
            JSON.stringify(optionsInQuestion),
            JSON.stringify(statsInQuestion),
          );                   
          }catch(error){
            console.error("Mutations.UpdateQuestionOptions error", error);
            navigate(ROUTES[user.locale].MAIN);
            return null;
          }   

      }


      const getComment = async(questionID) => {       
        const result  = await Queries.GetCommentsByQuestionId(questionID );                
        return result && result.length > 0 ? result : null;          
      }

      const createComment = async(questionID,userID,optionID,optionText,comment) =>{
        try{ 
         //console.log("comment array to create",questionID, userID, optionID, optionText,comment);
          await Mutations.CreateComment(
            questionID,
            userID,
            optionID,
            optionText,
            JSON.stringify(comment),                    
          )        
        }catch(error){
          console.error("Error on creating comments", error);
          setAlert({ type: "error", text: "Oops, we couldn't save your comment. Please try it again in a moment or contact support@asktheflock.com" });
         }
      }

      const createVote = async ( userID, userName, questionID, optionID, checkInTable, question)=>{
        try{

          let itemAlreadyInVoteTable = [];
          //logic to present duplicates in Vote table 
          console.log("checking if should create new vote item, myVote context", myVotes);
          if(checkInTable || !myVotes){
            //this is used during the migration or when myVotes context is not available
            console.log("checking by looking directly at the table");
            const myVotesFromTable =  await Queries.GetVotesByUserId(userID);
          //  console.log("what is myVotesFromTable" , myVotesFromTable);
            if(myVotesFromTable && myVotesFromTable.length > 0){           
              itemAlreadyInVoteTable = myVotesFromTable.filter((vote) => vote.questionID === questionID);
              console.log("checking by looking at db directly. Is it already voted?", itemAlreadyInVoteTable);   
            }           
          }else{
            //after migration is completed, we just check the context if a vote is already registered                 
            itemAlreadyInVoteTable = myVotes.filter((vote) => vote.questionID === questionID);
            console.log("checking by looking at save context. Is it already voted?", itemAlreadyInVoteTable);    
          }
           if(!itemAlreadyInVoteTable || itemAlreadyInVoteTable.length === 0){              
              const result =  await Mutations.CreateVote(
                userID,
                userName,
                questionID,
                optionID
              );
              let myVotesArray = myVotes ? myVotes : [];
              myVotesArray.push(result);              
              dispatch({ type: TYPES.UPDATE_VOTES, payload: myVotesArray });  
              if(question){
                updateQuestionOptions(question, optionID); 
              }                          
            }else{
              setAlert({ type: "error", text: "Wait a minute! You already gave your opnion on this question. It won't be counted." });
            } 
        }catch(error){
          console.error("Error on creating vote", error);      
          console.log("do not create new vote in table because it  exist in Vote table already - question", questionID);
          setAlert({ type: "error", text: "Uh-oh, we couldn't save your opnion. Please try it again in a moment or contact support@asktheflock.com" });
        }
      }

      const updateStats = (question, optID, optionsInQuestion) => {          
        const statsInQuestion = prepStatData(question, user, optID);    

        return updateStatsAndOptionsInQuestionTable(question, optionsInQuestion, statsInQuestion);        
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

      const updateQuestionOptions = async (question, optionID) => {            

        if(! question.options) return; //TODO: alert
        if(! optionID ) return; //TODO: alert
    
        //Update Options
        let optionsInQuestion = JSON.parse(question.options);             
         try{            
          let updatedOption = optionsInQuestion.filter((f) => f.id === optionID)[0];
          if ( updatedOption ){
            // console.log("updatedOption to compare to count from database", optionsInQuestion);       
            const votesByOptionId = await Queries.GetVotesByOptionId(optionID);           
            const voteCount = votesByOptionId && votesByOptionId.length ? votesByOptionId.length : 0;
            //console.log("voteCount from database to add to updatedOption ", voteCount);
            updatedOption.votes = voteCount;
            //console.log("updatedOption from database", updatedOption);   

            if ( updatedOption.votes ){
              for (var i = 0, len = optionsInQuestion.length; i < len; i++) {               
                  if (optionsInQuestion[i].id === optionID){
                    optionsInQuestion[i] = updatedOption;      
                    break;
                  }
              }
             }
           // console.log("item to update options with votes ", optionsInQuestion);
            const questionUpdated = updateStats(question, optionID, optionsInQuestion);    
            console.log("question updated", questionUpdated);
            setActiveQuestion(questionUpdated);
          }else{
            console.error("No update to option votes happened");
          }
        
         
        }catch(err){
          console.error("updateQuestionOptions error", err);
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
            options,      
          );          
                       
          if(q){
            setBackendQuestions(state?.questions);                  
            setFilterList(state?.questions);              
            // const updatedBackendQuestions = [...backendQuestions];
            // updatedBackendQuestions.push(q);          

            // console.log("add question setting state", updatedBackendQuestions);
  
            // setBackendQuestions(updatedBackendQuestions.filter(
            //   (backendQuestion) => ((backendQuestion.parentID === null) )
            // )
            // .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            // .sort((a, b) => ((new Date(a.voteEndAt) - new Date() < 1) - (new Date(b.voteEndAt) - new Date() < 1)))); 
  
            // setFilterList(updatedBackendQuestions.filter(
            //   (backendQuestion) => ((backendQuestion.parentID === null) )
            // )
            // .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            // .sort((a, b) => ((new Date(a.voteEndAt) - new Date() < 1) - (new Date(b.voteEndAt) - new Date() < 1)))); 
          
            setLoading(false); 
          }else{
            console.error("Error on Mutations.CreateQuestion ");
            setLoading(false); 
          }        
   
        }catch(err){
          console.error("Error on Mutations.CreateQuestion ", err);
        }        
      };

      const deleteVotes = async ( id ) => {
        try{

          const votes = await Queries.GetVotesByQuestionId(id);
         // console.log("votes to be deleted for this question id", id, votes);

          if (votes && votes.length>0) {
            votes.map((item)=>{       
            //  console.log("iterating thru votes to be deleted ", item);             
              Mutations.DeleteVote(item.id);                               
            });        
            dispatch({ type: TYPES.UPDATE_VOTES, payload: null }); 
            
           }    
           return true;      
         
        }catch ( error ){
          console.error("Error on delete Vote ", error);
          return false;
        }
      }

      const deleteComments = async ( id ) => {
        try{

          const comments = await Queries.GetCommentsByQuestionId(id);
         // console.log("comments to be deleted for this question id", id, comments);

          if (comments && comments.length>0) {
            comments.map((item)=>{       
              //console.log("iterating thru comments to be delete ", item);             
              Mutations.DeleteComment(item.id);                           
            });                 
           
           }    
           //there are no comments 
           return true;      
        }catch ( error ){
          console.error("Error on delete Comments ", error);
          return false;
        }
      }

      const deleteQuestion = async (id) => {
        if (window.confirm("Are you sure you want to remove question?")) {
          try{        
            setLoading(true);  
           

            const successVoteDeletion = deleteVotes(id);
            
            const successCommentDeletion = deleteComments(id);

            if (successVoteDeletion && successCommentDeletion ) {              
                await Mutations.DeleteQuestion(
                id             
              );
            }
             

            const updatedBackendQuestions = filterList.filter(
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

      const getVotesByUserID = async(userID) =>{
        const myVotes = await Queries.GetVotesByUserId(userID);
        return (myVotes && myVotes.length > 0 ) ? myVotes : null;
      }

      //this is used during the migration only
      const migratingUserVotesToVoteTable = async(userVotes)=> {
        try{
           //check if this user has votes in the vote model
          // console.log("about to get votes in Votes table for ", user.id);
          const votesByUserId = await Queries.GetVotesByUserId(user.id);
         // console.log("get votes by userid in vote table", votesByUserId);
          let optionItemsNotYetInVoteModel =[];

          if(votesByUserId && votesByUserId.length > 0 ){
          //  console.log("there are some votes for this user in the vote model");          
            //get list of optionsId that user has voted and it is stored in vote model
            const optionIDInVoteModel = votesByUserId.map((v)=> v.optionID);           
            optionItemsNotYetInVoteModel = userVotes.filter((v) => !optionIDInVoteModel.includes(v.optionId));
          }else{
           // console.log("there are NO votes for this user in the vote model");    
            optionItemsNotYetInVoteModel = userVotes;
          }
         // console.log("optionItemsNotYetInVoteModel", optionItemsNotYetInVoteModel);
          
          if (optionItemsNotYetInVoteModel && optionItemsNotYetInVoteModel.length>0) {
              optionItemsNotYetInVoteModel.map((item)=>{       
                 console.log("migration process:iterating thry optionItemsNotYetInVoteModel ", item);             
                  createVote(user.id, user.name, item.questionId, item.optionId, true, null);          
                       
            });               
            //console.log("empty user votes in user table");
            let userVotesUpdated = await Mutations.UpdateUserVotes(
              user.id,
              null
            ); 
           // console.log("user votes in user table is updated to empty", userVotesUpdated);
            dispatch({ type: TYPES.UPDATE_USER, payload: userVotesUpdated });
          }        
         
        }catch(error){
          console.error("Error migrating user votes to vote table", error);
        }
       
       
      }

      const updateUserVotes = async(userVote) =>{        
        try{                
          let userVotes = [];
         
          userVotes = JSON.parse(user.votes);          
          userVotes.push(userVote);
         // console.log("updateUserVotes", userVotes);
          
          let userVotesUpdated = await Mutations.UpdateUserVotes(
            user.id,
            JSON.stringify(userVotes)
          );         
         
          dispatch({ type: TYPES.UPDATE_USER, payload: userVotesUpdated });
         
          if (userVotesUpdated){
           // console.log("mutation updated in user.vote with",userVotesUpdated);          
            if(JSON.parse(user.votes) && JSON.parse(user.votes).length > 0){
              console.log("initiate migration");
              migratingUserVotesToVoteTable(userVotes);    
            }  
          }        
        }catch(err){
          console.error("Mutations.UpdateUserVotes Error ", err);
        }      
      }

      const clearUrlParamsAfterVote = () => {
       // console.log("there is a id param after vote, must clear it");
        if (questionQueryId ){
          navigate(ROUTES[user.locale].MAIN);
        }
      }

      const handleVote = async (question, userVote) =>{                     
        try{      
         setLoading(true);         
        

       // console.log("does user has user votes entries", user.votes);
         if (user.votes) {
         // console.log("user vote has NOT been emptied from the migration - update user vote and migrate");
          updateUserVotes( userVote);
         }else{
          console.log("user vote has been emptied from the migration. just create item in votes table");
           await createVote(user.id, user.name, question.id, userVote.optionId, false, question);  
              
         }
         
         setLoading(false);     
         clearUrlParamsAfterVote();
         
        }catch(err){
          console.error("Error on handleVote ", err);
        }      
      }
      
      const handleSingleQuestionClose = () => {
        setShowSingleQuestionModal(false);
        navigate(ROUTES[user.locale].MAIN);
      }      
      const showNoQuestions = questions?.length === 0;
      return ( 
        <>
            {loading && <Loading />}
            <Alert type={alert?.type} text={alert?.text} />
            {( !loading && showNoQuestions ) && <Alert type="warning" text={LANGUAGES[state.lang].Questions.NoQuestionsPosted} link={ROUTES[state.lang].NEW_QUESTION} />}          
            
             {/* New Question Section    */}
            <QuestionAndPoll user={user} addQuestion={addQuestion} />

             {/* Friends Sections    */}
             <div className="white-bg px-2 ">
                {(!loading) && <Friends votedList={myVotes} 
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
                  {state?.questions?.map((rootQuestion) => (
                      <Question 
                          key={rootQuestion.id}
                          question={rootQuestion}                       
                          handleVote={handleVote}                                                 
                          updateQuestionVoteTime={updateQuestionVoteTime}                                        
                          deleteQuestion={deleteQuestion}
                          //updateQuestion={updateQuestionOptions}  
                          createComment={createComment}                      
                          getComment={getComment}                                                              
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
                            updateQuestionVoteTime={updateQuestionVoteTime}                                                           
                            deleteQuestion={deleteQuestion}
                            createComment={createComment}                      
                            getComment={getComment}    
                            //updateQuestion={updateQuestionOptions}                        
                           // user={user}
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