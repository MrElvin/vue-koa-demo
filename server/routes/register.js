const User = require('../models/user')
const bcrypt = require('bcryptjs')

const register = async (ctx, next) => {
  const { name, pwd } = ctx.request.body
  if (!name) throw new Error('name is required')
  const isExist = await User.findOne({ userId: name })
  if (isExist) {
    ctx.body = { success: false }
  } else {
    const userDoc = await User.create({
      userId: name,
      userPwd: bcrypt.hashSync(pwd)
    })
    await userDoc.save()
    ctx.body = { success: true }
  }
}

module.exports = register
