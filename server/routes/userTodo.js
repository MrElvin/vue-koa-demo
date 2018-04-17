const router = require('koa-router')()
const User = require('../models/user')
const mongoose = require('mongoose')

const add = async (ctx, next) => {
  const { todoDetail, todoTime } = ctx.request.body
  const userId = ctx.session.userName
  const userDoc = await User.findOne({ userId })
  if (userDoc) {
    userDoc.userTodoList.push({
      todoTime,
      todoState: 'todo',
      todoDetail
    })
    const savedTodo = await userDoc.save()
    if (savedTodo) {
      ctx.body = { success: true, msg: '添加日程成功' }
    } else {
      ctx.body = { success: false, msg: '添加日程失败' }
    }
  } else {
    ctx.body = { success: false, msg: '用户不存在' }
  }
}
const get = async (ctx, next) => {
  const userId = ctx.session.userName
  const userDoc = await User.findOne({ userId })
  if (userDoc) {
    if (userDoc.userTodoList.length) {
      ctx.body = { success: true, todoList: userDoc.userTodoList }
    } else {
      ctx.body = { success: true, todoList: [] }
    }
  }
}
const done = async (ctx, next) => {
  try {
    await User.update({ 'userId': ctx.session.userName, 'userTodoList._id': mongoose.Types.ObjectId(ctx.params['todoId']) }, { $set: { 'userTodoList.$.todoState': 'done' } })
    const userDoc = await User.findOne({ userId: ctx.session.userName })
    ctx.body = { success: true, todoList: userDoc.userTodoList }
  } catch (err) {
    console.log(err)
    ctx.body = { success: false, todoList: [] }
  }
}
const detail = async (ctx, next) => {
  try {
    let theTodo = null
    const userDoc = await User.findOne({ 'userId': ctx.session.userName })
    userDoc.userTodoList.forEach(todo => {
      if (todo._id.toString() === ctx.params['todoId']) {
        theTodo = todo
      }
    })
    await userDoc.save()
    ctx.body = { success: true, todo: theTodo }
  } catch (err) {
    console.log(err)
    ctx.body = { success: false, todo: null }
  }
}

router.post('/add', add)
router.get('/get', get)
router.post('/done/:todoId', done)
router.get('/detail/:todoId', detail)

module.exports = router
