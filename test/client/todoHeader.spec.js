import { shallowMount } from '@vue/test-utils'
import Todoheader from '@/components/Todoheader'

jest.mock('axios', () => ({
  get: jest.fn()
    // test logout axios 1
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true
      }
    }))
    // test logout axios 2
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: false
      }
    }))
    // test logout axios 3
    .mockImplementationOnce(() => Promise.reject(new Error()))
}))

describe('Todoheader.vue', () => {
  /**
   *  dom test
   */
  test('logout div should exist when username is not empty', () => {
    const wrapper = shallowMount(Todoheader, {
      propsData: {
        username: 'breezymelon'
      }
    })

    expect(wrapper.contains('.todo-header div')).toBeTruthy()
    expect(wrapper.find('h1').text()).toBe('breezymelon\'s todos')
  })

  test('logout div should not exist when username is empty', () => {
    const wrapper = shallowMount(Todoheader, {
      propsData: {
        username: ''
      }
    })

    expect(wrapper.contains('.todo-header div')).toBeFalsy()
    expect(wrapper.find('h1').text()).toBe('todos')
  })

  /**
   *  logout click
   */
  test('logout div click method', () => {
    const wrapper = shallowMount(Todoheader, {
      propsData: {
        username: 'breezymelon'
      }
    })
    const stub = jest.fn()
    wrapper.setMethods({ logout: stub })
    wrapper.find('.todo-header div').trigger('click')

    expect(stub).toHaveBeenCalledTimes(1)
  })

  /**
   *  test logout axios
   */
  test('logout axios when res is success', async () => {
    const $router = { replace: jest.fn() }
    const $message = jest.fn()
    const wrapper = shallowMount(Todoheader, {
      mocks: {
        $router,
        $message
      }
    })
    await wrapper.vm.logout()

    expect(wrapper.vm.$message).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.replace).toHaveBeenCalledTimes(1)
  })

  test('logout axios when res is false', async () => {
    const wrapper = shallowMount(Todoheader)
    await wrapper.vm.logout()

    expect(wrapper.contains('.todo-header')).toBeTruthy()
  })

  test('logout axios when error is exist', async () => {
    const $message = { error: jest.fn() }
    const wrapper = shallowMount(Todoheader, {
      mocks: {
        $message
      }
    })
    await wrapper.vm.logout()

    expect(wrapper.vm.$message.error).toHaveBeenCalled()
  })
})
