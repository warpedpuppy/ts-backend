const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

const AuthService = {
    createJwt(subject, payload) {
        return jwt.sign(payload, config.JWT_SECRET, {
          subject,
          algorithm: 'HS256',
        })
    },
    comparePasswords(password, hash) {
      return bcrypt.compare(password, hash)
    },
    parseBasicToken(token) {
        return Buffer
          .from(token, 'base64')
          .toString()
    },
    verifyJwt(token) {
        return jwt.verify(token, config.JWT_SECRET, {
          algorithms: ['HS256'],
        })
      },
    getAdminData(db) {
        return db('admin_data')
          .where({ user_name: "admin" })
          .first()
      },
}

module.exports = AuthService;