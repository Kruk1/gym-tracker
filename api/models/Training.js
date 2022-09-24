const mongoose = require('mongoose');
const {mongo} = require('../config.json')

mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const trainingSchema = mongoose.Schema({
    name: 
    {
        type: String,
        required: true
    },
    days: 
    [
        {
            day: String,
            exercises:
            [
                {
                    name: String,
                    results: [Number]
                }
            ]
        }
    ],
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
    lastUpdate: 
    {
        type: Date,
        default: new Date()
    }
})

const Training = mongoose.model('TrainingPlans', trainingSchema)

module.exports = Training