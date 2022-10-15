const jwt = require('jsonwebtoken')
const MyError = require('../error/error')
const User = require('../models/User')
require('dotenv').config()

function verifyToken(req, res, next)
{
    const token = req.cookies.access_token
    if(!token) throw new MyError('You are not authenticated!', 401, true)

    jwt.verify(token, process.env.JWTTOKEN, async (err, user) =>
    {
        try
        {
            if(err) throw new MyError('Token is not valid! Try login again!', 403, true)
            const verifyUser = await User.findById(user.id)
            if(!verifyUser) throw new MyError("User isn't exists any more!", 400, true)
            req.user = user
            next()
        }
        catch(e)
        {
            next(e)
        }
    })
}

module.exports = verifyToken