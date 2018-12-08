import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import { mount } from '@vue/test-utils'
import Login from '@/components/Login'

Vue.use(ElementUI)
Vue.use(VueRouter)
const router = new VueRouter()

jest.mock('axios', () => ({
  post: jest.fn()
    // for test3
    .mockImplementationOnce(() => Promise.reject(new Error()))
    // for test4
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true
      }
    }))
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: false
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
        success: true
      }
    }))
}))

describe('Login.vue', () => {
  let wrapper
  beforeEach(() => {
    jest.useFakeTimers()
    wrapper = mount(Login, { sync: false, router })
  })

  test('login method should be called when clicking login button', async () => {
    const stub = jest.fn()
    wrapper.setMethods({ login: stub })
    await wrapper.vm.$nextTick()
    wrapper.find('.btns .el-button:nth-child(2)').trigger('click')
    expect(stub).toBeCalledTimes(1)
  })

  test('login failed when username and password are empty', async () => {
    const result = await wrapper.vm.login()
    expect(result).toBe(false)
  })

  test('login failed when username exists', async () => {
    wrapper.setData({
      form: {
        name: 'breezymelon',
        pwd: '111'
      }
    })
    const result = await wrapper.vm.login()
    expect(result).toBe(false)
  })

  test('login failed when password is wrong', async () => {
    wrapper.setData({
      form: {
        name: 'breezymelon',
        pwd: '121'
      }
    })
    const result = await wrapper.vm.login()
    expect(result).toBe(false)
  })

  test('login success when username and password is correct', async () => {
    wrapper.setData({
      form: {
        name: 'breezymelon',
        pwd: '111'
      }
    })
    const result = await wrapper.vm.login()
    jest.runAllTimers()
    expect(result).toBe(true)
  })

  test('login.vue snapshot test', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
