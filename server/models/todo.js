const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  'todoTime': String,
  'todoState': String,
  'todoDetail': String,
  'userId': String
})

module.exports = mongoose.model('Todo', todoSchema)
