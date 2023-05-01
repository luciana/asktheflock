import React, {useEffect , useState, useRef, useContext} from 'react';
import Question from "./Question";
import { AppContext} from '../../Contexts'; 



function QuestionsList({handleVote, updateQuestionVoteTime, deleteQuestion, createComment, getComment}) {

    const [items, setItems] = useState([]);
    const { state } = useContext(AppContext);  
    const { user, myVotes, questions } = state;

    useEffect(() => {   
     if(questions && questions.length > 0 ){
      setItems(questions.filter(
        (backendQuestion) => ((backendQuestion.parentID === null) )
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .sort((a, b) => ((new Date(a.voteEndAt) - new Date() < 1) - (new Date(b.voteEndAt) - new Date() < 1))) );    
      console.log("rendering Question List component");
     }
      
       
      }, [state]); //only option at this point is look if state changed.
    

  return (
    <div id="all-questions" className="py-1 my-1">
      {items && items.map((rootQuestion) => (
            <Question
                key={rootQuestion.id}
                question={rootQuestion}                       
                handleVote={handleVote}                                                 
                updateQuestionVoteTime={updateQuestionVoteTime}                                        
                deleteQuestion={deleteQuestion}
                createComment={createComment}                      
                getComment={getComment}                                                              
            />
        ))}
    
                  
     </div> 
   
   
  );
}
export default QuestionsList;