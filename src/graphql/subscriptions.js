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
      owner
      createdAt
      updatedAt
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
      owner
      createdAt
      updatedAt
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
      owner
      createdAt
      updatedAt
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
export const onCreateStat = /* GraphQL */ `
  subscription OnCreateStat(
    $filter: ModelSubscriptionStatFilterInput
    $userID: String
  ) {
    onCreateStat(filter: $filter, userID: $userID) {
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
export const onUpdateStat = /* GraphQL */ `
  subscription OnUpdateStat(
    $filter: ModelSubscriptionStatFilterInput
    $userID: String
  ) {
    onUpdateStat(filter: $filter, userID: $userID) {
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
export const onDeleteStat = /* GraphQL */ `
  subscription OnDeleteStat(
    $filter: ModelSubscriptionStatFilterInput
    $userID: String
  ) {
    onDeleteStat(filter: $filter, userID: $userID) {
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
export const onCreateOption = /* GraphQL */ `
  subscription OnCreateOption(
    $filter: ModelSubscriptionOptionFilterInput
    $userID: String
  ) {
    onCreateOption(filter: $filter, userID: $userID) {
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
export const onUpdateOption = /* GraphQL */ `
  subscription OnUpdateOption(
    $filter: ModelSubscriptionOptionFilterInput
    $userID: String
  ) {
    onUpdateOption(filter: $filter, userID: $userID) {
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
export const onDeleteOption = /* GraphQL */ `
  subscription OnDeleteOption(
    $filter: ModelSubscriptionOptionFilterInput
    $userID: String
  ) {
    onDeleteOption(filter: $filter, userID: $userID) {
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
