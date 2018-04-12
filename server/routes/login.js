const router = require('koa-router')()
const User = require('../models/user')

const checkLoginName = async (ctx, next) => {
  const { name } = ctx.request.body
  const userDoc = await User.findOne({ userId: name })
  if (userDoc) {
    ctx.body = { success: true }
  } else {
    ctx.body = { success: false, msg: '用户名不存在' }
  }
}

const checkLogin = async (ctx, next) => {
  const { name, pwd } = ctx.request.body
  const userDoc = await User.findOne({ userId: name })
  if (userDoc) {
    if (userDoc.userPwd === pwd) {
      console.log('userId', userDoc.userId)
      ctx.session.userName = userDoc.userId
      console.log('session userId', ctx.session.userName)
      ctx.body = { success: true, msg: '' }
    } else {
      ctx.body = { success: false, msg: '密码错误' }
    }
  } else {
    ctx.body = { success: false, msg: '用户名不存在' }
  }
}

const checkHasLogin = async (ctx, next) => {
  console.log(ctx.session.userName)
  if (ctx.session.userName) {
    ctx.body = {
      success: true,
      msg: ctx.session.userName
    }
  } else {
    ctx.body = {
      success: false,
      msg: ''
    }
  }
}

router.get('/hasLogin', checkHasLogin)
router.post('/', checkLogin)
router.post('/name', checkLoginName)

module.exports = router
