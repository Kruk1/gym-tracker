const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
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
                            required: [true, 'Exercise name is required']
                        },
                        results: [Number],
                        length: [String],
                        units: 
                        {
                            type: String,
                            enum : ['kg','lbs'],
                            default: 'kg'
                        }
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
}, { timestamps: true })

const Training = mongoose.model('TrainingPlans', trainingSchema)

module.exports = Training