const User = require('./models/User')
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("321", salt);
const user = {
    login: 'dawid2',
    password: hash,
    isAdmin: false
}

User.create(user)
.then(res => console.log(res))
.catch(e => console.log(e))