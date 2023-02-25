import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../graphql/queries";

const GetUserByEmail = async (email) => {
  try{
  //   console.log("GetUserByEmail  for ", email);
    const data = await API.graphql(graphqlOperation(queries.userByEmail, { email }));
    console.log("GetUserByEmail  result ", data);
    return data && data.data && data.data.userByEmail && data.data.userByEmail.items && data.data.userByEmail.items.length ? data.data.userByEmail.items[0] : null;
  }catch(error){
    console.error("GetUserByEmail  error ", error);
  }  

};

const GetQuestionByUserId = async (email) => {
  const data = await API.graphql(graphqlOperation(queries.questionByUserId, { email }));

  return data.data.questionByUserId.items.length ? data.data.questionByUserId.items[0] : null;
};

const GetAllQuestions = async() => {


  const data = await API.graphql(graphqlOperation(queries.listQuestions));

  return data.data.listQuestions.items.length ? data.data.listQuestions.items : null;
}

const Queries = {
  GetUserByEmail,
  GetAllQuestions,
  GetQuestionByUserId
};




export default Queries;