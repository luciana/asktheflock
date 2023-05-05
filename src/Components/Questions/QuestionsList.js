import React, {useEffect , useState, useContext, useRef} from 'react';
import Question from "./Question";
import { AppContext} from '../../Contexts'; 



function QuestionsList({next,hasMore, handleVote, updateQuestionVoteTime, deleteQuestion, createComment, getComment}) {

    const { state } = useContext(AppContext);  
    const { questions } = state;
   
    const elementRef = useRef(null);

    function onIntersection(entries){
      const firstElement = entries[0]; //only observing one element
      if (firstElement.isIntersecting && hasMore){
        console.log("call NEXT in Question List component");
        next();

      }
    }

    useEffect(() => {   
    
      const observer = new IntersectionObserver(onIntersection);
      if( observer && elementRef.current){
        observer.observe(elementRef.current);
      }

      return ()=>{
        if(observer){
          observer.disconnect();
        }
      }
      }, [questions]); //only option at this point is look if state changed.
    

  return (
    <div id="all-questions" className="py-1 my-1">
      {questions && questions.map((rootQuestion) => (
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
     {hasMore && (
        <div ref={elementRef}>Load more items ...</div>
     )}
                  
     </div> 
   
   
  );
}
export default QuestionsList;