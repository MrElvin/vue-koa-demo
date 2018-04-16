const logout = async (ctx, next) => {
  ctx.session = null
  ctx.body = {
    success: true
  }
}

module.exports = logout
