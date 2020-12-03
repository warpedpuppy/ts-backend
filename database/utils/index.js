const mongoose = require('mongoose');
const Config = require('../../config')
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

