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
        required: [true, 'Name is required']
    },
    description: String,
    days: 
    {
        type:[
            {
                day: String,
                exercises:
                [
                    {
                        name:
                        {
                            type: String,
                            required: [true, 'Name exercise is required']
                        },
                        results: [Number],
                        length: [String]
                    }
                ]
            }
        ],
        validate:
        {
            validator: function(arr)
            {
                return arr.length > 0
            },
            message: () => 'Days is required'
        }
    },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true}
})

const Training = mongoose.model('TrainingPlans', trainingSchema)

module.exports = Training