const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    greetings: String
    characters: [Character!]
  }
  type Character {
    id: ID!
    name: String!
    color: String!
  }
  input createCharacterInput {
    name: String!
    color: String!
  }
  input deleteCharacterInput {
    id: ID!
  }
  input deleteAllCharacterInput {
    empty: Boolean!
  }
  input updateCharacterInput {
    id: ID!
    name: String!
    color: String!
  }
  type Mutation {
    createCharacter(input: createCharacterInput!): Character
    updateCharacter(input: updateCharacterInput!): Character
    deleteCharacter(input: deleteCharacterInput!): [Character!]
    deleteAllCharacters(input: deleteAllCharacterInput!): Boolean
  }
`;
// should 'extend' be before Query and Mutation?