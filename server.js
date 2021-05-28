require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const  { startMongo, startGraphQL, startPostgres } = require('./database/utils/connections');

const cors = require('cors');

const app = express();
app.use(express.json());

let origins = process.env.ENVELOPE === 'local' ? ['http://localhost:3000/', process.env.FRONT_END_URL] : [process.env.FRONT_END_URL] ;


app.use(cors({ origins }));


const MongoRestfulRouter = require('./database/mongo/mongo-restful/mongo-restful-routes');
const PostgresQLRouter = require('./database/postresql/postgresql-router');
const AdminRouter = require('./admin/admin-router');


app.use('/mongo-restful', MongoRestfulRouter);
app.use('/postgresql-restful', PostgresQLRouter);
app.use('/admin', AdminRouter);

startMongo();
let apolloServer = startGraphQL(app);
startPostgres(app);

//Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
  console.log(`Graphql Endpoint: ${apolloServer.graphqlPath}`);
});