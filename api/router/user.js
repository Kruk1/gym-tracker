const express = require('express')
const verifyToken = require('../controllers/verifyToken')
const User = require('../models/User')
const router = express.Router()

const catchAsync = (fn) =>
{
    return function(req, res, next)
    {
        fn(req, res, next).catch(e => next(e))
    } 
}

router.get('/getUser', verifyToken ,catchAsync(async (req, res) => 
{
    res.json(req.user)
}))

module.exports = router