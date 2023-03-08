

import { useEffect, useState, useContext } from "react";
import { useNavigate} from "react-router-dom";
import { LANGUAGES } from "../../Constants";
import { AppContext } from "../../Contexts";
import { Alert, Loading } from "../../Components";
import { findCounts } from './../../Helpers';
import { GenderStats, GenerationStats, LanguageStats, AgeStats, ExpertStats } from './';

export default function Stats({data, options, text, questionTag}) {
  const { state } = useContext(AppContext);
  const { user } = state;
  const [alert, setAlert] = useState();

  if(!data || !options){  
    setAlert({ type: "error", text:"No data loaded"});  
    return;
  }
  const minStatVoteCount = 2; 
  const maxNumberOfAddress = 5;
  
  const optionList = options && JSON.parse(options);
  const checkOptionsListExists = optionList && optionList.length> 0;
  const isThereEnoughStats = data && options && data.length > minStatVoteCount ;
  const questionCallOut = questionTag ? questionTag : "";

  const statListFor = (optionId) => (data).filter((i) => i.optionId === optionId);
  const addressList = findCounts(data, "userAddress", "userAddress")
                        .sort((a, b) => b.userAddress - a.userAddress)
                        .sort((a, b) => b.value - a.value)                        
                        .filter((item, idx) => idx < maxNumberOfAddress);
  
  const addressListFor = (optionId) => (findCounts(statListFor(optionId), "userAddress", "userAddress")
                    .sort((a, b) => b.userAddress - a.userAddress)
                    .sort((a, b) => b.value - a.value)                        
                    .filter((item, idx) => idx < maxNumberOfAddress));


  const winningOption = Math.max(...optionList.map((o) => o.votes));  
  const wininingOptionItem = optionList.filter((i) => i.votes === winningOption ); 
  const winners = wininingOptionItem.map((i) => i.text + ' ');
  const winner = wininingOptionItem.length === 1 ? wininingOptionItem[0].text : winners;

  const totalVotes = () =>{
    let totalVoteCount = 0;
    if (data) {
        totalVoteCount = data && data.length;
    }
    return totalVoteCount;
  }
  
  const userVoteCount = () => {
    let userVoteCount = 0;
    if (user.votes) {
        userVoteCount = JSON.parse(user.votes).length;

    }
    return userVoteCount;
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
                    {addressListFor(option.id).map((ex,index) => (                      
                    <ul key={index} className="align-items-center">                        
                        <li className=" lh-1 col">  {ex.userAddress ? ex.userAddress : 'No data'}: <span>{ex.value}</span></li>
                    </ul>
                    ))}
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
            </div>   
            <div className="col-md-4">   
                <div className="my-2">Winning Option: {winner} </div>
                <div className="my-2"> Total Vote count: {tv}</div>  
                {questionCallOut != "" && ( 
                    <div className="my-2">Call out for: #{questionCallOut}</div>
                )}
               
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
                    {addressList.map((ex,index) => (                      
                    <ul key={index} className="align-items-center">                        
                        <li className=" lh-1 col">  {ex.userAddress ? ex.userAddress : 'No data'}: <span>{ex.value}</span></li>
                    </ul>
                    ))}
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