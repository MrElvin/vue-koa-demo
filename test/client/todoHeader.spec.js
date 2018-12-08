import { shallowMount } from '@vue/test-utils'
import Todoheader from '@/components/Todoheader'

jest.mock('axios', () => ({
  get: jest.fn()
    // for test4
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: true
      }
    }))
    // for test5
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        success: false
      }
    }))
    // for test6
    .mockImplementationOnce(() => Promise.reject(new Error()))
}))

describe('Todoheader.vue', () => {
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

  test('todoHeader.vue snapshot test', () => {
    const wrapper = shallowMount(Todoheader)
    expect(wrapper.element).toMatchSnapshot()
  })
})
