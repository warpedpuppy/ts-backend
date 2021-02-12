const PostgresQLRouter = require("./postgresql-router")

const xss = require('xss')
const PostgresQLServices = {
    getAll: async db => {
        let result = await db.select('*').from('characters');
        console.log(result)
        return result;
    },
    insertOne: function (db, obj) {
        return db
        .insert(obj)
        .into('characters')
    }
}
module.exports = PostgresQLServices;