import Vue from 'vue'
import ElementUI from 'element-ui'
import { mount } from '@vue/test-utils'
import TodoList from '@/components/TodoList'
import flushPromise from 'flush-promises'

Vue.use(ElementUI)
jest.mock('axios', () => ({
  get: jest.fn()
    // for test1
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
    // for test2
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
    // for test3
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true
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
        success: true,
        todoTotal: 1,
        todoList: [
          {
            todoDetail: 'A new todo',
            todoState: 'done',
            todoTime: '1544085337102'
          }
        ]
      }
    }))
    // for test4
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true
      }
    }))
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true,
        todoList: [
          {
            todoState: 'todo'
          },
          {
            todoState: 'done'
          }
        ]
      }
    }))
    // for test5
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true
      }
    }))
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true,
        todoTotal: 1,
        todoList: [
          {
            todoState: 'todo',
            todoDetail: 'A new detail'
          }
        ]
      }
    }))
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true,
        todoTotal: 1,
        todoList: [
          {
            todoState: 'todo',
            todoDetail: 'An updated detail'
          }
        ]
      }
    }))
    // for test6
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true
      }
    }))
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true
      }
    })),
  post: jest.fn()
    // for test2
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true
      }
    }))
    // for test3
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true
      }
    }))
    // for test5
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true
      }
    }))
}))

const { getComputedStyle } = window
window.getComputedStyle = function getComputedStyleStub (el) {
  return {
    ...getComputedStyle(el),
    transitionDelay: '',
    transitionDuration: '',
    animationDelay: '',
    animationDuration: '',
    getPropertyValue: jest.fn()
  }
}

describe('TodoList.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(TodoList, {
      sync: false
    })
  })

  test('should get correct todolist', async () => {
    sessionStorage.__STORE__.hasLogin = true

    expect(wrapper.vm.todoTotal).toBe(1)
    expect(wrapper.vm.todoList).toHaveLength(1)
  })

  test('should add new todo when press the Enter + Ctrl key', async () => {
    wrapper.setData({ todoToAdd: 'A new todo' })
    expect(wrapper.vm.todoTotal).toBe(0)
    await wrapper.vm.submitTodo()
    await flushPromise()

    expect(wrapper.vm.todoTotal).toBe(1)
  })

  test('should toggle todo todoState when click todoState button', async () => {
    expect(wrapper.vm.todoList.filter(todo => todo.todoState === 'todo')).toHaveLength(1)
    await wrapper.vm.completeTodo({ _id: 1 })

    expect(wrapper.vm.todoList.filter(todo => todo.todoState === 'todo')).toHaveLength(0)
  })

  test('todo input should exist when click todo item', async () => {
    wrapper.find('ul li:nth-child(1) .item-container p').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.todoList[0].inputShow).toBeTruthy()
    wrapper.find('ul li:nth-child(2) .item-container p').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.todoList[1].inputShow).toBeFalsy()
  })

  test('todo should be updated when todo item input emit blur event', async () => {
    wrapper.vm.todoList[0].inputShow = true
    wrapper.find('ul li:first-child div p input').trigger('blur')
    await flushPromise()
    expect(wrapper.vm.todoList[0].todoDetail).toBe('An updated detail')
  })

  test('sessionStorage should be changed when component is about to be destroyed', async () => {
    wrapper.setData({ page: 2 })
    expect(sessionStorage.__STORE__.pagination).toBeFalsy()
    wrapper.destroy()
    expect(Number(sessionStorage.__STORE__.pagination)).toBe(2)
  })

  test('todoList.vue snapshot test', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
