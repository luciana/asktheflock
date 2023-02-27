import React, { useEffect } from 'react';
import Vote from '../Votes/Vote';
import { FaCircleNotch , FaSyncAlt, FaCircle, FaTrashAlt, FaGrinHearts, FaPhoneVolume} from 'react-icons/fa';
import Avatar from 'react-avatar';
import ReplyModalDialog from './ReplyModalDialog';
import QuestionForm from './QuestionForm';
import StatsDialog from '../Stats/StatsDialog';
import { SocialShare } from '../Social';

function Question({ 
  question, 
  replies,
  setActiveQuestion,
  votedList,
  updateVotedList,
  votedOptionsList,
  updateVotedOptionsList,
  handleVote,
  activeQuestion,
  deleteQuestion,
  //addQuestion,
  parentId = null,
  user
 }) {
 
  useEffect(() => {
    // Array.from(document.querySelectorAll('button[data-bs-toggle="tooltip"]'))
    // .forEach(tooltipNode => new Tooltip(tooltipNode))
  });

 if (!question) return;
  //console.log("Question ", question);
  // //console.log("User ", user.votes);
  // console.log("votedList", votedList);



 const formatDateAndTime = (date_input)  => {
  let date = new Date(date_input);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " at " + strTime;
}

  const isAReply = question.parentId != null;
  const canDelete = user.id === question.userID  && !isAReply; 
  //don't want to show the option to reply yet. setting bool to false 
  const canReply = user.id === question.userID && !isAReply && replies.length === 0 && false;
  const createdAt = formatDateAndTime(question.createdAt);
  const replyId = parentId ? parentId : question.id;
  const voteEnded = new Date() - new Date(question.voteEndAt) > 1;
  const canRepost = user.id === question.userID  && voteEnded; 
  const isReplying =
    activeQuestion &&
    activeQuestion.id === question.id &&
    activeQuestion.type === "replying";

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


  return (
    <div key={question.id} className="my-2">
       <div key={question.id} className="container border border-1 p-1" >           
        <div className="p-2 row align-items-start"> 
            <div className="col-2"> <Avatar size="42" name={question.userName} className=" img-profile rounded-circle mx-auto mb-0" alt="{question.userName}" /></div>
            <div className="col-8">
              <div className="text-sm lh-1"><span>{question.userName} </span><span aria-hidden="true"> · </span> <span> {createdAt} </span></div>
              <div className="text-sm">
                {!isAReply && voteEnded && (<span > Voting closed <FaCircle /> </span>)}
                {!isAReply && !voteEnded && (<span> Voting Open < FaCircleNotch /> until {formatDateAndTime(question.voteEndAt)}</span>)}
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
          {replies && replies.length > 0 && (             
             <div> 
                <ReplyModalDialog text={replies}/>
             </div>
          )}
           {canReply && (                
                <button className="btn btn-outline-secondary rounded-pill "  data-bs-toggle="tooltip" data-bs-placement="top" title="What happend afterwards?" onClick={()=> setActiveQuestion({id: question.id, type:"replying"})}>
                 Tell what happened afterwards
                </button>
              )}
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
          <span className="p-2"><FaPhoneVolume /> Special call out for #<strong>{question.questionTag}</strong></span>
        )}
      { expertNeededWithYourSkill && (       
        
        <span className="p-2">· You have the skill to help!</span>
        )}
        </div> 
      
      { alreadyVotedForQuestionListBool && (       
       <div className="container  text-sm lh-3">
        <span className="p-2">You helped {question.userName} <FaGrinHearts /></span>
      </div>   )}
      </div>
      
      </div>
  );
}
export default Question;