const jwt = require('jsonwebtoken')
const {jwttoken} = require('../config.json')
const MyError = require('../error/error')

function verifyToken(req, res, next)
{
    const token = req.cookies.access_token
    if(!token) throw new MyError('You are not authenticated!', 401, true)

    jwt.verify(token, jwttoken, (err, user) =>
    {
        if(err) throw new MyError('Token is not valid! Try login again!', 403, true)
        req.user = user
        next()
    })
}

module.exports = verifyToken