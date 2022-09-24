const express = require('express')
const Training = require('../models/training')
const User = require('../models/User')
const router = express.Router()

const catchAsync = (fn) =>
{
    return function(req, res, next)
    {
        fn(req, res, next).catch(e => next(e))
    } 
}

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
    const user = await User.findOne({}).select('_id')
    console.log(user)
    createTrainingInfo.createdBy = user
    createTrainingInfo.days = daysPrepare
    console.log(createTrainingInfo)
    await Training.create(createTrainingInfo)
    res.status(200).send('Training has been created!')
}))

module.exports = router