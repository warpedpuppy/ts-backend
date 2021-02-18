const CharacterModel = require('../models/characterModel');
const xss = require('xss');

const MongoRestfulServices = { 
    getAll: async function (userid) {
        try {
            let characters = await CharacterModel.find({userid});
            return characters.map(character => this.serialize(character));
        } catch (e) {
            console.error(e)
        }
    },
    create: async function (obj) {
        try {
            let character = await CharacterModel.create(obj);
            return this.serialize(character);
        } catch (e) {
            console.error(e)
        }
    },
    deleteAll: async function (userid) {
        try {
            let result = await CharacterModel.remove({userid})
            return result ? true : false ;
        } catch (e) {
            console.error(e)
        }
    },
    deleteOne: async function (id) {
        try {
            let character = await CharacterModel.deleteOne({_id: id})
            return this.serialize(character);
        } catch (e) {
            console.error(e)
        }
    },
    updateOne: async function (obj) {
        try {
            const { id, character_name, character_color } = obj;
            let character = await CharacterModel.findByIdAndUpdate({_id: id}, {character_name, character_color}, {new: true})
            return this.serialize(character);
          } catch (e) {
            console.error(e)
          }
    },
    serialize: function (obj) {
      return {
        id: obj.id,
        character_name: xss(obj.character_name),
        character_color: xss(obj.character_color),
        createdAt: xss(obj.createdAt),
        updatedAt: xss(obj.updatedAt)
      }
    }
}

module.exports = MongoRestfulServices;