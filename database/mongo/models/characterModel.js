const mongoose = require('mongoose');

const CharacterModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
      type: String,
      required: true
    }
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Character', CharacterModel);