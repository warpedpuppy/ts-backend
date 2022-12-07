const mongoose = require('mongoose');
// const knex = require('knex');
// const knexServerlessMysql = require('knex-serverless-mysql');
// const Config = require('../../config');
// const CharacterModel = require('../models/characterModel');
// const uuid = require('uuid');
//   const { ApolloServer } = require('apollo-server-express');
//   const typeDefs = require('../mongo/graphql/typeDefs');
//   const resolvers = require('../mongo/graphql/resolvers');

try {
	const knex = require('knex');
} catch(e) {
	console.log("*****************")
	console.log("*****************")
	console.log("*****************")
	console.error(e)
	console.log("*****************")
	console.log("*****************")
	console.log("*****************")
	console.log("*****************")

}

//MONGODB
async function startMongo () {
  try {
    if (process.env.ENVOLOPE === 'local') mongoose.set('debug', true);
    await mongoose.connect(process.env.MONGO_REMOTE, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('mongo remote database connected successfully.');
  } catch (error) {
    console.log('mongo remote database could not connect.');
    console.error(error);
    //throw error;
  }
}



//GRAPHQL
// function startGraphQL (app) {
//   const apolloServer = new ApolloServer({
//   typeDefs,
//   resolvers
// });
// apolloServer.applyMiddleware({ app, path: '/graphql' });
// return apolloServer;
// }




//POSTGRESQL
function startPostgres (app) {
  try {
    let postgres_connection = process.env.ENVELOPE === 'local' ? process.env.POSTGRES_LOCAL : process.env.POSTGRES_REMOTE;
    // 
    // const db = knex({
    //   client: 'pg',
    //   connection: postgres_connection,
    // })

    if (process.env.ENVELOPE === 'local') {
      console.log(`connected to local posgresql db`)
    } else {
      console.log(`connected to remote posgresql db`)
    }
    app.set('db', db)
  } catch (e) {
      if (process.env.ENVELOPE === 'local') {
        console.log(`problem connecting to local posgresql db`)
      } else {
        console.log(`problem connecting to remote posgresql db`)
      }
  }
}
// startGraphQL
module.exports = { startMongo, startPostgres  }
