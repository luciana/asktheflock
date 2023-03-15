import React, {useState} from 'react';
import QuestionModalDialog from './QuestionModalDialog';
import { useNavigate } from 'react-router-dom';
import { Loading }  from '../../Components';
import Mutations from "../../Services/mutations";
import gtag from 'ga-gtag';

const TAG = "#flocks";

function QuestionAndPoll2({
    parentId = null,
    user,
}){

    const [todos, setTodos] = useState([]); 
    const [question, setQuestion] = useState([]);     
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const addQuestion = async (question) => {       
      try{
        setLoading(true);

        const text = question.text;
        const parentID = question.parentId;
        const questionTag = question.questionTag;
        const userID = question.userId;
        const voteEndAt = question.voteEndAt;
        const sentiment = question.sentiment;
        const options  = JSON.stringify(question.options);
        const userName = user.name;

        let q = await Mutations.CreateQuestion(
          text, 
          userID,
          voteEndAt,
          sentiment,
          userName,
          parentID,
          questionTag,
          options
        );
        //setQuestion(question);            
        navigate('/Main');        
 
      }catch(err){
        console.error("Error on Mutations.CreateQuestion ", err);
      }        
    };
    
      const addTodo = todo => {
        //console.log('add Todo', todo);
        if (!todo.text || /^\s*$/.test(todo.text)) {
          return;
        }
    
        setTodos(todos => {  
          const newArray = [...todos]; 
          newArray.push(todo); 
          return newArray; 
        });
        //console.log('add Todo after adding it', todo);
      };

      const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
          return;
        }    
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
      };
    
      const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !== id);    
        setTodos(removedArr);
      };

      const addFlocksToOptions = (text)  => {
        let v = text;
        if (!v || /^\s*$/.test(v)) {
          return;
        }

        //Setup Poll automatically with the files in #flocks
        let found = v.indexOf(TAG);

        //user has not entered the tag to automatically setup the poll
        if (found === -1) {
          //TODO: #flocks not used
          return;
        }

        let list = v.substring(found + TAG.length);
        //user has not entered the tag with a list of itemes
        if (!list || /^\s*$/.test(list)) {
          return;
        }

        //remove the last comma and any whitespace after it
        list = list.replace(/,\s*$/, "");

        //user used comma as a delimiter
        let foundComma = list.indexOf(',');

        let index = [];
        if (foundComma > 0) {
          index = list.split(',').map(function(item) {
            return item.trim();
          });;
        }

        if (typeof index === "undefined" && index === null && index.length == null && index.length === 0) {
          return;
        }
        
  
        
        let addToListArray = index;
        //modify list of options in case they already exist
        if (todos && todos.length > 0){
          const flocks = todos.map((t) => t.text);
  
          if(flocks && flocks.length >0){
            addToListArray = index.filter(x => !flocks.includes(x)); //arr_diff(index,flocks);            
                
          }       
        }
        for (let i in addToListArray) {
          addTodo({
            id: Math.floor(Math.random() * 10000),
            text: addToListArray[i].trim(),
            isComplete: true,
            votes: 0
          });
        }        
       

      
      } 
      const handlePublishQuestion = (question) => {     
        gtag('event', 'click_publish_question_button', {
          //poll_title: 'some title',
        });   
        addQuestion(question);     
      }
    return(
        <>
          {loading && <Loading />}
           <div className="white-bg border border-1 p-2 my-2 ">
              <QuestionModalDialog  
                  addFlocksToOptions={addFlocksToOptions}   
                  handlePublishQuestion={handlePublishQuestion}                 
                  addTodo={addTodo}              
                  updateTodo={updateTodo}
                  removeTodo={removeTodo}                   
                  todos={todos}
                  user = {user}
                />
            </div>
        </>
    );
};
export default QuestionAndPoll2;