require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const { API_ROOT } = require('../config');
const app = express();
app.use(express.json());

require('../cors')(app);

const mongoose = require('mongoose');
const  { startMongo, startGraphQL, startPostgres } = require('../database/utils/connections');

const MongoRestfulRouter = require('../database/mongo/mongo-restful/mongo-restful-routes');
const PostgresQLRouter = require('../database/postresql/postgresql-router');
const AdminRouter = require('../admin/admin-router');

app.use(`${API_ROOT}/mongo-restful`, MongoRestfulRouter);
app.use(`${API_ROOT}/postgresql-restful`, PostgresQLRouter);
app.use(`${API_ROOT}/admin`, AdminRouter);

startMongo();
let apolloServer = startGraphQL(app);
startPostgres(app);

app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send("Something broke!");
});
  




// const MOVIE_ROUTER = require('../movies/movie-router');
// const USERS_ROUTER = require('../users/users-router');


// app.use(`${API_ROOT}/movies`, MOVIE_ROUTER);  
// app.use(`${API_ROOT}/users`, USERS_ROUTER);  

module.exports = app;
module.exports.handler = serverless(app);
