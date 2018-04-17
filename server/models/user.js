const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  'userId': String,
  'userPwd': String,
  'userTodoList': [{
    'todoTime': String,
    'todoState': String,
    'todoDetail': String
  }]
})

module.exports = mongoose.model('User', userSchema)
