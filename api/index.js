const express = require('express')
const app = express()
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const training = require('./router/training')
const auth = require('./router/auth')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(cookieParser())

app.use('/training', training)
app.use('/auth', auth)

app.use((err, req, res, next) =>
{
    res.status(err.status).json(err)
})

app.listen(5000, () => console.log('Server started on port 5000 '))
