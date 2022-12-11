const mongoose = require('mongoose');
// const Config = require('../../config');
// const CharacterModel = require('../models/characterModel');
// const uuid = require('uuid');
  const { ApolloServer } = require('apollo-server-express');
  const typeDefs = require('../mongo/graphql/typeDefs');
  const resolvers = require('../mongo/graphql/resolvers');


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
function startGraphQL (app) {
  const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
});
apolloServer.applyMiddleware({ app, path: '/graphql' });
return apolloServer;
}




//POSTGRESQL
async function startPostgres (app) {
  try {
    // let postgres_connection = process.env.POSTGRES_REMOTE;
    const knex = require('knex')
    // const db = knex({
    //   client: 'pg',
    //   connection: postgres_connection,
    // })

	const knexConfig = {
		client: 'pg',
		connection: {
		    host : process.env.POSTGRES_HOST,
			user : process.env.POSTGRES_USER,
			password : process.env.POSTGRES_PASSWORD,
		}
	  };
	let db = knex(knexConfig)

    if (process.env.ENVELOPE === 'local') {
      console.log(`connected to local posgresql db`)
    } else {
      console.log(`connected to remote posgresql db`)
    }
    app.set('db', db)
  } catch (e) {
	console.log('problem', e)
      if (process.env.ENVELOPE === 'local') {
        console.log(`problem connecting to local posgresql db`)
      } else {
        console.log(`problem connecting to remote posgresql db`)
      }
  }
}


module.exports = { startMongo, startGraphQL, startPostgres }
