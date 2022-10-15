const User = require('./models/User')
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("321", salt);
const user = {
    login: 'dawid',
    password: hash,
    isAdmin: true
}

User.create(user)
.then(res => console.log(res))
.catch(e => console.log(e))