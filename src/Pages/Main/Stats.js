import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../pages.css';
import './../profile-nav.css';
import { LANGUAGES, ROUTES } from '../../Constants';
import { AppContext} from '../../Contexts';
import { Loading, Alert } from '../../Components';
import Queries from "../../Services/queries";
import  {isAdmin}   from '../../Helpers';
import StatsDialog from '../../Components/Stats/StatsDialog';


function Stats() {  
  const { state } = useContext(AppContext);
  const { user } = state;
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState(null);
  const [statData, setStatData] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isThereEnoughStats, setIsThereEnoughStats] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const minStatVoteCount = process.env.REACT_APP_MIN_VOTES_TO_SHOW_STAT;

console.log("what is the question  id", id);

  useEffect(() => {   
    check();
},[id]);

const check = async () =>{
    const t = await isAdmin();       
    if ( !t ) {
     navigate(ROUTES[user.locale].MAIN);
    }
    loadSingleQuestion();
    setIsAuthorized(t);    
 }
 
 const loadSingleQuestion = async () => {
    try{
      setLoading(true); 
      if (id){                   
        const singleQuestion = await Queries.GetSingleQuestion(id);
        if(singleQuestion){
          setQuestion(singleQuestion);
          setStatData(singleQuestion.stats ? JSON.parse(singleQuestion.stats) : []);
          setIsThereEnoughStats(singleQuestion && user.id === singleQuestion.userID && 
                                      singleQuestion.options && singleQuestion.stats && 
                                      new Date() - new Date(singleQuestion.voteEndAt) > 1 &&
                                      JSON.parse(singleQuestion.stats).length >= minStatVoteCount) ;
        } 
      }else{
        setQuestion(null);  
        navigate(ROUTES[user.locale].MAIN);
      }                       
      setLoading(false);
    }catch(err){
      console.error("Stats Page Loading Single Question from queries error", err);
      setQuestion(null);      
      navigate(ROUTES[user.locale].MAIN);         
    }
  }

  return (
    <div className="App  ">   
        {loading && <Loading />}
        {( !loading && isThereEnoughStats ) && <Alert type="warning" text={LANGUAGES[state.lang].Stats.NotEnough}/>}  
        { isAuthorized && question  && (
             <StatsDialog question={question}
             locale={user.locale}
             statData={statData}
             showStatModalWindow={true}
             />
        )}  
    </div>
  );
}

export default Stats;
