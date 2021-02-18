const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    greetings: String
    characters(input: UserID!): [Character!]
  }
  type Character {
    userid: String!
    id: ID!
    character_name: String!
    character_color: String!
    createdAt: String!
    updatedAt: String!
  }
  input UserID {
    userid: String!
  }
  input createCharacterInput {
    userid: String!
    character_name: String!
    character_color: String!
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
    character_name: String!
    character_color: String!
  }
  type Mutation {
    createCharacter(input: createCharacterInput!): Character!
    updateCharacter(input: updateCharacterInput!): Character!
    deleteCharacter(input: deleteCharacterInput!): Boolean!
    deleteAllCharacters(input: deleteAllCharacterInput!): Boolean
  }
`;