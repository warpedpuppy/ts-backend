const PostgresQLRouter = require("./postgresql-router")
const xss = require('xss')
const PostgresQLServices = {
    getAll: async db => {
        try {
            let characters = await db.select('*').from('characters');
            return characters.map( character => serialize(character) )
        } catch (e) {
            return "error"
        }
    },
    insertOne: async (db, obj) => {
        try {
            let result = await db.insert(obj).into('characters');
            let characters = result ? await db.select('*').from('characters') : [] ;
            return characters.map( character => serialize(character) )
        } catch (e) {
            console.error(e)
        }
    },
    deleteOne: async (db, id) => {
        let int = parseInt(id, 10)
        let result = await db.raw(`DELETE FROM characters WHERE id=${int}`);
        let characters = result ? await db.select('*').from('characters') : [] ;
        return characters;
    },
    updateOne: async (db, obj) => {
        const { id, character_name, character_color } = obj;
        let result = await db.raw(`UPDATE characters SET character_name='${character_name}', character_color='${character_color}' WHERE id=${id}`)
        let characters = result ? await db.select('*').from('characters') : [] ;
        return characters;
    },
    deleteAll: async db => {
        let result = await db.truncate('characters');
        let characters = result ? await db.select('*').from('characters') : [] ;
        return characters;
    }
}
function serialize(obj) {
    return {
        id: obj.id,
        character_name: xss(obj.character_name),
        character_color: xss(obj.character_color)
    }
}
module.exports = PostgresQLServices;