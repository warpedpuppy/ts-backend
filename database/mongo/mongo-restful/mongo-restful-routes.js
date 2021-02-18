const express = require('express');
const MongoRestfulRouter = express.Router();
const MongoRestfulServices = require('./mongo-restful-services');
MongoRestfulRouter
.get('/test', async (req, res) => {
    res.status(200).json({success: true})
})
.get('/:userid', async (req, res) => {
    try {
        let characters =  await MongoRestfulServices.getAll(req.params.userid);
        console.log(characters)
        res.status(200).json(characters)
    } catch (e) {
        res.status(500).json({success: false})
    }
})
.post('/', async (req, res) => {
    try {
        let character = await MongoRestfulServices.create(req.body);
        res.status(200).json(character)
    } catch (e) {
        res.status(500).json({success: false})
    }
  
})
.put('/', async (req, res) => {
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
        let result = await MongoRestfulServices.deleteOne(req.body.id);
        let result2 = result ? await MongoRestfulServices.getAll() : [];
        res.status(200).json(result2)
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