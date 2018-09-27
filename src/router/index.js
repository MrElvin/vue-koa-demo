import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'todo',
        component: resolve => require(['@/components/TodoList'], resolve)
      },
      {
        path: '/login',
        name: 'login',
        component: resolve => require(['@/components/Login'], resolve)
      },
      {
        path: '/register',
        name: 'register',
        component: resolve => require(['@/components/Register'], resolve)
      },
      {
        path: '/todo',
        name: 'todoList',
        component: resolve => require(['@/components/TodoList'], resolve)
      },
      {
        path: '/detail/:todoId',
        name: 'detail',
        component: resolve => require(['@/components/Detail'], resolve)
      },
      {
        path: '*',
        name: 'notFound',
        component: resolve => require(['@/components/NotFound'], resolve)
      }
    ]
  })
}
