const express = require('express');
const PostgresQLRouter = express.Router();
const PostgresQLServices = require('./postgresql-services');
PostgresQLRouter
.get('/user/:userid', async (req, res) => {
    try {
        let { characters, query } = await PostgresQLServices.getAll(req.app.get('db'), req.params.userid)
        res.status(200).json({characters, query})
    } catch (e) {
        console.log(e)
    }
   
})
.get('/total', async (req, res) => {
    try {
        let total = await PostgresQLServices.getTotal(req.app.get('db'))
        res.status(200).json({total})
    } catch (e) {
        console.log(e)
    }
   
})
.post('/', async (req, res) => {
    try {
        let {character, query} = await PostgresQLServices.insertOne(req.app.get('db'), req.body)
        res.status(200).json({success: true, character, query})
    } catch (e) {
        console.error(e)
    }

})
.put('/', async (req, res) => {
    try {
        let { character, query, response } = await PostgresQLServices.updateOne(req.app.get('db'), req.body)
        res.status(200).json({success: true, character, query, response})
    } catch (e) {
        console.error(e)
    }
})
.delete('/', async (req, res) => {
    try {
        let { query, character } = await PostgresQLServices.deleteOne(req.app.get('db'), req.body.id)
        res.status(200).json({success: true, character, query})
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
.delete('/empty', async (req, res) => {
    try {
        let result = await PostgresQLServices.empty(req.app.get('db'))
        res.status(200).json({success: true, result})
    } catch (e) {
        console.error(e)
    }
})
module.exports = PostgresQLRouter;