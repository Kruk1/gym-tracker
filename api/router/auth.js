const express = require('express')
const MyError = require('../error/error')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const catchAsync = (fn) =>
{
    return function(req, res, next)
    {
        fn(req, res, next).catch(e => next(e))
    } 
}

router.post('/login', catchAsync(async (req, res) => 
{
    if(!req.body.login) throw new MyError('Username is required!', 400, true)
    if(!req.body.password) throw new MyError('Password is required!', 400, true)

    const user = await User.findOne({login: req.body.login})
    if(!user) throw new MyError('User not found!', 404, true)

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if(!isPasswordCorrect) throw new MyError('Password Incorrect', 400, true)

    const token = jwt.sign({id: user._id, isAdmin: user.isAdmin, login: user.login}, process.env.JWTTOKEN)

    const {password, isAdmin, ...otherParameters} = user._doc

    console.log(token)

    res.cookie('access_token', token, { httpOnly: true }).status(200).send('Success')
}))

module.exports = router