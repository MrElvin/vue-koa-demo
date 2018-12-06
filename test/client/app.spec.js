import { shallowMount, mount } from '@vue/test-utils'
import App from '@/App'
import Todoheader from '@/components/Todoheader'

describe('App.vue', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  /**
   *  DATA TEST
   */
  test('data.username should be sessionStorage.username: breezymelon', () => {
    const $router = { replace: jest.fn() }
    sessionStorage.__STORE__.username = 'breezymelon'
    const wrapper = shallowMount(App, {
      mocks: {
        $router
      }
    })
    expect(wrapper.vm.username).toBe('breezymelon')
  })

  test('data.username should be empty string', () => {
    const wrapper = shallowMount(App)

    expect(wrapper.vm.username).toBe('')
  })

  test('setUserName should be called when emit setUserName event', () => {
    const wrapper = mount(App, {
      stubs: ['router-link', 'router-view']
    })
    wrapper.find(Todoheader).vm.$emit('setUserName', { username: 'breezymelon' })

    expect(wrapper.vm.username).toBe('breezymelon')
  })
})
