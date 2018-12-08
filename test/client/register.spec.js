import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import { mount } from '@vue/test-utils'
import Register from '@/components/Register'

Vue.use(ElementUI)
Vue.use(VueRouter)
const router = new VueRouter()

jest.mock('axios', () => ({
  post: jest.fn()
    // for test4
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
}))

describe('Register.vue', () => {
  let wrapper
  beforeEach(() => {
    jest.useFakeTimers()
    wrapper = mount(Register, { sync: false, router })
  })

  test('confirmRegister method should be called when clicking register button', async () => {
    const stub = jest.fn()
    wrapper.setMethods({ confirmRegister: stub })
    await wrapper.vm.$nextTick()
    wrapper.find('.btns .el-button:nth-child(2)').trigger('click')
    expect(stub).toBeCalledTimes(1)
  })

  test('register failed when all fields are empty', async () => {
    const result = await wrapper.vm.confirmRegister('form')
    expect(result).toBe(false)
  })

  test('register failed when password is not same as repeated password', async () => {
    wrapper.setData({
      form: {
        name: 'breezymelon',
        pwd: '111',
        repwd: '1111'
      }
    })
    const result = await wrapper.vm.confirmRegister('form')
    expect(result).toBe(false)
  })

  test('register failed when username has already exist', async () => {
    wrapper.setData({
      form: {
        name: 'breezymelon',
        pwd: '111',
        repwd: '111'
      }
    })
    const result = await wrapper.vm.confirmRegister('form')
    expect(result).toBe(false)
  })

  test('register success when all fields are correct', async () => {
    wrapper.setData({
      form: {
        name: 'melon',
        pwd: '111',
        repwd: '111'
      }
    })
    const result = await wrapper.vm.confirmRegister('form')
    jest.runAllTimers()
    expect(result).toBe(true)
  })

  test('register.vue snapshot test', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
