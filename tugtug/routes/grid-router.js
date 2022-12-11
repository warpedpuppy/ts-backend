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
requireAuth, 
  gridsRouter
  .post('/new-maze', jsonBodyParser, (req, res) => {
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
  .get('/all-mazes', (req, res) => {
    try {
        GridService.getAllMazes(req.app.get('db'))
        .then( mazes => {
          res
          .status(200)
          .json({mazes})
        })
    .catch( error => {console.error(error)})
    } catch (e) {
      console.log("here error")
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