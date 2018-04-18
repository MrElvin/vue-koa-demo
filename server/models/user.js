const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  'userId': String,
  'userPwd': String
})

module.exports = mongoose.model('User', userSchema)
