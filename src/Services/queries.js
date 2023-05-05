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

const GetCommentsByQuestionId = async(questionID) =>{ 
  const data = await API.graphql(graphqlOperation(queries.commentByQuestionId, { questionID }));  
  return data.data.commentByQuestionId.items.length ? data.data.commentByQuestionId.items : null;
}

const GetQuestionByUserId = async (userID) => {
  const data = await API.graphql(graphqlOperation(queries.questionByUserId, { userID }));
  return data.data.questionByUserId.items.length ? data.data.questionByUserId.items.length : null;
};

const GetAllOpenQuestions = async(limit, nextToken) => {
  console.log("next next token",nextToken );
  const data = await API.graphql(graphqlOperation(queries.listQuestions, {   
    limit: limit,
    nextToken: nextToken,
    //sortDirection: 'ASC',
    filter: {
      and: [       
       // { voteEndAt: { gt: new Date() } },
        { parentID:  { eq: null } },      
      ]
    }, 
  }));
//console.log(" query all questions with limits and next token", data.data.listQuestions);
  return data.data.listQuestions.items.length ? data.data.listQuestions : null;
}

const GetAllQuestions = async(limit, nextToken) => {
  const data = await API.graphql(graphqlOperation(queries.listQuestions, {   
    filter: {
      parentID: {
            eq: null
      }
    },  
    limit: limit,
    nextToken: nextToken,
  
}));
console.log(" query all questions with limits ", data.data.listQuestions.items);
  return data.data.listQuestions.items.length ? data.data.listQuestions : null;
}

const GetAllUsers = async() => {
  const data = await API.graphql(graphqlOperation(queries.listUsers));
  return data.data.listUsers.items.length ? data.data.listUsers.items : null;
}

const GetSingleQuestion = async(id) => {
  const data = await API.graphql(graphqlOperation(queries.getQuestion, { id }));
  return data.data.getQuestion ? data.data.getQuestion : null;
}

const GetVotesByUserId = async( userID ) => {
  const data = await API.graphql(graphqlOperation(queries.voteByUserId, { userID }));
  return data.data.voteByUserId.items.length ? data.data.voteByUserId.items : null;
}

const GetVotesByQuestionId = async( questionID ) => {
  const data = await API.graphql(graphqlOperation(queries.voteByQuestionId, { questionID }));
  return data.data.voteByQuestionId.items.length ? data.data.voteByQuestionId.items : null;
}

const GetVotesByOptionId = async( optionID ) => {
  const data = await API.graphql(graphqlOperation(queries.voteByOptionId, { optionID }));
  return data.data.voteByOptionId.items.length ? data.data.voteByOptionId.items : null;
}

const GetAllVotes = async() => {
  const data = await API.graphql(graphqlOperation(queries.listVotes));
  return data.data.listVotes.items.length ? data.data.listVotes.items : null;
}

const GetAllComments = async() => {
  const data = await API.graphql(graphqlOperation(queries.listComments));
  return data.data.listComments.items.length ? data.data.listComments.items : null;
}

const Queries = {
  GetUserByEmail,
  GetAllQuestions,
  GetAllOpenQuestions,
  GetAllUsers,
  GetSingleQuestion,
  GetQuestionByUserId,
  GetUserById,
  GetCommentsByQuestionId,
  GetAllComments,
  GetVotesByUserId,
  GetAllVotes,
  GetVotesByQuestionId,
  GetVotesByOptionId,
};




export default Queries;