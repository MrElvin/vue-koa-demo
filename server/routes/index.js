const router = require('koa-router')()
const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const userTodo = require('./userTodo')

const mongoose = require('mongoose')

switch (process.env.NODE_ENV) {
  case 'test':
    mongoose.connect('mongodb://127.0.0.1:27017/vue_koa_todos_test')
    break
  /* istanbul ignore next */
  case 'dev':
    mongoose.connect('mongodb://127.0.0.1:27017/vue_koa_todos')
    break
  /* istanbul ignore next */
  default:
    mongoose.connect('mongodb://vue_koa_todos_owner:aliyunVueKoaTodos@127.0.0.1:27017/vue_koa_todos')
}
mongoose.connection.on('connected', () => { console.log('MongoDB connected success') })

router.post('/api/register', register)
router.use('/api/login', login.routes(), login.allowedMethods())
router.get('/api/logout', logout)
router.use('/api/todo', userTodo.routes(), userTodo.allowedMethods())

module.exports = router
