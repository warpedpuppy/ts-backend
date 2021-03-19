const express = require('express');
const AdminRouter = express.Router();
const jwt = require('jsonwebtoken');


AdminRouter
.post('/keypad', (req, res) => {
    const { code } = req.body;
    const { KEYPAD } = process.env;
    if (code === KEYPAD) {
        res.status(200).json({success: true})
    } else{
        res.status(200).json({success: false})
    }
})
.post('/login', async (req, res) => {
    const { code } = req.body;
    const { ADMIN, JWT_SECRET } = process.env;
    if (code === ADMIN) {
        var token = await jwt.sign({ admin: 'true' }, JWT_SECRET, { algorithm: 'HS256'});
        res.status(200).json({success: true, token})
    } else{
        res.status(200).json({success: false, token: null})
    }
})
.post('/check-token', (req, res) => {
    const { token } = req.body;
    const { JWT_SECRET } = process.env;
    
    jwt.verify(token, JWT_SECRET, {algorithm: 'HS256'}, function (error) {
         if (!error) {
            res.status(200).json({success: true})
        } else {
            res.status(200).json({success: false})
        }
    })

})
module.exports = AdminRouter;