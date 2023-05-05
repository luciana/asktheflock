import React, {useState, useEffect, useContext} from 'react';
import { FaCircle, FaRegCircle } from 'react-icons/fa';
import QuestionCommentForm from '../Questions/QuestionCommentForm';
import { FaRegCommentDots, FaRegComment } from 'react-icons/fa';
import CommentModalDialog from '../Comments/CommentModalDialog';
import { LANGUAGES } from '../../Constants';
import { AppContext } from '../../Contexts';
const Vote = ({ question,     
             items,               
             voteUp,            
             myOwnQuestion,                
             alreadyVotedForQuestionListBool,
             voteEnded,
             createVoteCommentObject,
             alreadyCommented,
             //user,
             iVotedForIt
             }) => {

const [edit, setEdit] = useState({
  id: null,
  value: '',
  index: null,
});
const [selectedItem, setSelectedItem] = useState(null);
const [showCommentDialog, setShowCommentDialog] = useState(false);
const [justSentComment, setJustSentComment] = useState(false);
const { state } = useContext(AppContext);  
const { user, myVotes } = state;

useEffect(() => {

  //console.log("rendering Vote component", myVotes);
}, []);

const isOpenQuestion = new Date(question.voteEndAt) - new Date() > 1 ;

// const iVotedForIt = ( id ) =>  {    

//   let voteForOption = null;
//   if (myVotes && myVotes.length>0){    
//      voteForOption  = myVotes.filter(
//       (vote) => vote.questionID === question.id  && vote.optionID === id
//     );  
//   }
//   //console.log("I voted for this option", voteForOption, voteForOption.length > 0);
//   if (voteForOption.length > 0){
//     return true;
//   }else{
//     return false;  
//   }
// }

const handleSubmit = ({comment}) => {   
  createVoteCommentObject(question.id,edit.id, edit.value, comment);
  setJustSentComment(true);
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

const openCommentDetails = (item) => {
  if(myOwnQuestion){
    setSelectedItem(item);
    setShowCommentDialog(!showCommentDialog);
  }else{
    alert("You don't have access to this information");
  }
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
             { (iVotedForIt(item.id) ) && (isOpenQuestion) && (!alreadyCommented) && !justSentComment && (!myOwnQuestion) &&(                
                <FaRegCommentDots
                  onClick={() => setEdit({ id: item.id, value: item.text, index: index })}
                  className='edit-icon'
                  title={LANGUAGES[user.locale].Comments.CommentBubbleTitle} 
                  size={"28"}
                />
              )}
               { (iVotedForIt(item.id) )  && (alreadyCommented || justSentComment) && (!myOwnQuestion)  &&(                                  
                    <FaRegComment
                  className='edit-icon'      
                  color='gray'                     
                  title={LANGUAGES[user.locale].Comments.CommentAlreadyDoneBubbleTitle}      
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
  
  {showCommentDialog  && (
    <CommentModalDialog 
          showCommentModalWindow={true}              
          item={selectedItem} 
          user={user} />
   )}
  </>
  )
  }

export default Vote;