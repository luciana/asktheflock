import React, {useState, useEffect} from 'react';
import { Modal } from 'react-bootstrap';
import { RiTimeLine, RiMagicLine }  from 'react-icons/ri';
import { FaPhoneVolume, FaTrophy }  from 'react-icons/fa';
import Avatar from 'react-avatar';
import {LANGUAGES } from '../../Constants';
import { Button } from './../../Components';
import gtag from 'ga-gtag';

function CommentModalDialog({  
    comment,
    showCommentModalWindow,
    user
    }
) {

 
  const [showCommentModal, setShowCommentModal] = useState(false);
 
  useEffect(()=>{  
    if (comment ){
        initModal();
    } 
   
   }, []);

  const initModal = () => {
    gtag('event', 'click_new_question_button', {}); 
    setShowCommentModal(showCommentModalWindow);
  } 

  
  const commentDetails = comment.comment;
  console.log("commentDetails", commentDetails);
  return (
    <>  
        <Modal  fullscreen={true} show={showCommentModal} >
              <Modal.Header closeButton onClick={() => {setShowCommentModal(false)}}>
                <Modal.Title><h2>{LANGUAGES[user.locale].Comments.CommentsOnOption}</h2></Modal.Title>
              </Modal.Header>
              <Modal.Body >               
                {comment && (
                    <>
                     <div className= "badge rounded-pill bg-success">{comment.commentCount}</div>
                     <span> {comment.text}</span>
                     <p>{commentDetails.comment}</p>
                     <p>{commentDetails.userTag}</p>
                     <p>{commentDetails.userName}</p>
                     <hr />
                    </>
                   
                )}
               
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