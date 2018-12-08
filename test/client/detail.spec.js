import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Detail from '@/components/Detail'

jest.mock('axios', () => ({
  get: jest.fn()
    // for test1
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        todo: {
          todoDetail: 'this is todoDetail',
          todoTime: new Date().getTime(),
          todoState: 'done'
        }
      }
    }))
    // for test2
    .mockImplementationOnce(() => Promise.reject(new Error()))
    // for test3
    .mockImplementationOnce(() => Promise.resolve({
      data: {
        todo: {
          todoDetail: 'this is todoDetail',
          todoTime: new Date().getTime(),
          todoState: 'done'
        }
      }
    }))
}))

describe('Detail.vue', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  test('created: get detailTodo ok', async () => {
    const $route = { params: { todoId: '5c0361f44a240a3fa9e06928' } }
    const wrapper = shallowMount(Detail, {
      mocks: {
        $route
      }
    })
    await flushPromises()
    expect(wrapper.contains('.detail')).toBeTruthy()
    expect(wrapper.find('.detail-content').text()).toBe('this is todoDetail')
    expect(wrapper.contains('img')).toBe(true)
  })

  test('created: get detailTodo fail', async () => {
    const $route = { params: { todoId: '5c0361f44a240a3fa9e06928' } }
    const $router = { push: jest.fn() }
    const $message = { error: jest.fn() }
    const wrapper = shallowMount(Detail, {
      mocks: {
        $route,
        $router,
        $message
      }
    })
    await flushPromises()
    jest.runAllTimers()
    expect(wrapper.vm.$message.error).toBeCalled()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })

  test('detail.vue snapshot test', () => {
    const $route = { params: { todoId: '5c0361f44a240a3fa9e06928' } }
    const wrapper = shallowMount(Detail, {
      mocks: {
        $route
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
