const express = require('express')
const app = express()
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const sessionOptions = {secret: '1234567890', resave: false, saveUninitialized: true}
const cors = require('cors')
const training = require('./router/training')
const auth = require('./router/auth')
const user = require('./router/user')
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(session(sessionOptions))
app.use(flash())

app.use('/training', training)
app.use('/auth', auth)
app.use('/user', user)

app.use((err, req, res, next) =>
{
    if(!err.status) err.status = 500
    console.log(err)
    res.status(err.status).json(err)
})

app.listen(PORT, () => console.log('Server started on port 5000 '))
