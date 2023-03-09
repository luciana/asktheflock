/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
      id
      locale
      email
      name
      userTag
      birthdate
      gender
      address
      votes
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
      id
      locale
      email
      name
      userTag
      birthdate
      gender
      address
      votes
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
      id
      locale
      email
      name
      userTag
      birthdate
      gender
      address
      votes
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion(
    $filter: ModelSubscriptionQuestionFilterInput
    $userID: String
  ) {
    onCreateQuestion(filter: $filter, userID: $userID) {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion(
    $filter: ModelSubscriptionQuestionFilterInput
    $userID: String
  ) {
    onUpdateQuestion(filter: $filter, userID: $userID) {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion(
    $filter: ModelSubscriptionQuestionFilterInput
    $userID: String
  ) {
    onDeleteQuestion(filter: $filter, userID: $userID) {
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
