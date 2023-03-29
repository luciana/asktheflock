import React, {useState} from 'react';
import { Modal } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { TAGS, LANGUAGES, ROUTES } from '../../Constants';
import { Button } from './../../Components';
import gtag from 'ga-gtag';
import { formatName } from './../../Helpers';
import './../Votes/Badge.scss';

function FriendModalDialog({modelShow, modelClose, item}) {

 //console.log("friend diaglog", item);
 let messageMeaning = `This means ${item.userName} opinion matters and has some importance.`;
 let messageHeading = `You have created a relationship with ${item.userName}. `;

 if (item.iHelped === 0 || item.iWasHelped === 0){
    messageMeaning = `This means ${item.userName}'s opinion has minor importance in your decisions.`;
    messageHeading = `You are building a relationship with ${item.userName}. `;
 }else if (item.value > 25 ){
    messageMeaning = `This means ${item.userName}'s opinion matters and is considered important.`;
    messageHeading = `You have bonded with ${item.userName}. `;
 }else if (item.value > 50 ){
    messageMeaning = `This means ${item.userName}'s opinion should be of great value to you.`;
    messageHeading = ` ${item.userName} is trustworthy! `;
 }
  

  return (
    <>      
       <Modal  fullscreen={false} show={modelShow} >
          <Modal.Header closeButton onClick={modelClose}>
            <Modal.Title>Relationship</Modal.Title>
          </Modal.Header>
          <Modal.Body >    
          <p>{messageHeading} </p>
          {/* <ul>
            <li>You asked 3 questions that Rodolfo answered.</li>
            <li>You answered 22 questions that Rodolfo asked.</li>
          </ul> */}
          <p className="text-center">Your relationship score is </p>
           
             <div className="main-badge-wrapper">
                 <div className="badge-earned yellow" >            
                    <div className="circle">
                      <strong className="fa-stack-1x text-color-gray mt-2 fs-3 text"> {item.value} </strong>                                       
                    </div>                
                </div>    
              </div>
              
              
          <p>{messageMeaning}</p>

          </Modal.Body>   
          <Modal.Footer>                                     
                 <button
                      type="button"
                      className="btn btn-outline-dark rounded-pill"
                      onClick={modelClose}
                    >
                      {LANGUAGES["en-US"].Questions.Discard}
                    </button>               
          </Modal.Footer>                   
      </Modal>
    </>
  )
}
export default FriendModalDialog