import React from 'react';
import { FaCircle, FaRegCircle } from 'react-icons/fa';

const Vote = ({ question,              
             votedOptionsList,
             voteUp,            
             alreadyVotedForQuestionList,
             voteEnded }) => {

    const items = JSON.parse(question.options);
    
    if (!items) return;

    let alreadyVotedForQuestionListBool = alreadyVotedForQuestionList.length !== 0;
    const iVotedForIt = ( id ) =>  {    
      return votedOptionsList.includes(id)
    }

  return items.map((item, index) => (
   
    <div className='container p-3 border-bottom bg-light ' key={index} >
          <div className="row ">            
              <div key={item.id} onClick={() => voteUp(item)} className={iVotedForIt(item.id) ? 'col  ' : 'col  '}>
                <span className="badge fs-6 text rounded-pill bg-dark  mx-2 ">
                  {item.votes}
                </span>                
                {item.text}
              </div>
            
            <div className="col ">                   
                <button className=" mx-5 badge border-0 bg-light"  
                  disabled={(voteEnded || alreadyVotedForQuestionListBool) ? true : false}                   
                  onClick={() => voteUp(item)}>                             
                  { (iVotedForIt(item.id) ) && (
                    <FaCircle color='green' size={28}/>
                  )}
                  { (!iVotedForIt(item.id) && voteEnded )&& (
                    <FaRegCircle color='gray' size={28}/>
                  )}
                  { (!iVotedForIt(item.id) && !voteEnded )&& (
                    <FaRegCircle color='black'  size={28}/>
                  )}                                 
                </button>                   
            </div>              
          </div>
          </div>
         
   
  ));
};

export default Vote;