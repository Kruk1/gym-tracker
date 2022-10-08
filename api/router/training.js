const express = require('express')
const verifyToken = require('../controllers/verifyToken')
const Training = require('../models/training')
const router = express.Router()

const catchAsync = (fn) =>
{
    return function(req, res, next)
    {
        fn(req, res, next).catch(e => next(e))
    } 
}

router.use(verifyToken)

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
    await Training.create(createTrainingInfo)
    res.status(200).send('Training has been created!')
}))

router.get('/GetTraining', catchAsync(async (req, res) =>
{
    const training = await Training.find({createdBy: req.user.id}).sort({_id: -1})
    res.json(training)
}))

router.get('/GetTrainingDetails', catchAsync(async (req, res) =>
{
    const {id} = req.query
    const training = await Training.findById(id)
    res.json(training)
}))

router.patch('/UpdateTraining', catchAsync(async (req, res) =>
{
    const training = await Training.find({createdBy: req.user.id})
    res.status(200).send('Training has been updated!')
}))

router.delete('/DeleteTraining', catchAsync(async (req, res) =>
{
    const {id} = req.query
    await Training.findByIdAndDelete(id)
    res.send('Deleted')
}))

module.exports = router