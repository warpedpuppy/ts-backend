module.exports = {
    DB_CONNECT: process.env.DB_CONNECT || '',
    PORT: process.env.PORT || '',
    LOCAL_MONGO_DB_URL: process.env.LOCAL_MONGO_DB_URL || '',
    MONGO_REMOTE: process.env.MONGO_REMOTE || '',
    ENVOLOPE: process.env.ENVOLOPE || 'local',
    NODE_ENV: process.env.NODE_ENV || 'development',
    JWT_SECRET: process.env.JWT_SECRET || '',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
    LOGIN_FORM_SHOW: process.env.LOGIN_FORM_SHOW || '',
    DB_URL: process.env.DB_URL || '',
    DATABASE_URL: process.env.DATABASE_URL || '',
    DATABASE_URL_LOCAL: process.env.DATABASE_URL_LOCAL || '',
    S3_BUCKET: process.env.S3_BUCKET || '',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || '',
    REGION: process.env.REGION || "us-east-1"
}