import React, {useState, useRef} from 'react';
import { Modal } from 'react-bootstrap';
import { RiTimeLine, RiMagicLine }  from 'react-icons/ri';
import { FaPhoneVolume, FaTrophy }  from 'react-icons/fa';
import Avatar from 'react-avatar';
import { TAGS, LANGUAGES, ROUTES } from '../../Constants';
import { Button } from './../../Components';
import gtag from 'ga-gtag';

function CommentModalDialog({
  
    comment,
    user
    }
) {

 
  const [showCommentModal, setShowCommentModal] = useState(false);
 // const [optionComments, setOptionComments] = useState(null);

  const initModal = () => {
    gtag('event', 'click_new_question_button', {}); 
    return setShowCommentModal(!false)
  }  

// const getQuestionOptionsComments = async (questionID, optionID) => {
//   console.log("input into calling getComment", questionID, optionID);
//   const result =  await getComment(questionID, optionID);
//   console.log("getCommengetQuestionOptionsComments getComment", result);  
//   return result ? result : null;
// }

// const getCommentDataForOptions =  () => {
//   const items  = JSON.parse(question.options);
//   setItems(question?JSON.parse(question.options));
//   if ( items ){
    
//     const options = items.map((o) => o.id);
//     console.log("options array", options);
//     options.map((id)=>{
//       const data = getQuestionOptionsComments(question.id, id);
//      // console.log("comments for this question", data);
//     })    
//   }
// }

  return (
    <>      
        <div className="p-2 d-flex align-items-center">                                                 
               <button
                    type="button"
                    onClick={initModal}                   
                    className="btn btn-outline-primary rounded-pill mx-3 p-2 my-1 px-3 form-control"
                  >
                    {LANGUAGES[user.locale].Comments.View}                    
                  </button>                           
        </div>
   
        <Modal  fullscreen={true} show={showCommentModal} >
              <Modal.Header closeButton onClick={() => {setShowCommentModal(false)}}>
                <Modal.Title><h2>{LANGUAGES[user.locale].Comments.CommentsOnOption}</h2></Modal.Title>
              </Modal.Header>
              <Modal.Body >               
                {comment && comment.map((c) => c.comment)}
              </Modal.Body>
              <Modal.Footer>                                           
                 
                    <button
                      type="button"
                      className="btn btn-outline-dark rounded-pill"
                      onClick={()=> {setShowCommentModal(false)}}
                    >
                      {LANGUAGES[user.locale].Comments.Close}
                    </button>                    
                                                
              </Modal.Footer>
        </Modal>
          

        
       
    </>
  )
}
export default CommentModalDialog