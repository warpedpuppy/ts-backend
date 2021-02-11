const express = require('express');
const MongoRestfulRouter = express.Router();
const MongoRestfulServices = require('./mongo-restful-services');
MongoRestfulRouter
.get('/', (req, res) => {
    res.send("hello")
})
.post('/', async (req, res) => {
    MongoRestfulServices.create();
})
module.exports = MongoRestfulRouter;