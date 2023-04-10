var jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const JWT_SECRET = keys.JWT.secret;

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('authtoken');
    if (!token) {
        res.status(401).send({ error: "Token not found" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data;
        next();
    } catch (error) {
        res.status(401).send({ error: "Invalid token" })
    }
}


module.exports = fetchuser;