const express = require('express')
const gridsRouter = express.Router()
const DefaultGrid = require('../data/defaultGrid.js');
const jsonBodyParser = express.json()
const { requireAuth } = require('../../middleware/auth-middleware');
const GridService = require('./grid-service');

gridsRouter
  .route('/default-grid')
  .get((req, res) => {
    res
    .status(200)
    .json(DefaultGrid)
  })

  gridsRouter
  .get('/get-grid-ids', (req, res) => {
	console.log('get grid ids hit')
    GridService.getIDS(req.app.get('db'))
    .then ( ids => {
      res
      .status(200)
      .json(ids)
    })
    .catch( error => {
      res
      .status(500)
      .json({result: error})
    })
    
  })

  gridsRouter
  .post('/get-grid', jsonBodyParser, (req, res) => {
    GridService.getMaze(req.app.get('db'), req.body.id)
    .then ( maze => {
      res
      .status(200)
      .json(maze)
    })
    .catch( error => {
      res
      .status(500)
      .json({result: "none"})
    })
    
  })
 
  gridsRouter
  .post('/new-maze', requireAuth, jsonBodyParser, (req, res) => {
	console.log('enter new maze', req.body.data)
    GridService.insertMaze(req.app.get('db'), req.body.data)
    .then( item => {
      res
      .status(200)
      .json({newMaze: "received", success: true, item: req.body.data})
    })
    .catch( error => {
      res
      .status(500)
      .json({success: false})
    })
  })

gridsRouter
  .get('/all-mazes', async (req, res) => {
    try {
        let mazes = await GridService.getAllMazes(req.app.get('db'))
		res.status(200).json({mazes})
    } catch (e) {
		res.status(500).json({e})
    }
  })

  gridsRouter
  .delete('/delete-maze', jsonBodyParser, requireAuth, (req, res) => {
    GridService.deleteMaze(req.app.get('db'), req.body.id)
    .then( mazes => {
      res
      .status(200)
      .json({mazes})
    })
    .catch( error => console.error(error))
  })
  
module.exports = gridsRouter;