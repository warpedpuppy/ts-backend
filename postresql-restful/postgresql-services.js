const PostgresQLRouter = require("./postgresql-router")

const xss = require('xss')
const PostgresQLServices = {
    getAll: async db => {
        try {
            let result = await db.select('*').from('characters');
            console.log(result)
            return result;
        } catch (e) {
            return "error"
        }
       
    },
    insertOne: function (db, obj) {
        try {
            return db
            .insert(obj)
            .into('characters')
        } catch (e) {
            console.error(e)
        }
      
    }
}
module.exports = PostgresQLServices;