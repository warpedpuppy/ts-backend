const express = require('express');
const MongoRestfulRouter = express.Router();
const MongoRestfulServices = require('./mongo-restful-services');
MongoRestfulRouter
.get('/test', async (req, res) => {
    res.status(200).json({success: true})
})
.get('/', async (req, res) => {
    try {
        let result2 =  await MongoRestfulServices.getAll();
        res.status(200).json(result2)
    } catch (e) {
        res.status(500).json({success: false})
    }
})
.post('/', async (req, res) => {
    try {
        let result = await MongoRestfulServices.create(req.body);
        let result2 = result ? await MongoRestfulServices.getAll() : [];
        res.status(200).json(result2)
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
        let result = await MongoRestfulServices.deleteAll();
        res.status(200).json(result)
    } catch (e) {
        res.status(500).json({success: false})
    }
  
})
module.exports = MongoRestfulRouter;