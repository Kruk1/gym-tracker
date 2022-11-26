const Training = require('../models/Training')

async function deleteTraining(req, res, next)
{
    if(req.user.isAdmin) return next()
    const trainings = await Training.find({ createdBy: req.user.id})
    for(let training of trainings)
    {
        await Training.findByIdAndDelete(training._id)
    }
    next()
}

module.exports = deleteTraining