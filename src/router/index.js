import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import TodoList from '@/components/TodoList'
import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todo',
      component: TodoList
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/todo',
      name: 'todoList',
      component: TodoList
    },
    {
      path: '/detail/:todoId',
      name: 'detail',
      component: Detail
    }
  ]
})
