module.exports = {
    DB_CONNECT: process.env.DB_CONNECT || '',
    PORT: process.env.PORT || '',
	LOCAL_PORT: 3000, 
	API_ROOT: '/.netlify/functions/server',
    LOCAL_MONGO_DB_URL: process.env.LOCAL_MONGO_DB_URL || '',
    MONGO_REMOTE: process.env.MONGO_REMOTE || '',
    ENVOLOPE: process.env.ENVOLOPE || 'local',
}