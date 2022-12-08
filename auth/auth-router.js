const express = require('express');
const AuthService = require('./auth-service');
const bcrypt = require('bcryptjs');
const authRouter = express.Router();
const jsonBodyParser = express.json();
const Config = require('../src/config');

authRouter
    .post('/show-login-form', jsonBodyParser, (req, res, next) => {
        if (req.body.code === Config.LOGIN_FORM_SHOW) {
            res
            .status(200)
            .json({success: true})
        } else {
            res
            .status(200)
            .json({success: false})
        }
    })
    .post('/login', jsonBodyParser, (req, res, next) => {

    const { password } = req.body;
  
    if (password === process.env.ADMIN_PASSWORD) {
        res.json({
            authToken: AuthService.createJwt("SVhsdvNASBVDN", {teashdgkJAHGDSst: 2347283742})
        })
    } else {
        res.json({success: false})
    }
 
    })

module.exports = authRouter