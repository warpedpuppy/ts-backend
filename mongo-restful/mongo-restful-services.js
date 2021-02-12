const CharacterModel = require('../database/models/characterModel');
const xss = require('xss');

const MongoRestfulServices = { 
    getAll: async function (obj) {
        try {
            let characters = await CharacterModel.find();
            return characters.map(character => this.serialize(character));
        } catch (e) {
            console.error(e)
        }
    },
    create: async function (obj) {
        try {
            let result = await CharacterModel.create(obj);
            return result;
        } catch (e) {
            console.error(e)
        }
    },
    deleteAll: async function () {
        try {
            let result = await CharacterModel.remove({})
            return result ? true : false ;
        } catch (e) {
            console.error(e)
        }
    },
    deleteOne: async function (id) {
        try {
            let result = await CharacterModel.deleteOne({_id: id})
            let characters = result ? await CharacterModel.find() : [] ; 
            return characters.map(character => this.serialize(character));
        } catch (e) {
            console.error(e)
        }
    },
    updateOne: async function (obj) {
        try {
            const { _id, name, color } = obj;
            let result = await CharacterModel.findByIdAndUpdate({_id}, {name, color}, {new: true})
            let characters = result ? await CharacterModel.find() : [] ; 
            return characters.map(character => this.serialize(character));
          } catch (e) {
            console.error(e)
          }
    },
    serialize: function (obj) {
      return {
        _id: obj.id,
        name: xss(obj.name),
        color: xss(obj.color)
      }
    }
}

module.exports = MongoRestfulServices;