const mongoose = require('mongoose');

const CharacterModel = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  character_name: {
    type: String,
    required: true
  },
  character_color: {
      type: String,
      required: true
    }
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Character', CharacterModel);