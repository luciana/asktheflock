import React, {useState, useRef} from 'react';
import { Modal } from 'react-bootstrap';
import { RiTimeLine, RiMagicLine }  from 'react-icons/ri';
import { FaPhoneVolume, FaTrophy }  from 'react-icons/fa';
import Avatar from 'react-avatar';
import Item from '../Items/Item';
import ItemForm from '../Items/ItemForm';
import { TAGS, LANGUAGES, ROUTES } from '../../Constants';
import { Button } from './../../Components';
import gtag from 'ga-gtag';
import Picker from 'emoji-picker-react';
import emojiIcon from '../../Assets/Images/smile-beam-svgrepo-com.svg';
import { formatName } from './../../Helpers';

function QuestionModalDialog(
  {
    addFlocksToOptions,
  handlePublishQuestion,
  //handleCancel,
  removeTodo,
  updateTodo,
  completeTodo,
  todos,
  addTodo,
  user,
  hasCancelButton = true}
) {

 
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  //const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [votePeriod, setVotePeriod] = useState(2880);
  const [input, setInput] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [expertTag, setExpertTag] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const inputRef = useRef(null);
  const isTextareaEmpty = input.length === 0;
  const [questionCounts, setQuestionCounts] = useState(0);
  const initModal = () => {
    gtag('event', 'click_new_question_button', {}); 
    return setShowQuestionModal(!false)
  }  

  const handleChange = e => {
   
    setInput(e.target.value);
    setCharacterCount(e.target.value.length);
  };

  const handleOnBlur = e => {
    addFlocksToOptions(e.target.value);
  }

  const handleChangeExpertTage = (e) =>{
    setExpertTag(e.target.value);
  }

  const handleChangeVotePeriod = e => {       
    setVotePeriod(e.currentTarget.value);
  }

  const addMinutes = (date, minutes)  => {
    date.setMinutes(date.getMinutes() + minutes);
  
    return date;
  }

  const onSubmit = e => {
    e.preventDefault(); 
    handlePublishQuestion({
        id: Math.floor(Math.random() * 10000),
        text: input,
        parentId: null,
        userId: user.id,
        createdAt: new Date().toISOString(),
        voteEndAt: addMinutes(new Date(), parseFloat(votePeriod)),
        sentiment: "",
        options:todos,
        questionTag: expertTag
      });
      setShowQuestionModal(false);
      setInput("");
      setVotePeriod(10080);
  }
  const minQuestionOptions = 2;
  const maxQuestionOptions = 5;
  const disabledPublishButton =  todos.length < minQuestionOptions || todos.length > maxQuestionOptions;
  const optionInvalidMessage =  (disabledPublishButton && todos.length !== 0) ? LANGUAGES[user.locale].Questions.InvalidNumberOfOptions : "";
  
  const maxQuestionCharacter = process.env.REACT_APP_MAX_QUESTION_CHARACTER;

  const onEmojiClick = (event, emojiObject) => { 
    setInput(prevInput => emojiObject.emoji + prevInput );
    setShowPicker(false);
  };

  return (
    <>      
      <h4 className="mb-0">        
        <span>{LANGUAGES[user.locale].Questions.NewQuestionGreeting} {formatName(user.name, 50)} </span>
      
       { JSON.parse(user.votes) && JSON.parse(user.votes).length > 0  && (
        <>
        <span className="mx-2 text-color-gray" aria-hidden="true"> • </span>
         <a href={`${ROUTES[user.locale].PROFILE}#badges`} aria-label="Achievements" >    
          <span  style={{
                      color:'#f5c135'
                    }}>                                             
              <FaTrophy size={18}/>  
          </span>
        </a>
        </>
        )}
      </h4>    
     
      <div className="p-2 d-flex align-items-center">                                                 
              <Avatar size="42" 
                    name={user.name} 
                    className="rounded-circle mx-auto my-auto" alt={user.name} />                                         
              
              <button
                    type="button"
                    onClick={initModal}                   
                    className="btn btn-outline-primary rounded-pill mx-3 p-2 my-1 px-3 form-control"
                  >
                    {LANGUAGES[user.locale].Questions.EnterNewQuestion}                    
                  </button>                           
        </div>
      <div>
        <form  className=''>
        <Modal  fullscreen={true} show={showQuestionModal} >
              <Modal.Header closeButton onClick={() => {setShowQuestionModal(false)}}>
                <Modal.Title><h2>{LANGUAGES[user.locale].Questions.WhatisYourQuestion}</h2></Modal.Title>
              </Modal.Header>
              <Modal.Body >               
                  <textarea
                    placeholder={LANGUAGES[user.locale].Questions.PlaceholderQuestion}
                    value={input}
                    onChange={handleChange}    
                    onBlur={handleOnBlur}              
                    name='textarea'
                    rows="4"
                    maxLength={maxQuestionCharacter}
                    className='form-control'
                    ref={inputRef}
                  />
                  <img className="emoji-icon"  src={emojiIcon} onClick={() => setShowPicker(val => !val)} />
                  {showPicker && <Picker
                      pickerStyle={{ width: '100%' }}                     
                      onEmojiClick={onEmojiClick} />}                 
                  <span className="text-sm text-color-gray">{characterCount}/{maxQuestionCharacter}</span>      
                  <div className="d-flex flex-row mb-3">
                      <div className="p-2">
                        <label htmlFor="votePeriod" className=" px-2"><RiTimeLine size={24}/> {LANGUAGES[user.locale].Questions.PollClosesIn}</label>
                      </div>
                      <div className="p-2">                  
                        <div className="form-check form-check-inline">
                            <input type="radio" onChange={handleChangeVotePeriod} disabled={false} className="form-check-input" id="480" name="votePeriod" value="480" defaultChecked={votePeriod === 480} /><label className=" "  htmlFor="480">8 hours</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" onChange={handleChangeVotePeriod} disabled={false} className="form-check-input" id="2880" name="votePeriod" value="2880" defaultChecked={votePeriod === 2880}/><label className=" " htmlFor="2880">2 days</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input type="radio" onChange={handleChangeVotePeriod}  disabled={false} className="form-check-input" id="10080" name="votePeriod" value="10080" defaultChecked={votePeriod === 10080} /><label className=" " htmlFor="10080">7 days</label>
                        </div>
                      </div>             
                          
             
                      <div className="p-2">
                        <label htmlFor="expertTag" className="px-2" data-bs-toggle="tooltip" 
                        data-bs-placement="top" title=" an expert opinion will weigh more"><FaPhoneVolume size={24}/> {LANGUAGES[user.locale].Questions.ExpertCallOutTitle}</label>
                      </div>
                      <div className="p-2">
                        <input type="text" 
                              id="expertTag" 
                              name="expertTag" 
                              className="form-control lh-1" 
                              placeholder="i.e #designer"
                              list="expertDatalistTagOptions"                             
                              value={expertTag}
                              onChange={handleChangeExpertTage} />
                                <datalist id="expertDatalistTagOptions">
                                {TAGS.map((l) => (
                                  <option key={l} value={l}>
                                    {LANGUAGES[user.locale].Tags[l]}
                                  </option>
                                ))}                               
                                </datalist>

                      </div>                                   
                    </div>

                    <div className="mt-1 alert alert-warning alert-dismissible fade show text-sm d-none" role="alert">
                    <div className="alert-heading" ><RiMagicLine size={24} /><strong>Pro Tip!</strong></div>
                      <div>{LANGUAGES[user.locale].Questions.FlockTip} </div>
                     <div className="fst-italic"> {LANGUAGES[user.locale].Questions.FlockTipExample} </div>                  
                    </div>

                  <div className="fs-5 text my-3">
                    <h3>{LANGUAGES[user.locale].Questions.EnterOptions} </h3>
                    <span className="text-sm text-color-gray px-2">(min of {minQuestionOptions} and max of {maxQuestionOptions})</span> 
                    <div className="text-sm text-color-red"> {optionInvalidMessage}</div>
                  </div>
                 
                    <Item
                    todos={todos}           
                    removeTodo={removeTodo}
                    completeTodo={completeTodo}
                    updateTodo={updateTodo}
                  />
                  <ItemForm onSubmit={addTodo} />

                  <div className="mb-5 alert alert-warning alert-dismissible fade show text-sm d-none" role="alert">
                  <div className="alert-heading " ><RiMagicLine size={24} /><strong>Pro Tip!</strong></div>
                  <div>{LANGUAGES[user.locale].Questions.FlockOptionTip} </div>
                  <div className="fst-italic"> {LANGUAGES[user.locale].Questions.FlockOptionTipExample} </div>                  
                 </div>

              </Modal.Body>
              <Modal.Footer>                                           
                  {hasCancelButton && (
                    <button
                      type="button"
                      className="btn btn-outline-dark rounded-pill"
                      onClick={()=> {setShowQuestionModal(false)}}
                    >
                      {LANGUAGES[user.locale].Questions.Discard}
                    </button>                    
                  )}         
                  {/* <Button handler={onSubmit} 
                  disabled={isTextareaEmpty} 
                   text={LANGUAGES[user.locale].Questions.Next} /> */}

                <Button handler={onSubmit} 
                  disabled={isTextareaEmpty || disabledPublishButton} 
                   text={LANGUAGES[user.locale].Questions.Publish} />
                  
                          
              </Modal.Footer>
        </Modal>
        </form>   

        {/* <Modal  fullscreen={true} show={showOptionsModal} >
              <Modal.Header closeButton onClick={() => {setShowOptionsModal(false)}}>
                <Modal.Title>{LANGUAGES[user.locale].Questions.EnterOptions}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mb-5 alert alert-warning alert-dismissible fade show text-sm d-none" role="alert">
                  <div className="alert-heading " ><RiMagicLine size={24} /><strong>Pro Tip!</strong></div>
                  <div>{LANGUAGES[user.locale].Questions.FlockOptionTip} </div>
                  <div className="fst-italic"> {LANGUAGES[user.locale].Questions.FlockOptionTipExample} </div>                  
                 </div>
                <Item
                    todos={todos}           
                    removeTodo={removeTodo}
                    completeTodo={completeTodo}
                    updateTodo={updateTodo}
                  />
                  <ItemForm onSubmit={addTodo} />
              </Modal.Body>
              <Modal.Footer>                           
               

                 <Button handler={handlePublishQuestion} 
                  disabled={disabledPublishButton} 
                   text={LANGUAGES[user.locale].Questions.Publish} />
              </Modal.Footer>
        </Modal> */}
         </div>
       
    </>
  )
}
export default QuestionModalDialog