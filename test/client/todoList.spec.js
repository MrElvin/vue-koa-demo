import Vue from 'vue'
import ElementUI from 'element-ui'
import { mount } from '@vue/test-utils'
import TodoList from '@/components/TodoList'
import flushPromise from 'flush-promises'

Vue.use(ElementUI)

jest.mock('axios', () => ({
  get: jest.fn()
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true,
        msg: 'breezymelon'
      }
    }))
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true,
        todoTotal: 1,
        todoList: [
          {
            todoDetail: 'Todo Detail',
            todoState: 'todo',
            todoTime: '1544085337102'
          }
        ]
      }
    }))

    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true,
        msg: 'breezymelon'
      }
    }))
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true,
        todoTotal: 0
      }
    }))
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true,
        todoTotal: 1,
        todoList: [
          {
            todoDetail: 'A new todo',
            todoState: 'todo',
            todoTime: '1544085337102'
          }
        ]
      }
    }))

    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true
      }
    }))
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true
      }
    }))
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true,
        todoList: [{ status: 'done' }]
      }
    })),
  post: jest.fn()
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true
      }
    }))
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true
      }
    }))
}))

describe('TodoList.vue', () => {
  test('should get correct todolist', async () => {
    sessionStorage.__STORE__.hasLogin = true
    const wrapper = mount(TodoList, { sync: false })
    await flushPromise()

    expect(wrapper.vm.todoTotal).toBe(1)
    expect(wrapper.vm.todoList).toHaveLength(1)
  })
  test('should add new todo when press the Enter + Ctrl key', async () => {
    const wrapper = mount(TodoList, { sync: false })
    wrapper.setData({ todoToAdd: 'A new todo' })
    expect(wrapper.vm.todoTotal).toBe(0)
    await wrapper.vm.submitTodo()

    expect(wrapper.vm.todoTotal).toBe(1)
  })
  test('should toggle todo status when click status button', async () => {
    const wrapper = mount(TodoList, { sync: false })
    wrapper.setData({ todoList: [{ status: 'todo' }] })
    expect(wrapper.vm.todoList.filter(todo => todo.status === 'todo')).toHaveLength(1)
    await wrapper.vm.completeTodo({ _id: 1 })

    expect(wrapper.vm.todoList.filter(todo => todo.status === 'todo')).toHaveLength(0)
  })
  test('should update todo detail when emit blur event', async () => {

  })
})
