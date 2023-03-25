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
      gender
      address
      votes
      owner
      createdAt
      updatedAt
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
        gender
        address
        votes
        owner
        createdAt
        updatedAt
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
        sentiment
        parentID
        questionTag
        options
        stats
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStat = /* GraphQL */ `
  query GetStat($id: ID!) {
    getStat(id: $id) {
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
export const listStats = /* GraphQL */ `
  query ListStats(
    $id: ID
    $filter: ModelStatFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listStats(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        stats
        questionID
        userID
        userName
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOption = /* GraphQL */ `
  query GetOption($id: ID!) {
    getOption(id: $id) {
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
export const listOptions = /* GraphQL */ `
  query ListOptions(
    $id: ID
    $filter: ModelOptionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listOptions(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        options
        questionID
        userID
        userName
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
        gender
        address
        votes
        owner
        createdAt
        updatedAt
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
        gender
        address
        votes
        owner
        createdAt
        updatedAt
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
        sentiment
        parentID
        questionTag
        options
        stats
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const statByQuestionId = /* GraphQL */ `
  query StatByQuestionId(
    $questionID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelStatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    statByQuestionId(
      questionID: $questionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        stats
        questionID
        userID
        userName
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const optionByQuestionId = /* GraphQL */ `
  query OptionByQuestionId(
    $questionID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    optionByQuestionId(
      questionID: $questionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        options
        questionID
        userID
        userName
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
