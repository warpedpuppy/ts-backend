const CharacterModel = require('../models/characterModel');
const xss = require('xss');

const MongoRestfulServices = { 
    getAll: async function (userid) {
        try {
            let query = `db.characters.find({userid:${userid}})`;
            let characters = await CharacterModel.find({userid});
            return {query, characters: characters.map(character => this.serialize(character))};
        } catch (e) {
            console.error(e)
        }
    },
    getComplete: async function () {
        try {
            return await CharacterModel.countDocuments();
        } catch (e) {
            console.error(e)
        }
    },
    create: async function (obj) {
        try {
            let query = `db.characters.insert(${obj})`;
            let character = await CharacterModel.create(obj);
            return {query, character: this.serialize(character)};
        } catch (e) {
            console.error(e)
        }
    },
    deleteAll: async function (userid) {
        try {
            let result = await CharacterModel.deleteMany({userid})
            return result ? true : false ;
        } catch (e) {
            console.error(e)
        }
    },
    empty: async function (userid) {
        try {
            let result = await CharacterModel.deleteMany()
            return result ? true : false ;
        } catch (e) {
            console.error(e)
        }
    },
    deleteOne: async function (id) {
        try {
            let query = `db.collection.deleteOne({_id:${id}})`;
            let character = await CharacterModel.deleteOne({_id: id})
            return {query, character: this.serialize(character)};
        } catch (e) {
            console.error(e)
        }
    },
    updateOne: async function (obj) {
        try {
            const { id, character_name, character_color } = obj;
            let query = `db.characters.updateOne({_id: ${id}}, {${character_name}, ${character_color}}, {useFindAndModify: false, new: true})`
            let character = await CharacterModel.findByIdAndUpdate({_id: id}, {character_name, character_color}, {useFindAndModify: false, new: true})
            return { query, character: this.serialize(character) };
          } catch (e) {
            console.error(e)
          }
    },
    serialize: function (obj) {
      return {
        id: obj.id,
        userid: obj.userid,
        character_name: xss(obj.character_name),
        character_color: xss(obj.character_color),
        createdAt: xss(obj.createdAt),
        updatedAt: xss(obj.updatedAt)
      }
    }
}

module.exports = MongoRestfulServices;