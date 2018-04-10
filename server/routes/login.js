const router = require('koa-router')()
const User = require('../models/user')

const checkLogin = async (ctx, next) => {
  const { name, pwd } = ctx.request.body
  const userDoc = await User.findOne({ userId: name })
  if (userDoc) {
    if (userDoc.userPwd === pwd) {
      ctx.session = {
        userName: userDoc.userId
      }
      console.log(ctx.session)
      ctx.body = { success: true, msg: '' }
    } else {
      ctx.body = { success: false, msg: '密码错误' }
    }
  } else {
    ctx.body = { success: false, msg: '用户名不存在' }
  }
}

const checkLoginName = async (ctx, next) => {
  const { name } = ctx.request.body
  const userDoc = await User.findOne({ userId: name })
  if (userDoc) {
    ctx.body = { success: true }
  } else {
    ctx.body = { success: false, msg: '用户名不存在' }
  }
}

const checkHasLogin = async (ctx, next) => {
  console.log(ctx.session)
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

router.post('/', checkLogin)
router.post('/name', checkLoginName)
router.get('/hasLogin', checkHasLogin)

module.exports = router
