const User = require('./models/User')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("123", salt);
const user = {
    login: 'kruk',
    password: hash,
    isAdmin: true
}

User.create(user)
.then(res => console.log(res))
.catch(e => console.log(e))