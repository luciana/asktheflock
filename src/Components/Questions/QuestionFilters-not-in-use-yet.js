import React, { useState, useEffect } from 'react';
import { Loading, Switch }  from '..';
import { LANGUAGES } from "../../Constants";

const QuestionFilters = ({backendQuestions}) => {

    const [loading, setLoading] = useState(false);
    const [isVoteFilterChecked, setIsVoteFilterChecked] = useState(false);  
    const [isQuestionFilterChecked, setIsQuestionFilterChecked] = useState(false);   
    const [isAlreadyVotedFilterChecked , setIsAlreadyVotedFilterChecked] = useState(false);
    const [questionFilteredList, setQuestionFilteredList] =    useState([]);
    const [voteFilteredList, setVoteFilteredList] =    useState([]);
    const [alreadyVotedFilterList, setAlreadyVotedFilterList] = useState([]);
    const [myVotes, setMyVotes] = useState([]);

    useEffect(() => {
        const loadMyVotes = () => {
            setLoading(true);  
            setMyVotes(JSON.parse(user.votes));
            setLoading(false);  
          }
        
        loadMyVotes();                                
    }, [user.votes,setFilterList ]);


     // Generic helper function that can be used for the three operations:        
     const operation = (list1, list2, isUnion = false) =>
     list1.filter(
         (set => a => isUnion === set.has(a.id))(new Set(list2.map(b => b.id)))
     );

     // https://stackoverflow.com/questions/33356504/difference-and-intersection-of-two-arrays-containing-objects
     const inBoth = (list1, list2) => operation(list1, list2, true),
       inFirstOnly = operation,
       inSecondOnly = (list1, list2) => inFirstOnly(list2, list1);

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
            const filterListArray = inBoth(haventVotedYet,questionFilteredList); 
            setFilterList(filterListArray);
         }else if(isQuestionFilterChecked && !isVoteFilterChecked){  
            //already voted switch and open questions are on, and my questionss is off
            console.log("already voted switch and my questions are on, and open questionss is off"); 
            const filterListArray = inBoth(haventVotedYet,voteFilteredList); 
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
           const filterListArray = inBoth(voteFilteredList,questionFilteredList);          
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
           const filterListTwoArrays = inBoth(v,questionFilteredList);           
           const filterListArray = inBoth(filterListTwoArrays,alreadyVotedFilterList);                  
           setFilterList(filterListArray);
         } else if(isQuestionFilterChecked && !isAlreadyVotedFilterChecked){      
           console.log("open questions and my questions swithes are on and already voted is off") ;           
           const filterListArray = inBoth(questionFilteredList,v); 
           setFilterList(filterListArray);
           } else if(!isQuestionFilterChecked && isAlreadyVotedFilterChecked){     
             console.log("open questions and already swithes are on and my questions is off");
             const filterListArray = inBoth(v,alreadyVotedFilterList); 
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
           const filterListArray = inBoth(alreadyVotedFilterList,questionFilteredList);                     
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
             const filterListTwoArrays = inBoth(voteFilteredList,q); 
             const filterListArray = inBoth(filterListTwoArrays,alreadyVotedFilterList);                
             setFilterList(filterListArray);
           }else if(!isVoteFilterChecked && isAlreadyVotedFilterChecked){ 
             console.log(" my question  and already voted questions switches are on, and open question switch is off"); 
             const filterListArray = inBoth(q,alreadyVotedFilterList); 
             setFilterList(filterListArray);

           }else if(isVoteFilterChecked && !isAlreadyVotedFilterChecked){     
             console.log(" my question  and open questions switches are on, and already voted switch is off");                                                
            const filterListArray = inBoth(q,voteFilteredList); 
            setFilterList(filterListArray);
                   
           }else{
             console.log("only my question swith is on");
             setFilterList(q); 
           }           
         }else{       
           //my questions switch is off        
           if(isVoteFilterChecked && isAlreadyVotedFilterChecked ){ 
             console.log("my questions swtich is off and open questions and already voted switch are on");  
             const filterListArray = inBoth(alreadyVotedFilterList,voteFilteredList);                     
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
       

  return (
    <>
    {loading && <Loading />}
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
   </>
  );
};

export default QuestionFilters;