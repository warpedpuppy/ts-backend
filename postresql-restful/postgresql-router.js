const express = require('express');
const PostgresQLRouter = express.Router();
const PostgresQLServices = require('./postgresql-services');
PostgresQLRouter
.get('/', (req, res) => {
    
})
.post('/', async (req, res) => {
    try {
        let result = await PostgresQLServices.insertOne(req.app.get('db'), {character_name: "testName", character_color: "#FFOOFF"})
        console.log(result)
        res.status(200).json({success: true})
    } catch (e) {
        console.error(e)
    }

})

module.exports = PostgresQLRouter;