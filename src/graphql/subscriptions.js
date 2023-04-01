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
    $owner: String
  ) {
    onCreateQuestion(filter: $filter, owner: $owner) {
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
      comments {
        nextToken
      }
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
      sentiment
      parentID
      questionTag
      options
      stats
      comments {
        nextToken
      }
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
      sentiment
      parentID
      questionTag
      options
      stats
      comments {
        nextToken
      }
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
      optionID
      comment
      owner
      createdAt
      updatedAt
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
      optionID
      comment
      owner
      createdAt
      updatedAt
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
      optionID
      comment
      owner
      createdAt
      updatedAt
    }
  }
`;
