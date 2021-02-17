const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    greetings: String
    characters(input: UserID!): [Character!]
  }
  type Character {
    userid: String!
    id: ID!
    name: String!
    color: String!
  }
  input UserID {
    userid: String!
  }
  input createCharacterInput {
    userid: String!
    name: String!
    color: String!
  }
  input deleteCharacterInput {
    id: ID!
  }
  input deleteAllCharacterInput {
    userid: String!
    empty: Boolean!
  }
  input updateCharacterInput {
    id: ID!
    name: String!
    color: String!
  }
  type Mutation {
    createCharacter(input: createCharacterInput!): Character!
    updateCharacter(input: updateCharacterInput!): [Character!]
    deleteCharacter(input: deleteCharacterInput!): [Character!]
    deleteAllCharacters(input: deleteAllCharacterInput!): Boolean
  }
`;