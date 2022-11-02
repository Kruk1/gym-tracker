const express = require('express')
const verifyToken = require('../controllers/verifyToken')
const Training = require('../models/Training')
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
    const training = await Training.findByIdAndUpdate(req.body.id, {name: req.body.name, description: req.body.description}, {new: true})
    const numberOfDays = training.days.length - req.body.days
    if(numberOfDays > 0)
    {
        for(let i = 1; i <= Math.abs(numberOfDays); i++)
        {
            training.days.pop()
        }
    }
    else if(numberOfDays < 0)
    {
        for(let i = 1; i <= Math.abs(numberOfDays); i++)
        {
            training.days.push(            {
                day: `${i}`,
                exercises: []
            })
        }
    }
    await training.save()
    res.status(200).send('Training has been updated!')
}))

router.delete('/DeleteTraining', catchAsync(async (req, res) =>
{
    const {id} = req.query
    await Training.findByIdAndDelete(id)
    res.send('Deleted')
}))

router.post('/CreateExercise', catchAsync(async (req, res) =>
{
    const training = await Training.findById(req.body.trainingId)
    const day = training.days.find(day => day._id == req.body.idDay)
    const length = req.body.results ? [''] : []
    const results = req.body.results ? [req.body.results] : []
    day.exercises.push(
        {
            name: req.body.name,
            results: results,
            length: length,
            units: req.body.units
        }
    )
    await training.save()
    res.send('Created!')
}))

router.patch('/UpdateResults', catchAsync(async (req, res) =>
{
    const training = await Training.findById(req.body.idTraining)
    const day = training.days.find(day => day._id == req.body.idDay)
    const exercise = day.exercises.find(exercise => exercise._id == req.body.idExercise)
    exercise.results.push(req.body.number)
    exercise.length.push('')
    await training.save()
    res.send('Created!')
}))

router.delete('/DeleteExercise', catchAsync(async (req, res) =>
{
    const training = await Training.findById(req.body.idTraining)
    const day = training.days.find(day => day._id == req.body.idDay)
    const exercise = day.exercises.find(exercise => exercise._id == req.body.idExercise)
    const newExercises = day.exercises.filter(prevExercise => prevExercise._id != exercise._id)
    day.exercises = newExercises
    await training.save()
    res.send('Deleted!')
}))

module.exports = router