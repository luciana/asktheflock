import React, {useState,useEffect} from 'react';
import Vote from '../Votes/Vote';
import { FaCircleNotch , FaLink, FaSyncAlt, FaCircle, FaTrashAlt, FaRegHandshake, FaPhoneVolume} from 'react-icons/fa';
import { GrUserExpert } from 'react-icons/gr';
import Avatar from 'react-avatar';
//import ReplyModalDialog from './ReplyModalDialog';
//import QuestionForm from './QuestionForm';
import StatsDialog from '../Stats/StatsDialog';
import { SocialShare } from '../Social';
import { formatDateTime, formatName, findCounts } from '../../Helpers';
import { LANGUAGES } from '../../Constants';
import { Modal } from 'react-bootstrap';
import { Button, Input, Alert, Loading } from './../../Components';
import  shortenURL  from './../../Services/shortenURL';

function Question({ 
  question, 
  replies,
  //setActiveQuestion,
  votedList,
  updateVotedList,
  votedOptionsList,
  updateVotedOptionsList,
  updateQuestionVoteTime,
  handleVote,
  //activeQuestion,
  deleteQuestion,
  openQuestion,
  parentId = null,
  user
 }) {

  const [showQuestionCopyLink, setShowQuestionCopyLink] = useState(false);
  const [showCloseVoteDialog, setShowCloseVoteDialog] = useState(false);
  const [disableCloseVoteButton, setDisableCloseVoteButton] =useState(false);
  const [expertVoteCount, setExpertVoteCount] =useState(null);
  const [alert, setAlert] = useState();
  const [questionLink, setQuestionLink] = useState("");
  const [loading, setLoading] = useState(false);

// if (!question) return;
  //console.log("Question ", question);
  // //console.log("User ", user.votes);
  // console.log("votedList", votedList);

  useEffect(() => {
    setQuestionLink( window.location.origin +"/main?id=" + question.id);
    getExpertVoteCount();
  }, []);
 
  const isAReply = question.parentId != null;
  const canDelete = user.id === question.userID  && !isAReply; 
  //don't want to show the option to reply yet. setting bool to false 
 // const canReply = user.id === question.userID && !isAReply && replies.length === 0 && false;
  const createdAt = formatDateTime(question.createdAt);
  const replyId = parentId ? parentId : question.id;
  const voteEnded = new Date() - new Date(question.voteEndAt) > 1;
  const canRepost = user.id === question.userID  && voteEnded; 
  const canClose = user.id === question.userID  && !isAReply && !voteEnded; 
  // const isReplying =
  //   activeQuestion &&
  //   activeQuestion.id === question.id &&
  //   activeQuestion.type === "replying";

  const minStatVoteCount = process.env.REACT_APP_MIN_VOTES_TO_SHOW_STAT; //statistically 100 is min value
  const isThereEnoughStats =  question && user.id === question.userID && 
                              question.options && question.stats && 
                             //voteEnded &&
                              JSON.parse(question.stats).length >= minStatVoteCount ;


  let alreadyVotedForQuestionList = votedList.filter(
    (vote) => vote && vote.questionId === question.id
  );

  const expertNeeded = question.questionTag && question.questionTag !== "" && !voteEnded;
  const expertNeededWithYourSkill = expertNeeded && user.userTag === question.questionTag;
  let alreadyVotedForQuestionListBool = alreadyVotedForQuestionList.length !== 0;
  const myOwnQuestion = question.userID === user.id;


  const getExpertVoteCount = () => {
    const findExpertCounts = findCounts(JSON.parse(question.stats), "userTag", "userTag");
    if(findExpertCounts){
      const expertsTags = findExpertCounts
      .map((item) => {
            Object.keys(item).map((key) => {
              item[key] = (item[key] == '' ? 'No data' : item[key]); return item[key]
            });
            return item;
        })
        .sort((a, b) => b.value - a.value)
        .filter((fil) => fil.userTag === question.questionTag);
      const expertsTagsMatchingCount = expertsTags && expertsTags.length > 0 ? expertsTags[0].value  : null;  
      setExpertVoteCount(expertsTagsMatchingCount);
    }
  }
  
  
    
                
    


  const voteUp = (item) => {

    if (myOwnQuestion) return; 

    const id = item.id;
    const text = item.text;
    if (alreadyVotedForQuestionListBool) {
      
      return;
    }if (votedOptionsList.includes(id)){
      
      return;
    }else{        
        
      item.votes++;  

      let userVote ={
        "optionId": id,
        "questionId": question.id,  
      };
       
      let questionOption = {         
        "id": id,
        "text": text,  
        "votes": item.votes, 
        }         
      updateVotedList(questionOption);    
      updateVotedOptionsList(id);
      handleVote(question, questionOption, userVote);
     
    } 
    
  };

  

  const displayCopyLinkDialog = async () => {
    const url = window.location.origin +"/main?id=" + question.id;
    const s = await shortenURL(url);  
    try{
      setLoading(true);
      
      if(s){
        setQuestionLink(url);
        setShowQuestionCopyLink(true);
        setLoading(false);
      }else{
        console.warning("shorten URL didn't return link");
        setShowQuestionCopyLink(true);
        setQuestionLink(url);
        setLoading(false);
        }
      
    }catch (error){
      setShowQuestionCopyLink(true);
      setQuestionLink(url);
      setLoading(false);
    }  
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(questionLink);
    setAlert({ type: "success", text: LANGUAGES[user.locale].Questions.LinkedSharedLabel});  
  }

  
  const terminateVote = () => { 

    if (isThereEnoughStats) {
      setAlert({ type: "success", text:LANGUAGES[user.locale].Questions.VoteIsClosedLabel + LANGUAGES[user.locale].Questions.VoteIsClosedLabelMore});  
    }else{
      setAlert({ type: "success", text:LANGUAGES[user.locale].Questions.VoteIsClosedLabel});  
    }        
    try{
      updateQuestionVoteTime(question, new Date()); 
      setDisableCloseVoteButton(true);
    }catch(error){
      setDisableCloseVoteButton(false);
      console.error("Error updateQuestionVoteTime", error);
    }
           
  }


  return (
    <>
        {loading && <Loading />}
       <div key={question.id} className="mb-1 border border-1" >           
        <div className="py-1 d-flex align-items-center">    
          <div className="py-2 me-auto d-flex align-items-center">
            <div className="ms-2 ">
            <Avatar size="42" name={question.userName} 
                className=" img-profile rounded-circle mx-auto mb-0" 
                alt={question.userName} />    
                </div>
            <div className="ms-2">
                <h5 className="mb-0 "><strong>{formatName(question.userName, 20)}</strong></h5>
                <span className="d-none">  {createdAt} </span> 
                <div className="text-sm">
                {!isAReply && voteEnded && (<span > <FaCircle /> {LANGUAGES[user.locale].Questions.Closed}  </span>)}
                {!isAReply && !voteEnded && (<span> < FaCircleNotch /> {LANGUAGES[user.locale].Questions.OpenUntil} {formatDateTime(question.voteEndAt)}</span>)}
                {isAReply && (<span><FaCircle color="green"/> {question.sentiment}</span>)}                
                </div>  
                
                { expertVoteCount && expertVoteCount ===1 && (
                  <div className="">
                  <span className="text-sm"> <GrUserExpert /> {expertVoteCount} {LANGUAGES[user.locale].Questions.ExpertVoted}</span>
                  </div>
                )}
                { expertVoteCount && expertVoteCount > 1 && (
                  <div className="">
                  <span className="text-sm"> <GrUserExpert /> {expertVoteCount} {LANGUAGES[user.locale].Questions.ExpertsVoted}</span>
                  </div>
                )}
               
            </div>                   
        </div>
        <div className="ms-2 ">
        <div className="d-flex ">
           {canClose && (
                <button className="btn btn-sm  mx-1" title="close vote" onClick={()=> setShowCloseVoteDialog(true)}>
                  <FaCircle alt="Close Vote" /></button>
              )}
            {canDelete && (
                <button className="btn btn-sm  mx-1" title="delete question" onClick={()=> deleteQuestion(question.id)}>
                  <FaTrashAlt alt="Delete question" /></button>
              )}
              {canRepost && (
                <button className="btn btn-sm  mx-1"  onClick={()=> alert("this will repost the question and reopen the vote, but functionality not done yet. Is this a good idea?")}>
                  <FaSyncAlt alt="Repost question" /></button>
              )}

              {isThereEnoughStats && (
                <StatsDialog question={question}
                            locale={user.locale}/>
              )}
              <button className="btn btn-sm  mx-1" title="copy link" onClick={displayCopyLinkDialog}>
                  <FaLink alt="Link to Question" /></button>

              <SocialShare 
                  message={"Help me with a decision - " + formatName(question.text, 80)}
                  url={questionLink} />
              </div>
            </div>
        </div>
                   
        <div className="p-2"> 
            {question.text} 
        </div>
        <div className="p-2">
          <Vote question={question}                                
                voteUp={voteUp}     
                myOwnQuestion={myOwnQuestion}                
                votedOptionsList={votedOptionsList}
                alreadyVotedForQuestionList={alreadyVotedForQuestionList}
                voteEnded={voteEnded} />    
        </div>     
          {/* {replies && replies.length > 0 && (             
             <div> 
                <ReplyModalDialog text={replies}/>
             </div>
          )} */}
           {/* {canReply && (                
                <button className="btn btn-outline-secondary rounded-pill "  data-bs-toggle="tooltip" data-bs-placement="top" title="What happend afterwards?" 
                onClick={()=> setActiveQuestion({id: question.id, type:"replying"})}>
                 Tell what happened afterwards
                </button>
              )} */}
          {/* {isReplying && (
            <QuestionForm 
              submitLabel="This is what happened afterwards..."
              placeHolderText="Explain if the suggestion worked out... "   
              handleSubmit={(text) => addQuestion({
                id: Math.floor(Math.random() * 10000),
                text: text,
                parentId: replyId,
                userId: user.id,              
                userName: user.name,
                createdAt: new Date().toISOString(),
                voteEndAt: null,
                sentiment: "Positive",
                options:user.options,
              })}
            />
          )} */}
          {/* {replies && replies.length > 0 && (             
          <div className="replies alert alert-primary ">            
            {replies.map((reply) => (
              <Question
                question={reply}
                key={reply.id}
                setActiveQuestion={setActiveQuestion}
                activeQuestion={activeQuestion}
                updateQuestion={updateQuestion}
                deleteQuestion={deleteQuestion}          
                parentId={question.id}
                replies={[]}
                user.id={user.id}
              />
            ))}
          </div>
        )} */}
         <div className=" border border-0 bg-light text-sm lh-3">    
        { expertNeeded && (       
          <span className="p-2"><FaPhoneVolume /> {LANGUAGES[user.locale].Questions.SpecialCallOutFor}<strong>{question.questionTag}</strong></span>
        )}
         { expertNeeded && (expertNeededWithYourSkill || alreadyVotedForQuestionListBool) && (       
         <span className="mx-2 text-color-gray" aria-hidden="true"> • </span> 
        )}
        { expertNeededWithYourSkill && !alreadyVotedForQuestionListBool && (        
        <span className="p-2"> <FaRegHandshake /> {LANGUAGES[user.locale].Questions.YouCanHelp}</span>
        )}        
         { expertNeededWithYourSkill && alreadyVotedForQuestionListBool && (              
          <span className="p-2"> <GrUserExpert /> {LANGUAGES[user.locale].Questions.YouHelped} </span>
          )}
       
        </div> 
      
      


      <Modal  fullscreen={false} show={showCloseVoteDialog} >
          <Modal.Header closeButton onClick={() => setShowCloseVoteDialog(false)}>
            <Modal.Title>{LANGUAGES[user.locale].Questions.VoteIsClosedLabelTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body >    
              <Alert type={alert?.type} text={alert?.text} />                      
                <p>{LANGUAGES[user.locale].Questions.VoteIsClosedLabelMessage}</p>
               {isThereEnoughStats && (              
                <p> {LANGUAGES[user.locale].Questions.VoteIsClosedLabelMessageMore}</p>                                            
              )}                            
          </Modal.Body>   
          <Modal.Footer>                                     
                 <button
                      type="button"
                      className="btn btn-outline-dark rounded-pill"
                      onClick={()=> {setShowCloseVoteDialog(false)}}
                    >
                      {LANGUAGES[user.locale].Questions.Discard}
                    </button>  
              <Button
                    text= {LANGUAGES[user.locale].Questions.CloseVote}
                    className="btn btn-outline-dark rounded-pill"    
                    disabled={disableCloseVoteButton}                 
                    handler={terminateVote}
                />  
          </Modal.Footer>                   
          </Modal>
          
        <Modal  fullscreen={false} show={showQuestionCopyLink} >
          <Modal.Header closeButton onClick={() => {setShowQuestionCopyLink(false)}}>
            <Modal.Title>  {LANGUAGES[user.locale].Questions.CopyLinkLabel}</Modal.Title>
          </Modal.Header>
          <Modal.Body >                          
              <Alert type={alert?.type} text={alert?.text} />
            
              <Input type="text"                  
                  value={questionLink} disabled={true} />
              <Button
                    text= {LANGUAGES[user.locale].Questions.CopyLabel}
                    className="btn btn-outline-dark rounded-pill"                     
                    handler={copyToClipboard}
                />                 
          </Modal.Body>                 
          </Modal>
      </div>    
      </>
  );
}
export default Question;