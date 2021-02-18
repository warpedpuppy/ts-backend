const express = require('express');
const PostgresQLRouter = express.Router();
const PostgresQLServices = require('./postgresql-services');
PostgresQLRouter
.get('/:userid', async (req, res) => {
    try {
        let result = await PostgresQLServices.getAll(req.app.get('db'), req.params.userid)
        res.status(200).json({success: true, result})
    } catch (e) {
        console.log(e)
    }
   
})
.post('/', async (req, res) => {
    try {
        let character = await PostgresQLServices.insertOne(req.app.get('db'), req.body)
        console.log(character)
        res.status(200).json({success: true, character})
    } catch (e) {
        console.error(e)
    }

})
.put('/', async (req, res) => {
    try {
        let character = await PostgresQLServices.updateOne(req.app.get('db'), req.body)
        res.status(200).json({success: true, character})
    } catch (e) {
        console.error(e)
    }
})
.delete('/', async (req, res) => {
    try {
        let characters = await PostgresQLServices.deleteOne(req.app.get('db'), req.body.id)
        res.status(200).json({success: true, characters})
    } catch (e) {
        console.error(e)
    }
})
.delete('/delete-all', async (req, res) => {
    try {
        let characters = await PostgresQLServices.deleteAll(req.app.get('db'), req.body.userid)
        res.status(200).json({success: true, characters})
    } catch (e) {
        console.error(e)
    }
})
module.exports = PostgresQLRouter;