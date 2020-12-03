const CharacterModel = require('../database/models/characterModel');
const uuid = require('uuid');
module.exports = {
    Query: {
      greetings: () => "hello",
      characters: () => CharacterModel.find()
    },
    Mutation: {
      createCharacter: async (_, args) => {
        try {
          const character = { name: args.input.name, color: args.input.color, id: uuid.v4()}
          //characters.push(character);
          let result = await CharacterModel.create(character)
          return result;
        } catch (e) {
          console.error(e)
        }
       
      }
    } 
  }