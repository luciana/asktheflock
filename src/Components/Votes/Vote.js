import React, {useState, useEffect} from 'react';
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import QuestionCommentForm from '../Questions/QuestionCommentForm';
import { FaRegCommentDots, FaRegComment } from 'react-icons/fa';
import CommentModalDialog from '../Comments/CommentModalDialog';

const Vote = ({ question,     
             items,         
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
const [selectedItem, setSelectedItem] = useState(null);
const [showCommentDialog, setShowCommentDialog] = useState(false);


    

let alreadyVotedForQuestionListBool = alreadyVotedForQuestionList.length !== 0;
const iVotedForIt = ( id ) =>  {    
  return votedOptionsList.includes(id)
}

const isOpenQuestion = new Date(question.voteEndAt) - new Date() > 1 ;

const handleSubmit = ({comment}) => {  
  createVoteCommentObject(question.id,edit.id, edit.value, comment);
  setEdit({
    id: null,
    value: '',
    index: null,
  });
};

if (!items) return;
//console.log("items", items);
const handleCancel = () =>{
 setEdit({ id: null, value: '', index: null })
}

const openCommentDetails = (item) => {
  setSelectedItem(item);
  setShowCommentDialog(!showCommentDialog);
}

return (
<>
  {items.map((item, index) => (
   
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
             { (iVotedForIt(item.id) ) && (isOpenQuestion) && (item.commentBy !== user.id) &&(                
                <FaRegCommentDots
                  onClick={() => setEdit({ id: item.id, value: item.text, index: index })}
                  className='edit-icon'
                  title="give us your opnion"
                  size={"28"}
                />
              )}
               { (iVotedForIt(item.id) )  && (item.commentBy !== user.id) && (!myOwnQuestion)  &&(                                  
                    <FaRegComment
                  className='edit-icon'      
                  color='gray'    
                  title="you already voted for this question"       
                  size={"28"}
                /> 
              )}
              {((item.hasComment) && (item.hasComment === true) && (myOwnQuestion) ) && (           
               <div className= "badge rounded-pill bg-success"
               onClick={()=> openCommentDetails(item)}>{item.commentCount} {item.commentCount > 1 ? 'comments' : 'comment'}</div>              
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
  ))
  }
  
  {showCommentDialog && selectedItem && (
    <CommentModalDialog 
          showCommentModalWindow={true}         
          comment={selectedItem} 
          user={user} />
   )}
  </>
  )
  }

export default Vote;