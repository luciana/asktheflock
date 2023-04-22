

import { useEffect, useState, useContext } from "react";

import { AppContext } from "../../Contexts";
import { Alert, Loading } from "../../Components";
import { GenderStats, CommentStats, GenerationStats, LanguageStats, AgeStats, ExpertStats, LocationStats, WinningStats } from './';

export default function Stats({data, options, text, commentDataForQuestion, questionTag}) {
  const { state } = useContext(AppContext);
  const { user } = state;
  const [alert, setAlert] = useState();

  if(!data || !options){  
    setAlert({ type: "error", text:"No data loaded"});  
    return;
  }

  const minStatVoteCount = process.env.REACT_APP_MIN_VOTES_TO_SHOW_STAT; 
  const optionList = options && JSON.parse(options); 
  const checkOptionsListExists = optionList && optionList.length> 0;
  const isThereEnoughStats = data && options && data.length > minStatVoteCount ;
  const questionCallOut = questionTag ? questionTag : "";

  const statListFor = (optionId) => (data).filter((i) => i.optionId === optionId);
 
  const totalVotes = () =>{
    let totalVoteCount = 0;
    if (data) {
        totalVoteCount = data && data.length;
    }
    return totalVoteCount;
  }
  const tv = totalVotes();

  
  const renderSingleOptionStats = (option) => (
    <div className="card">
        <div className="card-header"> {option.text}</div>
        <div className="card-body">      
            <div className="row">  
                <div className="col-md-4">  
                    <h5>Gender:</h5>                                                                 
                    <GenderStats dataInput={data} optionId={option.id} />
                </div>
                <div className="col-md-4">
                    <h5>Language:</h5>
                    <LanguageStats dataInput={data} optionId={option.id} />                   
                </div>
                <div className="col-md-4">
                    <h5>Experts who answered:</h5>                    
                    <ExpertStats dataInput={data} optionId={option.id} callOut={questionCallOut}  statListFor={statListFor}/>                           
                </div>  
            </div>
            <div className="row my-3">           
                <div className="col-md-4">
                    <h5>Location:</h5>  
                    <LocationStats dataInput={data} optionId={option.id} statListFor={statListFor} />                
                    
                </div>
                <div className="col-md-4">
                    <h5>Generations:</h5>
                    <GenerationStats dataInput={data} optionId={option.id} statListFor={statListFor} />                      
                </div>
                <div className="col-md-4">
                    <h5>Age:</h5>
                    <AgeStats dataInput={data} optionId={option.id} statListFor={statListFor} />                     
                </div>
            </div>        
            <CommentStats optionId={option.id} commentDataForQuestion={commentDataForQuestion} />
          
                                                              
       
        </div>
    </div>
  );
  
  const renderQuestionLevelStats = () => (
    <div className="card">
    <div className="card-header"> {text}</div>
    <div className="card-body">      
        <div className="row">    
            <div className="col-md-8">
             <div className="my-2">The options:</div>
            {optionList.map((u, index) => (
                <ul key={index} className="col-sm-4 align-items-center">                        
                <li className=" lh-1 col"> {u.text}</li>
                </ul>
            ))}  
             {questionCallOut != "" && ( 
                    <div className="my-2">Call out for: #{questionCallOut}</div>
                )}                               
            </div>   
            <div className="col-md-4">   
            <WinningStats  dataInput={optionList} total={tv}/>              
            </div>
        </div>      
        <hr className="my-1" />
        <div className="row my-3">             
            <div className="col-md-4">      
                <h5>Gender:</h5>          
                <GenderStats dataInput={data} optionId={null} />
            </div>  
            <div className="col-md-4">
                <h5>Language:</h5>
                <LanguageStats dataInput={data} optionId={null} />                                                 
            </div>
            <div className="col-md-4">
                <h5>Experts who answered:</h5>
                <ExpertStats dataInput={data} optionId={null} callOut={questionCallOut} statListFor={statListFor} />                  
            </div>  
            </div>  
            <div className="row my-3">           
                <div className="col-md-4">
                    <h5>Location:</h5>      
                    <LocationStats dataInput={data} optionId={null} statListFor={statListFor} />                                 
                </div>
                <div className="col-md-4">
                    <h5>Generations:</h5>
                    <GenerationStats dataInput={data} optionId={null} statListFor={statListFor} />
                       
                </div>
                <div className="col-md-4">
                    <h5>Age:</h5>
                    <AgeStats dataInput={data} optionId={null} statListFor={statListFor} />
                     
                    
                </div>
            </div>
        </div>             
  </div>

  )

  return (
   <div className="container">     
        <Alert type={alert?.type} text={alert?.text} />
    
        {!isThereEnoughStats && <Alert type="warning" text="Not enough data collected" link="/" />}   
        
        {isThereEnoughStats && (
            <>
            <hr className="m-3"></hr>     
            <div className="grid sm:grid-cols-3 gap-2">  
            {renderQuestionLevelStats()}
            </div>
            <hr className="m-3"></hr>   
            {optionList.map((option, index)=> (
                <div key={index} className="grid sm:grid-cols-3 gap-2">  
                  {renderSingleOptionStats(option)}
                  <hr className="m-3"></hr>   
                </div>
            ))}

            </>
        )}
    
      
    </div>                
 
  
  );
}