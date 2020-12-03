const { gql } = require('apollo-server-express');

const characterTypeDefs = require('./characters');

const typeDefs = gql`
  scalar Date

  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [
  characterTypeDefs
]
