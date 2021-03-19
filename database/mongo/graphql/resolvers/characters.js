const CharacterModel = require('../../models/characterModel');
const uuid = require('uuid');
const xss = require('xss');

function  serialize(obj) {
  return {
    id: obj._id,
    character_name: xss(obj.character_name),
    character_color: xss(obj.character_color),
    createdAt: xss(obj.createdAt),
    updatedAt: xss(obj.updatedAt),
  }
}

module.exports = {
    Query: {
      greetings: () => "hello",
      characters: async (_, args) => {
        let result = await CharacterModel.find( {userid: args.input.userid} );
        return result;
      }
    },
    Mutation: {
      createCharacter: async (_, args) => {
        try {
          const character = { userid: args.input.userid, character_name: args.input.character_name, character_color: args.input.character_color, id: uuid.v4()}
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
          return result.deletedCount > 0 ? true : false;
        } catch (e) {
          console.error(e)
        }
      },
      updateCharacter: async (_, args) => {
        try {
          const { id, character_name, character_color } = args.input;
          let result = await CharacterModel.findByIdAndUpdate({_id: id}, {character_name, character_color}, {useFindAndModify: false, new: true})
          return serialize(result);
        } catch (e) {
          console.error(e)
        }
      },
      deleteAllCharacters: async (_, args) => {
        try {
          let result = await CharacterModel.deleteMany({userid: args.input.userid})
          return result ? true : false ;
        } catch (e) {
          console.error(e)
        }
      }
    } 
  }