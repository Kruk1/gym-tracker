const jwt = require('jsonwebtoken')
const MyError = require('../error/error')
require('dotenv').config()

function verifyToken(req, res, next)
{
    const token = req.cookies.access_token
    if(!token) throw new MyError('You are not authenticated!', 401, true)

    jwt.verify(token, process.env.JWTTOKEN, (err, user) =>
    {
        if(err) throw new MyError('Token is not valid! Try login again!', 403, true)
        req.user = user
        next()
    })
}

module.exports = verifyToken