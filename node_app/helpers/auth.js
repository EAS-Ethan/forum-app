const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = 'sUpErSeCrEtToKeN'

const generateSalt = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};

const generateHash = function (password, salt) {
    let hmac = crypto.createHmac('sha512', salt);
    hmac.update(password);
    return hmac.digest('hex');
};

module.exports = {
    generateSaltAndHash: (password) => {
        let salt = generateSalt(16);
        let hash = generateHash(password, salt)
        return {
            salt,
            hash
        }
    },
    checkHash: (password, salt, hash) => {
        return hash === generateHash(password, salt)
    },
    generateBearerToken: (user) => {
        return jwt.sign(user, ACCESS_TOKEN_SECRET);
    },
    validateBearerTokenMiddleware: (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)

        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            console.log(user)
            req.user = user
            next()
        })
    }
}
