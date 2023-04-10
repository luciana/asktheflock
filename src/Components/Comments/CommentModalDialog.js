import React, {useState, useEffect} from 'react';
import { Modal } from 'react-bootstrap';
import Avatar from 'react-avatar';
import {LANGUAGES } from '../../Constants';
import gtag from 'ga-gtag';

function CommentModalDialog({  
    item,
    showCommentModalWindow,
    user
    }
) {

 
  const [showCommentModal, setShowCommentModal] = useState(false);
 
  useEffect(()=>{  
    if (item ){
        initModal();
    } 
   
   }, []);

  const initModal = () => {
    gtag('event', 'opened_dialog_to_view_comments_on_own_question', {}); 
    setShowCommentModal(showCommentModalWindow);
  } 
  return (
    <>  
    {item && (     
        <Modal  fullscreen={true} show={showCommentModal} >
              <Modal.Header closeButton onClick={() => {setShowCommentModal(false)}}>
                <Modal.Title>
                  <h2>
                        <div className= "badge rounded-pill bg-success my-3"> {item.commentCount} </div>
                        <span className="mx-2"> 
                          {LANGUAGES[user.locale].Comments.CommentsOnOption} {item.text}
                        </span>   
                  </h2>                 
                
                </Modal.Title>

              </Modal.Header>
              <Modal.Body >          
             
              {item.comment.map((attribute, index) => (            
                  <div key={index} >
                    <div className="p-2 d-flex flex-row">   
                    <div><Avatar size="42" 
                                        name={JSON.parse(attribute.comment).userName}
                                        className="rounded-circle mx-auto my-auto" alt={JSON.parse(attribute.comment).userName} />  
                    </div>  
                    <div className="mx-2"> 
                              <p> 
                                {JSON.parse(attribute.comment).comment}
                                </p>
                                <p className="text-color-gray text-sm">{JSON.parse(attribute.comment).userTag ? JSON.parse(attribute.comment).userTag : "" }</p>
                    </div>  
                  
                    </div>
                    <hr />
                  </div>
               ))}             
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
                   
      )} 
      </> 
  )
}
export default CommentModalDialog