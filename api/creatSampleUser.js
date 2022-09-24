const User = require('./models/User')
const mongoose = require('mongoose');

const user = {
    login: 'kruk',
    password: '123',
    isAdmin: true
}

User.create(user)
.then(res => console.log(res))
.catch(e => console.log(e))