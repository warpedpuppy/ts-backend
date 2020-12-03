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
  type Mutation {
    createCharacter(input: createCharacterInput!): Character
  }
`;
// should 'extend' be before Query and Mutation?