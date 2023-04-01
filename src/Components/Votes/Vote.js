import React, {useState} from 'react';
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import QuestionCommentForm from '../Questions/QuestionCommentForm';
import { RiEditLine } from 'react-icons/ri';

const Vote = ({ question,              
             votedOptionsList,
             voteUp,            
             myOwnQuestion,
             alreadyVotedForQuestionList,
             voteEnded,
             createVoteComment }) => {

const [edit, setEdit] = useState({
  id: null,
  value: '',
  index: null,
});
const items = JSON.parse(question.options);
    

let alreadyVotedForQuestionListBool = alreadyVotedForQuestionList.length !== 0;
const iVotedForIt = ( id ) =>  {    
  return votedOptionsList.includes(id)
}

const handleSubmit = (comment) => { 
  console.log("handle submit vote comment" , comment);
  console.log("handle submit vote other data" , question.id, edit.id, edit.value);
  createVoteComment(question.id, edit.id, edit.value, comment);
  setEdit({
    id: null,
    value: '',
    index: null,
  });
};

if (!items) return;

const handleCancel = () =>{
 setEdit({ id: null, value: '', index: null })
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
                  disabled={(voteEnded || alreadyVotedForQuestionListBool || myOwnQuestion) ? true : false}                   
                  onClick={() => voteUp(item)}>                             
                  { (iVotedForIt(item.id) ) && (
                  <FaCircle color='green' size={28}/>  
                  )}
                  { (!iVotedForIt(item.id) && voteEnded)&& (
                    <FaRegCircle color='gray' size={28}/>  
                  )}
                  { (!iVotedForIt(item.id) && !voteEnded )&& (
                    <FaRegCircle color='black'  size={28}/>
                  )}                                 
                </button>                   
            </div>    
            <div className="col ">     
             { (iVotedForIt(item.id) ) && (                
                  <RiEditLine
                  onClick={() => setEdit({ id: item.id, value: item.text, index: index })}
                  className='edit-icon'
                  size={"30"}
                />
              )}
            </div>   
          </div>
          {((edit.id) && (edit.index === index)) && (
              <div className="row"> 
              <QuestionCommentForm
                submitLabel="Justify Choice"
                placeHolderText={`Word of advice on why you chose "${edit.value}"`}
                handleSubmit={handleSubmit}
                hasCancelButton={true}
                handleCancel={handleCancel}
              />
            </div>
          )}
          
      </div>
         
   
  ));
};

export default Vote;