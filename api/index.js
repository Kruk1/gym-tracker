const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const sessionOptions = {secret: '1234567890', resave: false, saveUninitialized: true}
const cors = require('cors')
const training = require('./router/training')
const auth = require('./router/auth')
const user = require('./router/user')
const PORT = process.env.PORT || 5000
const path = require('path')
const dateNow = new Date().getTime()
const nextDayInMilliseconds = 86400000
const herokuAwake = require("heroku-awake")
const deleteTraining = require('./controllers/deleteTraining')

function getNextMidnightTime() {
  let midnight = new Date()
  midnight.setHours(24);
  midnight.setMinutes(0);
  midnight.setSeconds(0);
  midnight.setMilliseconds(0);

  return midnight.getTime()
}


app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(session(sessionOptions))
app.use(flash())

app.use('/training', training)
app.use('/auth', auth)
app.use('/user', user)

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.use((err, req, res, next) =>
{
    if(!err.status) err.status = 500
    console.log(err)
    res.status(err.status).json(err)
})

app.listen(PORT, () => 
  {
    setTimeout(() => 
    {
      deleteTraining()
      setInterval(deleteTraining, nextDayInMilliseconds)
    }, getNextMidnightTime() - dateNow)
    herokuAwake('https://gym-tracker-exercise.herokuapp.com')
    console.log('Server started on port 5000 ')
  })