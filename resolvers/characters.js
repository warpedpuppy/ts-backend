const CharacterModel = require('../database/models/characterModel');
const uuid = require('uuid');
module.exports = {
    Query: {
      greetings: () => "hello",
      characters: () => CharacterModel.find({})
    },
    Mutation: {
      createCharacter: async (_, args) => {
        try {
          const character = { name: args.input.name, color: args.input.color, id: uuid.v4()}
          let result = await CharacterModel.create(character)
          return result;
        } catch (e) {
          console.error(e)
        }
      },
      deleteCharacter: async (_, args) => {
        try {
          const { id } = args.input;
          let result = await CharacterModel.deleteOne({_id: id})
          let result2 = result ? await CharacterModel.find({}) : [] ; 
          return result2;
        } catch (e) {
          console.error(e)
        }
      },
      updateCharacter: async (_, args) => {
        try {
          const {id, name } = args.input;
          console.log(name)
          let result = await CharacterModel.findByIdAndUpdate({_id: id}, {name}, {new: true})
          return result
        } catch (e) {
          console.error(e)
        }
      },
      deleteAllCharacters: async (_, args) => {
        try {
          let result = await CharacterModel.remove({})
          return result ? true : false ;
        } catch (e) {
          console.error(e)
        }
      }
    } 
  }