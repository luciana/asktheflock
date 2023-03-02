import React, {useState} from 'react';
import Vote from '../Votes/Vote';
import { FaCircleNotch , FaLink, FaSyncAlt, FaCircle, FaTrashAlt, FaGrinHearts, FaPhoneVolume} from 'react-icons/fa';
import Avatar from 'react-avatar';
//import ReplyModalDialog from './ReplyModalDialog';
//import QuestionForm from './QuestionForm';
import StatsDialog from '../Stats/StatsDialog';
import { SocialShare } from '../Social';
import { formatDateTime, formatName } from '../../Helpers';
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
  handleVote,
  //activeQuestion,
  deleteQuestion,
  openQuestion,
  parentId = null,
  user
 }) {

  const [showQuestionCopyLink, setShowQuestionCopyLink] = useState(false);
  const [alert, setAlert] = useState();
  const [questionLink, setQuestionLink] = useState("");
  const [loading, setLoading] = useState(false);

 if (!question) return;
  //console.log("Question ", question);
  // //console.log("User ", user.votes);
  // console.log("votedList", votedList);

 
  const isAReply = question.parentId != null;
  const canDelete = user.id === question.userID  && !isAReply; 
  //don't want to show the option to reply yet. setting bool to false 
  const canReply = user.id === question.userID && !isAReply && replies.length === 0 && false;
  const createdAt = formatDateTime(question.createdAt);
  const replyId = parentId ? parentId : question.id;
  const voteEnded = new Date() - new Date(question.voteEndAt) > 1;
  const canRepost = user.id === question.userID  && voteEnded; 
  // const isReplying =
  //   activeQuestion &&
  //   activeQuestion.id === question.id &&
  //   activeQuestion.type === "replying";

  const minStatVoteCount = 2; //statistically 100 is min value
  const isThereEnoughStats =  question && user.id === question.userID && question.options && question.stats && JSON.parse(question.stats).length > minStatVoteCount ;


  let alreadyVotedForQuestionList = votedList.filter(
    (vote) => vote && vote.questionId === question.id
  );

  const expertNeeded = question.questionTag && question.questionTag !== "" && !voteEnded;
  const expertNeededWithYourSkill = expertNeeded && user.userTag === question.questionTag;
  let alreadyVotedForQuestionListBool = alreadyVotedForQuestionList.length !== 0;
 
  const voteUp = (item) => {
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
    try{
      setLoading(true);
      const url = "https://www.asktheflock.com/main?id=" + question.id;
      const s = await shortenURL(url);
      console.log("Question displayCopyLinkDialog shorten URL result ", s);
      if(s){
        setQuestionLink(s);
        setShowQuestionCopyLink(true);
        setLoading(false);
      }else{
        setShowQuestionCopyLink(true);
        setQuestionLink("https://www.asktheflock.com/main?id=" + question.id);
        setLoading(false);
        }
      
    }catch (error){
      setShowQuestionCopyLink(true);
      setQuestionLink("https://www.asktheflock.com/main?id=" + question.id);
      setLoading(false);
    }  
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(questionLink);
    setAlert({ type: "success", text:"Link copied. Start sharing!"});  
  }


  return (
    <>
        {loading && <Loading />}
       <div key={question.id} className="container border border-1 p-1 my-2" >           
        <div className="p-2 row align-items-start"> 
            <div className="col-2"> <Avatar size="42" name={question.userName} className=" img-profile rounded-circle mx-auto mb-0" alt="{question.userName}" /></div>
            <div className="col-7">
              <div className="text-sm lh-1"><span>{formatName(question.userName, 20)} </span><span aria-hidden="true"> · </span> <span className="d-none">  {createdAt} </span></div>
              <div className="text-sm">
                {!isAReply && voteEnded && (<span > Closed <FaCircle /> </span>)}
                {!isAReply && !voteEnded && (<span> Open < FaCircleNotch /> until {formatDateTime(question.voteEndAt)}</span>)}
                {isAReply && (<span><FaCircle color="green"/> {question.sentiment}</span>)}
                
              </div>
              
            </div>
            <div className="col-2">
             
              {canDelete && (
                <button className="btn btn-sm  mx-1" onClick={()=> deleteQuestion(question.id)}>
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
              <button className="btn btn-sm  mx-1"  onClick={displayCopyLinkDialog}>
                  <FaLink alt="Link to Question" /></button>

              <SocialShare />
            </div>
        </div>      
        <div className="p-2"> 
            {question.text} 
        </div>
        <div className="p-2">
          <Vote question={question}                                
                voteUp={voteUp}                     
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
      { expertNeededWithYourSkill && (       
        
        <span className="p-2">· {LANGUAGES[user.locale].Questions.YouCanHelp}</span>
        )}
        </div> 
      
      { alreadyVotedForQuestionListBool && (       
       <div className="container  text-sm lh-3">
        <span className="p-2">{LANGUAGES[user.locale].Questions.YouHelped} {question.userName} <FaGrinHearts /></span>
      </div>   )}


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