const PostgresQLRouter = require("./postgresql-router")
const xss = require('xss')
const PostgresQLServices = {
    getAll: async (db, userid) => {
        try {
            let query = `SELECT * FROM characters WHERE userid='${userid}'`;
            let characters = await db.raw(query);
            return { characters: characters.rows.map( character => serialize(character) ), query }
        } catch (e) {
            return "error"
        }
    },
    getTotal: async (db, userid) => {
        try {
            let query = `SELECT COUNT(*) FROM characters`;
            return await db.raw(query);
        } catch (e) {
            return "error"
        }
    },
    insertOne: async (db, obj) => {
        try {
            let query = `INSERT INTO characters (userid, character_name, character_color) values ('${obj.userid}', '${obj.character_name}', '${obj.character_color}') RETURNING *`;
            let character = await db.raw(query);
            return { character: serialize(character.rows[0]), query }
        } catch (e) {
            console.error(e)
        }
    },
    deleteOne: async (db, id) => {
        let int = parseInt(id, 10);
        let query = `DELETE FROM characters WHERE id=${int}`;
        let result = await db.raw(query);
        return { query, character: result };
    },
    updateOne: async (db, obj) => {
        const { id, character_name, character_color } = obj;
        let query = `UPDATE characters SET character_name='${character_name}', character_color='${character_color}' WHERE id='${id}'`;
        let response = await db.raw(query);
        let character = response.rowCount === 1 ? serialize(obj) : {};
        return { character, query, response }
    },
    deleteAll: async (db, userid)=> {
        let query = `DELETE FROM characters WHERE userid='${userid}'`;
        let result = await db.raw(query);
        let characters = result ? await db.select('*').from('characters') : [] ;
        return characters;
    },
    empty: async (db, userid)=> {
        let query = `TRUNCATE characters`;
        return await db.raw(query);
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