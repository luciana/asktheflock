/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      locale
      email
      name
      userTag
      birthdate
      lastLoggedIn
      loggedInCount
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
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      locale
      email
      name
      userTag
      birthdate
      lastLoggedIn
      loggedInCount
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
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      locale
      email
      name
      userTag
      birthdate
      lastLoggedIn
      loggedInCount
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
    $owner: String
  ) {
    onCreateQuestion(filter: $filter, owner: $owner) {
      id
      text
      userID
      userName
      voteEndAt
      type
      sentiment
      parentID
      questionTag
      options
      stats
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion(
    $filter: ModelSubscriptionQuestionFilterInput
    $owner: String
  ) {
    onUpdateQuestion(filter: $filter, owner: $owner) {
      id
      text
      userID
      userName
      voteEndAt
      type
      sentiment
      parentID
      questionTag
      options
      stats
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion(
    $filter: ModelSubscriptionQuestionFilterInput
    $owner: String
  ) {
    onDeleteQuestion(filter: $filter, owner: $owner) {
      id
      text
      userID
      userName
      voteEndAt
      type
      sentiment
      parentID
      questionTag
      options
      stats
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onCreateComment(filter: $filter, owner: $owner) {
      id
      questionID
      userID
      optionID
      optionText
      comment
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onUpdateComment(filter: $filter, owner: $owner) {
      id
      questionID
      userID
      optionID
      optionText
      comment
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onDeleteComment(filter: $filter, owner: $owner) {
      id
      questionID
      userID
      optionID
      optionText
      comment
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateVote = /* GraphQL */ `
  subscription OnCreateVote($filter: ModelSubscriptionVoteFilterInput) {
    onCreateVote(filter: $filter) {
      id
      userID
      userName
      questionID
      optionID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateVote = /* GraphQL */ `
  subscription OnUpdateVote($filter: ModelSubscriptionVoteFilterInput) {
    onUpdateVote(filter: $filter) {
      id
      userID
      userName
      questionID
      optionID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteVote = /* GraphQL */ `
  subscription OnDeleteVote($filter: ModelSubscriptionVoteFilterInput) {
    onDeleteVote(filter: $filter) {
      id
      userID
      userName
      questionID
      optionID
      createdAt
      updatedAt
    }
  }
`;
