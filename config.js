module.exports = {
    DB_CONNECT: process.env.DB_CONNECT || '',
    PORT: process.env.PORT || '',
    LOCAL_MONGO_DB_URL: process.env.LOCAL_MONGO_DB_URL || '',
    MONGO_REMOTE: process.env.MONGO_REMOTE || '',
}
psql -U lgftiuyqelvvhc -h ec2-54-221-214-3.compute-1.amazonaws.com -p 5432 d8cokdd3lbustv