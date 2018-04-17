const router = require('koa-router')()
const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const userTodo = require('./userTodo')

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/vue_koa_todos')
mongoose.connection.on('connected', () => { console.log('MongoDB connected success') })
mongoose.connection.on('error', () => { console.log('MongoDB connected fail') })
mongoose.connection.on('disconnected', () => { console.log('MongoDB connected disconnected') })

router.post('/api/register', register)
router.use('/api/login', login.routes(), login.allowedMethods())
router.get('/api/logout', logout)
router.use('/api/todo', userTodo.routes(), userTodo.allowedMethods())

module.exports = router
