import React, {useState, useEffect} from 'react';
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import QuestionCommentForm from '../Questions/QuestionCommentForm';
import { RiEditLine } from 'react-icons/ri';
import CommentModalDialog from '../Comments/CommentModalDialog';

const Vote = ({ question,              
             votedOptionsList,
             voteUp,            
             myOwnQuestion,
             alreadyVotedForQuestionList,
             voteEnded,
             createVoteCommentObject,
             getComment,
             user }) => {

const [edit, setEdit] = useState({
  id: null,
  value: '',
  index: null,
});
const [items, setItems] = useState(null);
const [optionComments, setOptionComments] = useState(null);

useEffect(()=>{
 // setItems(question && JSON.parse(question.options));
  getCommentDataForOptions();
}, []);

const getQuestionComments = async (questionID, userID) => {
  try{
    console.log("input into calling getComment", questionID, userID);
    const result =  await getComment(questionID, userID);
    console.log("getCommengetQuestionOptionsComments getComment", result);  
    return result ? result : null;
  }catch(error){
    console.error("error getting comment", error);
  }
  
}

const getCommentDataForOptions =  () => {
  const items  = JSON.parse(question.options);
  setItems(items);

  if (myOwnQuestion){
    const data = getQuestionComments(question.id, user.id);
    //console.log("comments for this question from this user", data);
  }
  // if ( items ){
    
  //   const options = items.map((o) => o.id);
  //   console.log("options array", options);
  //   options.map((id)=>{
  //     const data = getQuestionOptionsComments(question.id, id);
  //     console.log("comments for this question", data);
  //   })    
  // }
  
}

    

let alreadyVotedForQuestionListBool = alreadyVotedForQuestionList.length !== 0;
const iVotedForIt = ( id ) =>  {    
  return votedOptionsList.includes(id)
}

const handleSubmit = ({comment}) => { 
  // console.log("handle submit vote comment" , comment);
  // console.log("handle submit vote other data" , question.id, edit.id, edit.value);
  createVoteCommentObject(question.id,edit.id, edit.value, comment);
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