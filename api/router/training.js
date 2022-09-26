const express = require('express')
const Training = require('../models/training')
const User = require('../models/User')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {jwttoken} = require('../config.json')
const MyError = require('../error/error')

const catchAsync = (fn) =>
{
    return function(req, res, next)
    {
        fn(req, res, next).catch(e => next(e))
    } 
}

router.use((req, res, next) =>
{
    const token = req.cookies.access_token
    if(!token) throw new MyError('You are not authenticated!', 401, true)

    jwt.verify(token, jwttoken, (err, user) =>
    {
        if(err) throw new MyError('Token is not valid!', 403, true)
        req.user = user
        next()
    })
})

router.post('/CreateTraining', catchAsync(async (req, res) =>
{
    let daysPrepare = []
    for(let i = 1; i <= req.body.days; i++)
    {
        daysPrepare.push(
            {
                day: `${i}`,
                exercises: []
            })

    }
    let createTrainingInfo = req.body
    createTrainingInfo.createdBy = req.user.id
    createTrainingInfo.days = daysPrepare
    console.log(createTrainingInfo)
    await Training.create(createTrainingInfo)
    res.status(200).send('Training has been created!')
}))

router.get('/GetTraining', catchAsync(async (req, res) =>
{
    const training = await Training.find({createdBy: req.user.id})
    res.json(training)
}))

router.patch('/UpdateTraining', catchAsync(async (req, res) =>
{
    const training = await Training.find({createdBy: req.user.id})
    res.status(200).send('Training has been updated!')
}))

module.exports = router