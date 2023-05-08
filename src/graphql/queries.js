/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
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
      createdAt
      stats
      owner
      updatedAt
    }
  }
`;
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $id: ID
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listQuestions(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
        createdAt
        stats
        owner
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $id: ID
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listComments(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getVote = /* GraphQL */ `
  query GetVote($id: ID!) {
    getVote(id: $id) {
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
export const listVotes = /* GraphQL */ `
  query ListVotes(
    $id: ID
    $filter: ModelVoteFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listVotes(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        userID
        userName
        questionID
        optionID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userByEmail = /* GraphQL */ `
  query UserByEmail(
    $email: AWSEmail!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const usersByUserTagAndId = /* GraphQL */ `
  query UsersByUserTagAndId(
    $userTag: String!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByUserTagAndId(
      userTag: $userTag
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const questionByUserId = /* GraphQL */ `
  query QuestionByUserId(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    questionByUserId(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        stats
        owner
        updatedAt
      }
      nextToken
    }
  }
`;
export const questionsByVoteEndDate = /* GraphQL */ `
  query QuestionsByVoteEndDate(
    $type: String!
    $createdAtVoteEndAt: ModelQuestionQuestionsByVoteEndDateCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    questionsByVoteEndDate(
      type: $type
      createdAtVoteEndAt: $createdAtVoteEndAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        createdAt
        stats
        owner
        updatedAt
      }
      nextToken
    }
  }
`;
export const commentByQuestionId = /* GraphQL */ `
  query CommentByQuestionId(
    $questionID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentByQuestionId(
      questionID: $questionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const voteByUserId = /* GraphQL */ `
  query VoteByUserId(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelVoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    voteByUserId(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        userName
        questionID
        optionID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const voteByQuestionId = /* GraphQL */ `
  query VoteByQuestionId(
    $questionID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelVoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    voteByQuestionId(
      questionID: $questionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        userName
        questionID
        optionID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const voteByOptionId = /* GraphQL */ `
  query VoteByOptionId(
    $optionID: Int!
    $sortDirection: ModelSortDirection
    $filter: ModelVoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    voteByOptionId(
      optionID: $optionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        userName
        questionID
        optionID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
