const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kruk:matejki88@atlascluster.ndp6p.mongodb.net/gym-tracker?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
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
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    lastUpdate: 
    {
        type: Date,
        default: new Date()
    }
})

const Training = mongoose.model('TrainingPlans', trainingSchema)

module.exports = Training