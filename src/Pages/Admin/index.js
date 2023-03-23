//import { Auth } from 'aws-amplify';
import React, { useContext, useState, useEffect } from 'react';
import '../pages.css';
import './../profile-nav.css';
import { AppContext} from '../../Contexts';
import { Alert, Loading } from '../../Components';
import  {isAdmin, findCounts}   from '../../Helpers';
import { ROUTES } from "../../Constants";
import { useNavigate, useLocation } from "react-router-dom";
import Queries from "../../Services/queries";
import logo from'../../Assets/Images/logos/logo-image-blue-small.png';


function Admin() {
    const { state } = useContext(AppContext);
    const { user } = state;
    const [loading, setLoading] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const query = new URLSearchParams(useLocation().search);
    const [statData, setStatData] = useState([]);
    const [statOptionData, setStatOptionData] = useState([]);
    const questionQueryId = query.get("id");    
    const navigate = useNavigate();
    useEffect(() => {   
       check();
       loadSingleQuestion();
      }, []);

      const loadSingleQuestion = async () => {
        try{
          setLoading(true);       
         
          //direct link to question - queryString id - URL paramenters
          if (questionQueryId){                   
            const singleQuestion = await Queries.GetSingleQuestion(questionQueryId);
            if(singleQuestion){              
              setActiveQuestion(singleQuestion);      
              setStatData(singleQuestion.stats ? JSON.parse(singleQuestion.stats) : []);  
              setStatOptionData(singleQuestion.options ? JSON.parse(singleQuestion.options) : []);            
            } 
          }else{
            setActiveQuestion(null); 
           
          }                       
          setLoading(false);
        }catch(err){
          console.error("ADMIN: Questions.js Loading Single Question from queries error", err);
          setActiveQuestion(null);    
            
        }
      }

    const check = async () =>{
       const t = await isAdmin();       
       if ( !t ) {
        navigate(ROUTES[user.locale].MAIN);
       }
        setIsAuthorized(t);    
    }

    const totalVotes = () =>{
        let totalVoteCount = 0;
        if (statData) {
            totalVoteCount = statData && statData.length;
        }
        return totalVoteCount;
      }
    
    const tv = totalVotes();
    const winningOption = statOptionData && Math.max(...statOptionData.map((o) => o.votes));  
    const wininingOptionItem = statOptionData && winningOption &&  statOptionData.filter((i) => i.votes === winningOption ); 
    const winners = wininingOptionItem &&  wininingOptionItem.map((i) => i.text + ' ');
    const winner = wininingOptionItem && wininingOptionItem.length === 1 ? wininingOptionItem[0].text : winners;
    const allMaleGender = (statData).filter((i) => i.userGender === 'male');
    const allFemaleGender = (statData).filter((i) => i.userGender === 'female');
    const allNonBinaryGender = (statData).filter((i) => i.userGender === 'non-binary');
    const allNoneGender = (statData).filter((i) => i.userGender === '' || !i.userGender);
    const mergeGenderOverallResult = [...allMaleGender, ...allFemaleGender,allNonBinaryGender,allNoneGender];    

    console.log("winning values", wininingOptionItem);

    const optionId = wininingOptionItem && wininingOptionItem.length>0 && wininingOptionItem[0].id;
    const noneGenderListFor =(optionId) => ((statData).filter((i) => i.optionId === optionId && (i.userGender === '' || !i.userGender)));
    const maleGenderListFor =(optionId) => ((statData).filter((i) => i.optionId === optionId && i.userGender === 'male'));
    const femaleGenderListFor =(optionId) => ((statData).filter((i) => i.optionId === optionId && i.userGender === 'female'));
    const nonBinaryGenderListFor =(optionId) => ((statData).filter((i) => i.optionId === optionId && i.userGender === 'non-binary'));
    const mergeGenderOverallResultFor = [...nonBinaryGenderListFor(optionId), ...femaleGenderListFor(optionId),noneGenderListFor(optionId),maleGenderListFor(optionId)];   

    let genderOverallMessage = null;
      if( mergeGenderOverallResult && mergeGenderOverallResult.length > 0  ){
        const f = findCounts(mergeGenderOverallResult, "userName", "userGender")
                .filter((v)=> v.userName !== undefined)
                .sort((a, b) => b.value - a.value) 
        
        //must account for duplicated
        if(f.length === 1){
            genderOverallMessage = `Vote was unanimous from ${f[0].userGender} users! Total of ${f[0].value}`;
        }else if (f.length > 1){
            
            genderOverallMessage = `Most of the votes were from ${f[0].userGender} users!`;
        }
      }

      let genderWinningMessage = null;
      if( mergeGenderOverallResultFor && mergeGenderOverallResultFor.length > 0  ){
        const w = findCounts(mergeGenderOverallResultFor, "userName", "userGender")
                .filter((v)=> v.userName !== undefined)
                .sort((a, b) => b.value - a.value) 
        
        //must account for duplicated
        if(w.length === 1){
            genderWinningMessage = `The winning choice got all votes from ${w[0].userGender} users! Total of ${w[0].value}`;
        }else if (w.length > 1){
            
            genderWinningMessage = `Most of the votes for the winning choice     were from ${w[0].userGender} users!`;
        }
      }
 
    return (
    <section className="App ">
     {loading && <Loading />}
      <Alert type={alert?.type} text={alert?.text} />

      <div className="">      
            { isAuthorized  && (
             <div className="white-bg container p-2 ">
                <Alert type="error" text="THIS IS AN ADMIN PAGE - USE WISELY!" />

                { activeQuestion && (
                    <>
                    <h5>Email Template</h5>

                    <div className="border border-1">
                        <p className="align-center" >We are here to help you with your decision:</p>
                        <p>  {activeQuestion.text} </p>
                        <p>  <img src={logo} /></p>
                        <p>  {activeQuestion.userName}, here is  the data to help you finalize your decision. </p>                          
                        <ul>  
                        {winner && (
                             <li>The winning choice was “{winner}” with {(winningOption/tv)*100}% of the total votes ({winningOption}/{tv})</li>
                        )}   
                        {activeQuestion && activeQuestion.questionTag && (
                            <li> You asked for #{activeQuestion.questionTag} and xx people with this expertise helped!</li>
                        )}  
                         {activeQuestion && activeQuestion.questionTag && (
                            <li>A total of xx #parents experts answered. xxx%  of them AGREED with the winning option.</li>
                        )}   
                        {genderOverallMessage && (
                            <li>{genderOverallMessage} </li>
                        )}  

                        {genderWinningMessage && (
                            <li>{genderWinningMessage}</li>
                        )}                   
                            
                        </ul> 
                    </div>
                   
                  
                    </>
                )}
            
            </div> 
            
            
            )}          
      </div>     
     
    </section>
      )}
    ;

export default Admin;


