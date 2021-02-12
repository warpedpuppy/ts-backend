const express = require('express');
const PostgresQLRouter = express.Router();
const PostgresQLServices = require('./postgresql-services');
PostgresQLRouter
.get('/', (req, res) => {
    let result = await PostgresQLServices.getAll(req.app.get('db'))
    res.status(200).json({success: true, result})
})
.post('/', async (req, res) => {
    try {
        let result = await PostgresQLServices.insertOne(req.app.get('db'), {character_name: "testName", character_color: "#FFOOFF"})
        res.status(200).json({success: true})
    } catch (e) {
        console.error(e)
    }

})

module.exports = PostgresQLRouter;