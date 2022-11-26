const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const cors = require('cors')
const training = require('./router/training')
const auth = require('./router/auth')
const user = require('./router/user')
const PORT = process.env.PORT || 5000
const path = require('path')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
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
    console.log('Server started on port 5000 ')
  })