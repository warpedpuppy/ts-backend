const ExpressBrute = require("express-brute");
const BruteKnex = require('brute-knex');
const MemcachedStore = require('express-brute-memcached');
const MongooseStore = require("express-brute-mongoose");
const mongoose = require("mongoose");
const moment = require('moment');
let store;
const BruteForceSchema = mongoose.Schema({
    "_id": String,
    "data": {
      "count": Number,
      "lastRequest": Date,
      "firstRequest": Date
    },
    "expires": Date
  });

const model = mongoose.model(
    "bruteforce",
    new mongoose.Schema(BruteForceSchema)
);

const storeKnex = new BruteKnex({ createTable: true });
const storeMongoose = new MongooseStore(model);

if (process.env.ENVELOPE == 'local'){
    store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
} else {
    // stores state with memcached
    store = new MemcachedStore(['127.0.0.1'], {
        prefix: 'NoConflicts'
    });
}

var failCallback = function (req, res, next, nextValidRequestDate) {
    req.flash('error', "You've made too many failed attempts in a short period of time, please try again "+moment(nextValidRequestDate).fromNow());
    res.redirect('/login'); // brute force protection triggered, send them back to the login page
};
var handleStoreError = function (error) {
    log.error(error); // log this error so we can figure out what went wrong
    // cause node to exit, hopefully restarting the process fixes the problem
    throw {
        message: error.message,
        parent: error.parent
    };
}

module.exports = (type) => {
    let bruteforce, 
        store = type === 'mongo' ? storeMongoose : storeKnex


    bruteforce = new ExpressBrute(store, {
        freeRetries: 1000,
        attachResetToRequest: false,
        refreshTimeoutOnRequest: false,
        minWait: 25*60*60*1000, // 1 day 1 hour (should never reach this wait time)
        maxWait: 25*60*60*1000, // 1 day 1 hour (should never reach this wait time)
        lifetime: 24*60*60, // 1 day (seconds not milliseconds)
        failCallback: failCallback,
        handleStoreError: handleStoreError
    });
    return bruteforce.prevent;

}