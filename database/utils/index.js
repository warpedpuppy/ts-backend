const mongoose = require('mongoose');
const Config = require('../../config');
const CharacterModel = require('../models/characterModel');
const uuid = require('uuid');

module.exports.connection = async () => {
  try {
    mongoose.set('debug', true);
    await mongoose.connect(Config.LOCAL_MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database Connected Successfully');
  } catch (error) {
    console.log(error);
    throw error;
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