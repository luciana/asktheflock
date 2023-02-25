import React, {useState} from 'react';
import QuestionModalDialog from './QuestionModalDialog';
import { useNavigate } from 'react-router-dom';
import { Loading }  from '../../Components';
import Mutations from "../../Services/mutations";

const TAG = "#flocks";

function QuestionAndPoll2({
    parentId = null,
    user,
}){

    const [todos, setTodos] = useState([]); 
    const [question, setQuestion] = useState([]);     
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    console.log("USER in Questions and Poll 2", user);

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

        console.log("userName = ", userName);
        console.log("before create question mutation question = ", question);

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
        setQuestion(question);      
        console.log("Create Questions in db", q);   
        navigate('/Main');        
 
      }catch(err){
        console.error("Error on Mutations.CreateQuestion ", err);
      }        
    };
    
      const addTodo = todo => {
        console.log('add Todo', todo);
        if (!todo.text || /^\s*$/.test(todo.text)) {
          return;
        }
    
        setTodos(todos => {  
          const newArray = [...todos]; 
          newArray.push(todo); 
          return newArray; 
        });
        console.log('add Todo after adding it', todo);
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

     


      const addPostOptionsFromQuestion = (question)  => {
        let v = question.text;
        if (!v || /^\s*$/.test(v)) {
          return;
        }

        //Setup Poll automatically with the files in #flocks
        let found = v.indexOf(TAG);

        //user has not entered the tag to automatically setup the poll
        if (found === -1) {
          //TODO: #flocks not used
        }


        let list = v.substring(found + TAG.length);
        //user has not entered the tag with a list of itemes
        if (!list || /^\s*$/.test(list)) {
          return;
        }


        //user used comma as a delimiter
        let foundComma = list.indexOf(',');

        let index = [];
        if (foundComma > 0) {
          index = list.split(',');
        }

        if (typeof index === "undefined" && index === null && index.length == null && index.length === 0) {
          return;
        }
        
        console.log("index",index);
        for (let i in index) {
          addTodo({
            id: Math.floor(Math.random() * 10000),
            text: index[i].trim(),
            isComplete: true,
            votes: 0
          });
        }
        setQuestion(question);
      } 

      


      const handlePublishQuestion = e => {
        e.preventDefault();  
        question.options = todos;     

        addQuestion(question);
        // const isValidForm = todos.length >= 2 && todos.length <= 5; 
        // console.log("is Question publishing valid - must have a date in the future and items > 2 and < 5", todos.length);
        // if (isValidForm){
         
        // }else{
        //   alert("Please enter options to your question ( min of 2 and max of 5 )");
        //   return;
        // } 
           
      }
    return(
        <>
          {loading && <Loading />}
           <div className="white-bg container border border-1 p-2 ">
              <QuestionModalDialog  
                  addPostOptionsFromQuestion={addPostOptionsFromQuestion}   
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