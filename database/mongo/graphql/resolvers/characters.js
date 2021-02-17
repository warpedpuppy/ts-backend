const CharacterModel = require('../../models/characterModel');
const uuid = require('uuid');
const xss = require('xss');

function  serialize(obj) {
  return {
    id: obj._id,
    name: xss(obj.name),
    color: xss(obj.color)
  }
}

module.exports = {
    Query: {
      greetings: () => "hello",
      characters: async (_, args) => {
        return await CharacterModel.find({userid: args.input.userid})}
    },
    Mutation: {
      createCharacter: async (_, args) => {
        try {
          const character = { userid: args.input.userid, name: args.input.name, color: args.input.color, id: uuid.v4()}
          let result = await CharacterModel.create(character)
          return serialize(result);
        } catch (e) {
          console.error(e)
        }
      },
      deleteCharacter: async (_, args) => {
        try {
          const { id } = args.input;
          let result = await CharacterModel.deleteOne({_id: id})
          return serialize(result);
        } catch (e) {
          console.error(e)
        }
      },
      updateCharacter: async (_, args) => {
        try {
          const { id, name, color } = args.input;
          let result = await CharacterModel.findByIdAndUpdate({_id: id}, {name, color}, {new: true})
          return serialize(result);
        } catch (e) {
          console.error(e)
        }
      },
      deleteAllCharacters: async (_, args) => {
        try {
          let result = await CharacterModel.remove({userid: args.input.userid})
          return result ? true : false ;
        } catch (e) {
          console.error(e)
        }
      }
    } 
  }