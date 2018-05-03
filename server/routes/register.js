const User = require('../models/user')

const register = async (ctx, next) => {
  const { name, pwd } = ctx.request.body
  console.log(name)
  const isExist = await User.findOne({ userId: name })
  if (isExist) {
    ctx.body = { success: false }
  } else {
    const userDoc = await User.create({
      userId: name,
      userPwd: pwd
    })
    const result = await userDoc.save()
    if (result) ctx.body = { success: true }
  }
}

module.exports = register
