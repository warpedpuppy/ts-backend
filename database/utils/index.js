const mongoose = require('mongoose');
const Config = require('../../config');
const CharacterModel = require('../models/characterModel');
const uuid = require('uuid');

module.exports.connection = async () => {
  try {
    mongoose.set('debug', true);
    await mongoose.connect(Config.MONGO_REMOTE, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('mongo remote database connected Successfully');
  } catch (error) {
    console.log('mongo remote database could not connect.');
    console.error(error);
    //throw error;
  }
}

async function addStarterData() {
  try {
    const testStarter = "starter";
    let result = CharacterModel.find({name: testStarter});
    if (!result) {
      CharacterModel.create({name: testStarter, color: "#990000", id: uuid.v4()})
    }
  } catch (e) {
    console.error(e);
  }
}