import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";

const GetUserByEmail = async (email) => {
  try{
    const data = await API.graphql(graphqlOperation(queries.userByEmail, { email }));
    return data && data.data && data.data.userByEmail && data.data.userByEmail.items && data.data.userByEmail.items.length ? data.data.userByEmail.items[0] : null;
  }catch(error){
    console.error("GetUserByEmail  error ", error);
  }  

};

const GetUserById = async ( id ) => {
    const data = await API.graphql(graphqlOperation(queries.getUser, { id }));   
    return data.data.getUser ? data.data.getUser : null;
}

const CommentByQuestionId = async(questionID) =>{ 
  const data = await API.graphql(graphqlOperation(queries.commentByQuestionId, { questionID })); 
  return data.data.commentByQuestionId.items.length ? data.data.commentByQuestionId.items : null;
}

const GetQuestionByUserId = async (userID) => {
  const data = await API.graphql(graphqlOperation(queries.questionByUserId, { userID }));
  return data.data.questionByUserId.items.length ? data.data.questionByUserId.items.length : null;
};

const GetAllQuestions = async() => {
  const data = await API.graphql(graphqlOperation(queries.listQuestions));
  return data.data.listQuestions.items.length ? data.data.listQuestions.items : null;
}

const GetSingleQuestion = async(id) => {
  const data = await API.graphql(graphqlOperation(queries.getQuestion, { id }));
  return data.data.getQuestion ? data.data.getQuestion : null;
}

const Queries = {
  GetUserByEmail,
  GetAllQuestions,
  GetSingleQuestion,
  GetQuestionByUserId,
  GetUserById,
  CommentByQuestionId,
};




export default Queries;