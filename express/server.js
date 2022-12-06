require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const { API_ROOT } = require('../config');
const app = express();
app.use(express.json());

require('../cors')(app);

// const mongoose = require('mongoose');
// startGraphQL,,  startPostgres
const  { startMongo } = require('../database/utils/connections');

const MongoRestfulRouter = require('../database/mongo/mongo-restful/mongo-restful-routes');
// const PostgresQLRouter = require('../database/postresql/postgresql-router');
// const AdminRouter = require('../admin/admin-router');

app.use(`${API_ROOT}/mongo-restful`, MongoRestfulRouter);


startMongo();
// let apolloServer = startGraphQL(app);
// startPostgres(app);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

module.exports = app;
module.exports.handler = serverless(app);