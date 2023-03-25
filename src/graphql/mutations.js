/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      locale
      email
      name
      userTag
      birthdate
      gender
      address
      votes
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      locale
      email
      name
      userTag
      birthdate
      gender
      address
      votes
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      locale
      email
      name
      userTag
      birthdate
      gender
      address
      votes
      owner
      createdAt
      updatedAt
    }
  }
`;
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
      id
      text
      userID
      userName
      voteEndAt
      sentiment
      parentID
      questionTag
      options
      stats
      createdAt
      updatedAt
    }
  }
`;
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
      id
      text
      userID
      userName
      voteEndAt
      sentiment
      parentID
      questionTag
      options
      stats
      createdAt
      updatedAt
    }
  }
`;
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
      id
      text
      userID
      userName
      voteEndAt
      sentiment
      parentID
      questionTag
      options
      stats
      createdAt
      updatedAt
    }
  }
`;
export const createStat = /* GraphQL */ `
  mutation CreateStat(
    $input: CreateStatInput!
    $condition: ModelStatConditionInput
  ) {
    createStat(input: $input, condition: $condition) {
      id
      stats
      questionID
      userID
      userName
      createdAt
      updatedAt
    }
  }
`;
export const updateStat = /* GraphQL */ `
  mutation UpdateStat(
    $input: UpdateStatInput!
    $condition: ModelStatConditionInput
  ) {
    updateStat(input: $input, condition: $condition) {
      id
      stats
      questionID
      userID
      userName
      createdAt
      updatedAt
    }
  }
`;
export const deleteStat = /* GraphQL */ `
  mutation DeleteStat(
    $input: DeleteStatInput!
    $condition: ModelStatConditionInput
  ) {
    deleteStat(input: $input, condition: $condition) {
      id
      stats
      questionID
      userID
      userName
      createdAt
      updatedAt
    }
  }
`;
export const createOption = /* GraphQL */ `
  mutation CreateOption(
    $input: CreateOptionInput!
    $condition: ModelOptionConditionInput
  ) {
    createOption(input: $input, condition: $condition) {
      id
      options
      questionID
      userID
      userName
      createdAt
      updatedAt
    }
  }
`;
export const updateOption = /* GraphQL */ `
  mutation UpdateOption(
    $input: UpdateOptionInput!
    $condition: ModelOptionConditionInput
  ) {
    updateOption(input: $input, condition: $condition) {
      id
      options
      questionID
      userID
      userName
      createdAt
      updatedAt
    }
  }
`;
export const deleteOption = /* GraphQL */ `
  mutation DeleteOption(
    $input: DeleteOptionInput!
    $condition: ModelOptionConditionInput
  ) {
    deleteOption(input: $input, condition: $condition) {
      id
      options
      questionID
      userID
      userName
      createdAt
      updatedAt
    }
  }
`;
