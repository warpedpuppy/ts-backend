const express = require('express');
const mongoose = require('mongoose');
const uuid = require('uuid');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
const { characters } = require('./constants');
const CharacterModel = require('./database/models/characterModel');
const { connection } = require('./database/utils/');

connection();

const typeDefs = gql`
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

const resolvers = {
  Query: {
    greetings: () => "hello",
    characters: () => CharacterModel.find()
  },
  Mutation: {
    createCharacter: async (_, args) => {
      try {
        const character = { name: args.input.name, color: args.input.color, id: uuid.v4()}
        characters.push(character);
        let result = await CharacterModel.create(character)
        return result;
      } catch (e) {
        console.error(e)
      }
     
    }
  } 
}
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
  console.log(`Graphql Endpoint: ${apolloServer.graphqlPath}`);
});