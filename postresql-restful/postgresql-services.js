const PostgresQLRouter = require("./postgresql-router")

const xss = require('xss')
const PostgresQLServices = {
    getAll: function (db) {
        return db
        .select('*')
        .from('characters')
        },
    insertOne: function (db, obj) {
        return db.raw(`INSERT INTO characters (character_name, character_color) VALUES ('ethel', 'red');`);
        // .insert(obj)
        // .into('characters')
    }
}
module.exports = PostgresQLServices;