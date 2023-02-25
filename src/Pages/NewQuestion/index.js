
import QuestionAndPoll2 from '../../Components/Questions/QuestionAndPoll2';
import { useState, useContext } from "react";
import { AppContext } from "../../Contexts";
import { Alert, Title } from "../../Components";


const NewQuestion = (props) => {
  const { state } = useContext(AppContext);
  const { user } = state;
  const [ alert] = useState();


return (
  
  <div className="container grid sm:grid-cols-3 gap-2">  
     
      <Alert type={alert?.type} text={alert?.text} />
                                               
        <div id="question-form">
          <QuestionAndPoll2 user={user}  />
        </div> 
    </div>
  )
};

export default NewQuestion;