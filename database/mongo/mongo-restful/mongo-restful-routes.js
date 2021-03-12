const express = require('express');
const MongoRestfulRouter = express.Router();
const MongoRestfulServices = require('./mongo-restful-services');
MongoRestfulRouter
.get('/test', async (req, res) => {
    res.status(200).json({success: true})
})
.get('/:userid', async (req, res) => {
    try {
        let { query, characters } =  await MongoRestfulServices.getAll(req.params.userid);
        res.status(200).json({ query, characters } )
    } catch (e) {
        res.status(500).json({success: false})
    }
})
.post('/', async (req, res) => {
    try {
        let {character, query} = await MongoRestfulServices.create(req.body);
        res.status(200).json({character, query})
    } catch (e) {
        res.status(500).json({success: false})
    }
  
})
.put('/', async (req, res) => {
    console.log('put', req.body)
    try {
        let result = await MongoRestfulServices.updateOne(req.body);
        let result2 = result ? await MongoRestfulServices.getAll() : [];
        res.status(200).json(result2)
    } catch (e) {
        res.status(500).json({success: false})
    }
  
})
.delete('/', async (req, res) => {
    try {
        let {query, character} = await MongoRestfulServices.deleteOne(req.body.id);
        res.status(200).json({query, character})
    } catch (e) {
        res.status(500).json({success: false})
    }
  
})
.delete('/delete-all', async (req, res) => {
    try {
        let result = await MongoRestfulServices.deleteAll(req.body.userid);
        res.status(200).json(result)
    } catch (e) {
        res.status(500).json({success: false})
    }
  
})
module.exports = MongoRestfulRouter;