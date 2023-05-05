import { STATENAME, TYPES } from "../Constants";

function saveState(state) {
  localStorage.setItem(STATENAME, JSON.stringify(state));
}

function updateLang(state, payload) {
  const newState = { ...state, lang: payload };
  //console.log("updateLang state = ", newState);
  //saveState(newState); 
  return newState;
}

function updateUser(state, payload) {
  //localStorage.removeItem(STATENAME);
  const newState = { ...state, user: payload };
 // console.log("updateUser state = ", newState);
  //saveState(newState);
  return newState;
}

function updateVotes(state, payload) {  
  const newState = { ...state, myVotes: payload, votesCount: payload.length ? payload.length :0 };
  
 // console.log("updateVotes state = ", newState);
  return newState;
}

function deleteQuestion(state, payload) {
  const questions = (state?.questions).filter((q) => q.id !== payload.id);
  const newState = { ...state, questions: questions };
  console.log("deleteQuestion state = ", newState);
  return newState;
}

function updateQuestions(state, payload) {  
  const questions = state?.questions;
  console.log("reducer questions already in  state = ", questions);
  const newQuetions = [payload];
  console.log("reducer questions to be added to  state = ", newQuetions);
  const updatedQuestions = questions.map(obj => newQuetions.find(o => o.id === obj.id) || obj);
  console.log("reducer merged questions  state = ", updatedQuestions);
  const newState = { ...state, questions: updatedQuestions };
  console.log("updateQuestions state = ", newState);
  return newState;
}

function addQuestions(state, payload) {  
  
  const newState = { ...state, questions: payload };
  console.log("addQuestions state = ", newState);
  return newState;
}

function addQuestion(state, payload) {  
  let questions = state?.questions;
  if(questions){
    questions.push(payload);
  }else{
    questions = [payload];
  }

  const sortedItems = questions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                     .sort((a, b) => ((new Date(a.voteEndAt) - new Date() < 1) - (new Date(b.voteEndAt) - new Date() < 1))); 
  
  const newState = { ...state, questions: sortedItems };
  console.log("addQuestion one new question state = ", newState);
  return newState;
}

export default function AppReducer(state, { type, payload }) {

  switch (type) {
    case TYPES.UPDATE_LANG:
      return updateLang(state, payload);
    case TYPES.UPDATE_USER:
      return updateUser(state, payload);
    case TYPES.UPDATE_VOTES:
        return updateVotes(state, payload);
    case TYPES.UPDATE_QUESTION:
        return updateQuestions(state, payload);
    case TYPES.ADD_QUESTIONS:
          return addQuestions(state, payload);
    case TYPES.ADD_QUESTION:
          return addQuestion(state, payload);
    case TYPES.DELETE_QUESTION:
          return deleteQuestion(state, payload);
    default:
      throw new Error("TYPE NOT FOUND");
  }
}

 //function QuestionReducer(state, { type, payload }) {

//   switch (type) {   
//     case TYPES.UPDATE_VOTES:
//         return updateVotes(state, payload);
//     case TYPES.UPDATE_QUESTION:
//         return updateQuestions(state, payload);
//     case TYPES.ADD_QUESTIONS:
//           return addQuestions(state, payload);
//     case TYPES.ADD_QUESTION:
//           return addQuestion(state, payload);
//     case TYPES.DELETE_QUESTION:
//           return deleteQuestion(state, payload);
//     default:
//       throw new Error("TYPE NOT FOUND");
//   }
// }

// export default {AppReducer, QuestionReducer};