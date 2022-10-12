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

const userSchema = mongoose.Schema({
    login: 
    {
        type: String, 
        required: true,
        unique: true
    },
    password: 
    {
        type: String,
        required: true
    },
    isAdmin:
    {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('Users', userSchema)

module.exports = User