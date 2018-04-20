const router = require('koa-router')()
const Todo = require('../models/todo')
const mongoose = require('mongoose')

const add = async (ctx, next) => {
  const { todoDetail, todoTime } = ctx.request.body
  const userId = ctx.session.userName
  const todoDoc = await Todo.create({
    userId,
    todoTime,
    todoDetail,
    todoState: 'todo'
  })
  const result = await todoDoc.save()
  if (result) {
    ctx.body = { success: true, msg: '添加日程成功' }
  } else {
    ctx.body = { success: false, msg: '添加日程失败' }
  }
}
const get = async (ctx, next) => {
  const page = ctx.request.URL.searchParams.get('page')
  const todoState = ctx.request.URL.searchParams.get('filter')
  const userId = ctx.session.userName
  let todoDoc = ''
  let todoTotal = 0
  if (todoState === 'all') {
    todoDoc = await Todo.find({ userId }).sort({ 'todoTime': -1 }).limit(8).skip(8 * (page - 1))
    todoTotal = await Todo.find({ userId })
  } else {
    todoDoc = await Todo.find({ userId, todoState: todoState }).sort({ 'todoTime': -1 }).limit(8).skip(8 * (page - 1))
    todoTotal = await Todo.find({ userId, todoState: todoState })
  }
  if (todoDoc.length) {
    ctx.body = { success: true, todoList: todoDoc, todoTotal: todoTotal.length }
  } else {
    ctx.body = { success: true, todoList: [], todoTotal: 0 }
  }
}
const toggledone = async (ctx, next) => {
  try {
    if (ctx.request.body.todoState === 'todo') {
      await Todo.update({ '_id': mongoose.Types.ObjectId(ctx.params['todoId']) }, { $set: { 'todoState': 'done' } })
    } else {
      await Todo.update({ '_id': mongoose.Types.ObjectId(ctx.params['todoId']) }, { $set: { 'todoState': 'todo' } })
    }
    const todoDoc = await Todo.find({ 'userId': ctx.session.userName })
    ctx.body = { success: true, todoList: todoDoc }
  } catch (err) {
    console.log(err)
    ctx.body = { success: false, todoList: [] }
  }
}
const detail = async (ctx, next) => {
  try {
    const todoDoc = await Todo.findOne({ '_id': mongoose.Types.ObjectId(ctx.params['todoId']) })
    ctx.body = { success: true, todo: todoDoc }
  } catch (err) {
    console.log(err)
    ctx.body = { success: false, todo: null }
  }
}
const updateDetail = async (ctx, next) => {
  const { _id, todoDetail } = ctx.request.body
  try {
    await Todo.update({ '_id': mongoose.Types.ObjectId(_id) }, { $set: { 'todoDetail': todoDetail } })
    const todoDoc = await Todo.find({ 'userId': ctx.session.userName })
    ctx.body = { success: true, todoList: todoDoc }
  } catch (err) {
    console.log(err)
    ctx.body = { success: false, todoList: [] }
  }
}

router.post('/add', add)
router.get('/get', get)
router.post('/update', updateDetail)
router.post('/done/:todoId', toggledone)
router.get('/detail/:todoId', detail)

module.exports = router
