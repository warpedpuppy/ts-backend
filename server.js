require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const  { startMongo, startGraphQL, startPostgres } = require('./database/utils/connections');

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const MongoRestfulRouter = require('./database/mongo/mongo-restful/mongo-restful-routes');
const PostgresQLRouter = require('./database/postresql/postgresql-router');



app.use('/mongo-restful', MongoRestfulRouter);
app.use('/postresql-restful', PostgresQLRouter);


startMongo();
startGraphQL(app);
startPostgres(app);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
  //console.log(`Graphql Endpoint: ${apolloServer.graphqlPath}`);
});