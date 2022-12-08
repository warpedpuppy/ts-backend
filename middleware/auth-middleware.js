const AuthService = require("../auth/auth-service")

function requireAuth(req, res, next) {
    console.log("MIDDLE WARE")
    const authToken = req.get('Authorization') || '';
    const bearerToken = authToken.slice(7, authToken.length)
    console.log('bearerToken = ', bearerToken)

    if (bearerToken === 'undefined') {
        res.json({jwt: "none"});
    } else {
        let tokenData = AuthService.verifyJwt(bearerToken);
        console.log(tokenData)
        req.tokenData = tokenData;
        next();
    }
    
}

module.exports = { requireAuth }