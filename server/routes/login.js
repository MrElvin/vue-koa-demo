const router = require('koa-router')()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const checkLoginName = async (ctx, next) => {
  const { name } = ctx.request.body
  console.log(name)
  const userDoc = await User.findOne({ userId: name })
  if (userDoc) {
    ctx.body = { success: true }
  } else {
    ctx.body = { success: false, msg: '用户名不存在' }
  }
}

const login = async (ctx, next) => {
  const { name, pwd } = ctx.request.body
  const userDoc = await User.findOne({ userId: name })
  if (userDoc) {
    if (bcrypt.compareSync(pwd, userDoc.userPwd)) {
      ctx.session.userName = userDoc.userId
      ctx.body = { success: true, msg: '', userName: ctx.session.userName }
    } else {
      ctx.body = { success: false, msg: '密码错误', userName: '' }
    }
  } else {
    ctx.body = { success: false, msg: '用户名不存在', userName: '' }
  }
}

const checkHasLogin = async (ctx, next) => {
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

router.post('/', login)
router.get('/hasLogin', checkHasLogin)
router.post('/name', checkLoginName)

module.exports = router
