import { API, graphqlOperation } from "aws-amplify";
import Auth from './auth';
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
const UpdateQuestionOptions = async ( id, options, stats ) => { 
  const {
    data: { updateQuestion },
  } = await API.graphql(
    graphqlOperation(mutations.updateQuestion, {
      input: { id, options, stats },
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
  sentiment,
  userName,
  parentID,
  questionTag,
  options
    ) => {

  const {
    data: { createQuestion },
  } = await API.graphql(
    graphqlOperation(mutations.createQuestion, { input: 
      {   text, 
        userID,
        voteEndAt,
        sentiment,
        userName,
        parentID,
        questionTag,
        options
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
};

export default Mutations;   