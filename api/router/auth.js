const express = require('express')
const MyError = require('../error/error')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {jwttoken} = require('../config.json')

const catchAsync = (fn) =>
{
    return function(req, res, next)
    {
        fn(req, res, next).catch(e => next(e))
    } 
}

router.post('/login', catchAsync(async (req, res) => 
{
    const user = await User.findOne({login: req.body.login})
    if(!user) throw new MyError('User not found!', 404, true)

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if(!isPasswordCorrect) throw new MyError('Password Incorrect', 400, true)

    const token = jwt.sign({id: user._id, isAdmin: user.isAdmin, login: user.login}, jwttoken)

    const {password, isAdmin, ...otherParameters} = user._doc

    res.cookie('access_token', token, { httpOnly: true }).status(200).send('Success')
}))

module.exports = router