const express = require('express');
const mongoose = require('mongoose');

const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());





const MongoRestfulRouter = require('./mongo-restful/mongo-restful-routes');
const PostgresQLRouter = require('./postresql-restful/postgresql-router');
const { connection } = require('./database/utils');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');



app.use('/mongo-restful', MongoRestfulRouter);
app.use('/postresql-restful', PostgresQLRouter);

//GRAPHQL
connection();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});
apolloServer.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 8080;

//POSTGRESQL
const knex = require('knex')
const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_REMOTE,
})
app.set('db', db)
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
  console.log(`Graphql Endpoint: ${apolloServer.graphqlPath}`);
});