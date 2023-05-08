import { API, graphqlOperation } from "aws-amplify";
import * as mutations from "../graphql/mutations";

const CreateUser = async (email, locale,  name, address, birthdate, gender) => {

  try{
    const {
      data: { createUser },
    } = await API.graphql(
      graphqlOperation(mutations.createUser, { input: { email, locale, name, address, birthdate, gender } })
    );
    return createUser;
  }catch(error){
    console.error("CreateUser mutation error",error);
  }
  
};

const UpdateUser = async ( {id, email, locale, name, gender, address, birthdate, userTag} ) => {
  if (birthdate){
    const {
      data: { updateUser },
    } = await API.graphql(
      graphqlOperation(mutations.updateUser, {
        input: { id, email, locale, name, gender, address, birthdate, userTag },
      })
    );
    return updateUser;
  }else{
    const {
      data: { updateUser },
    } = await API.graphql(
      graphqlOperation(mutations.updateUser, {
        input: { id, email, locale, name, gender, address, userTag },
      })
    );
    return updateUser;
  }
  
};

const UpdateUserLoggedInData = async ( {id, lastLoggedIn, loggedInCount} ) => {
  const data  = await API.graphql(
    graphqlOperation(mutations.updateUser, {
      input: { id, lastLoggedIn, loggedInCount },
    })
  );  
  return data.data.updateUser ? data.data.updateUser : null;
};

const UpdateUserName = async ( {id, name} ) => {
  const {
    data: { updateUser },
  } = await API.graphql(
    graphqlOperation(mutations.updateUser, {
      input: { id, name },
    })
  );
  return updateUser;
};

const UpdateUserTag = async ( {id, userTag} ) => {
  const {
    data: { updateUser },
  } = await API.graphql(
    graphqlOperation(mutations.updateUser, {
      input: { id, userTag },
    })
  );
  return updateUser;
};

const UpdateUserZip = async ( {id, address} ) => {
  const {
    data: { updateUser },
  } = await API.graphql(
    graphqlOperation(
      mutations.updateUser, {
      input: { id, address },
    })
  );
  return updateUser;
};

const UpdateUserBirthdate = async ({ id, birthdate} ) => {
  const {
    data: { updateUser },
  } = await API.graphql(
    graphqlOperation(mutations.updateUser, {
      input: { id, birthdate },
    })
  );
  return updateUser;
};

const UpdateUserGender = async ({ id, gender} ) => {
  const {
    data: { updateUser },
  } = await API.graphql(
    graphqlOperation(mutations.updateUser, {
      input: { id, gender },
    })
  );
  
  return updateUser;
};




const UpdateUserVotes = async ( id, votes ) => {
  //votes = [{\"optionId\":3942,\"questionId\":\"7998615d-88dd-427a-a20f-1a2851d009b3\"}]  
  const {
    data: { updateUser },
  } = await API.graphql(
    graphqlOperation(mutations.updateUser, {
      input: { id,votes },
    })
  );
  return updateUser;
};

// updateQuestion(input: {id: "b35d6d5e-4160-40d2-951d-6444d7fe90a2"
//   options:"[{\"votes\":1,\"id\":1,\"text\":\"reactjs\"},{\"votes\":0,\"id\":2,\"text\":\"vuejs\"}]"})
const UpdateQuestionOptions = async ( id, options, stats, voteEndAt ) => { 
  const {
    data: { updateQuestion },
  } = await API.graphql(
    graphqlOperation(mutations.updateQuestion, {
      input: { id, options, stats, voteEndAt },
    })
  );
  return updateQuestion;
};

const UpdateQuestionVoteEndAt = async ( id, voteEndAt ) => { 
  const {
    data: { updateQuestion },
  } = await API.graphql(
    graphqlOperation(mutations.updateQuestion, {
      input: { id, voteEndAt },
    })
  );
  return updateQuestion;
};

const CreateQuestion = async (
  text, 
  userID,
  voteEndAt,
  type,
  sentiment,
  userName,
  parentID,
  questionTag,
  options,
  createdAt,
    ) => {

  const {
    data: { createQuestion },
  } = await API.graphql(
    graphqlOperation(mutations.createQuestion, { input: 
      {   text, 
        userID,
        voteEndAt,
        type,
        sentiment,
        userName,
        parentID,
        questionTag,
        options,
        createdAt,
      } })
  );
  return createQuestion;

}

const DeleteQuestion = async ( id ) => {
  const {
    data: { deleteQuestion },
  } = await API.graphql(
    graphqlOperation(mutations.deleteQuestion, {
      input: { id },
    })
  );
  return deleteQuestion;
};

const CreateComment = async (
  questionID, 
  userID,
  optionID,
  optionText,
  comment, 
    ) => {      
  const {
    data: { createComment },
  } = await API.graphql(
    graphqlOperation(mutations.createComment, { input: 
      {   
        questionID, 
        userID,
        optionID,
        optionText,
        comment
      } })
  );
  return createComment;

}

const UpdateComment = async ( questionID, userID, optionID, optionText, comment ) => { 
  const {
    data: { updateComment },
  } = await API.graphql(
    graphqlOperation(mutations.updateComment, {
      input: { questionID, userID, optionID, optionText, comment },
    })
  );
  return updateComment;
};

const DeleteComment = async ( id ) => {
  const data = await API.graphql(
    graphqlOperation(mutations.deleteComment, {
      input: { id },
    })
  );
  return data.data.deleteComment ? data.data.deleteComment : null;
};

const CreateVote = async (
  userID,
  userName,
  questionID, 
  optionID 
    ) => {      
  
  const data = await API.graphql(graphqlOperation(mutations.createVote, { input: 
      {   
        userID,
        userName,
        questionID, 
        optionID
      } })
  );     
  return data.data.createVote ? data.data.createVote : null;
}

const DeleteVote = async ( id ) => {
  const data = await API.graphql(
    graphqlOperation(mutations.deleteVote, {
      input: { id },
    })
  );
  return data.data.deleteVote ? data.data.deleteVote : null;
};

const Mutations = {
  CreateUser,
  UpdateUser,
  CreateQuestion,
  DeleteQuestion,
  UpdateQuestionOptions,
  UpdateQuestionVoteEndAt,
  UpdateUserVotes,
  UpdateUserTag,
  UpdateUserGender,
  UpdateUserZip,
  UpdateUserBirthdate,
  UpdateUserName,
  UpdateUserLoggedInData,
  CreateComment,
  UpdateComment,
  DeleteComment,
  CreateVote,
  DeleteVote,
};

export default Mutations;   