const express = require('express')
const app = express()
const methodOverride = require('method-override')
const training = require('./router/training')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use('/training', training)

app.listen(5000, () => console.log('Server started on port 5000 '))
