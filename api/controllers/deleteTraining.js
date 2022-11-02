const Training = require('../models/Training')

async function deleteTraining()
{
    const trainings = await Training.find({ }).populate('createdBy')
    for(let training of trainings)
    {
        if(!training.createdBy.isAdmin)
        {
            await Training.findByIdAndDelete(training._id)
        }
    }
}

module.exports = deleteTraining