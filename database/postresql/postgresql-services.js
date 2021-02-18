const PostgresQLRouter = require("./postgresql-router")
const xss = require('xss')
const PostgresQLServices = {
    getAll: async (db, userid) => {
        try {
            let characters = await db.raw(`SELECT * FROM characters WHERE userid='${userid}'`);
            return characters.rows.map( character => serialize(character) )
        } catch (e) {
            return "error"
        }
    },
    insertOne: async (db, obj) => {
        try {
            let character = await db.insert(obj).into('characters').returning('*');
            return serialize(character[0]);
        } catch (e) {
            console.error(e)
        }
    },
    deleteOne: async (db, id) => {
        let int = parseInt(id, 10)
        let character = await db.raw(`DELETE FROM characters WHERE id=${int}`);
        return serialize(character);
    },
    updateOne: async (db, obj) => {
        const { id, character_name, character_color } = obj;
        let character = await db.raw(`UPDATE characters SET character_name='${character_name}', character_color='${character_color}' WHERE id=${id}`)
        return serialize(character);
    },
    deleteAll: async (db, userid)=> {
        let result = await db.raw(`DELETE FROM characters WHERE userid='${userid}'`);
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