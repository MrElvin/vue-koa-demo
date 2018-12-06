import { shallowMount } from '@vue/test-utils'
import Todofooter from '@/components/Todofooter'

describe('Todofooter.vue', () => {
  const wrapper = shallowMount(Todofooter)
  test('render text footer', () => {
    expect(wrapper.html()).toContain('<footer>vue-koa-todos by <span>BreezyMelon</span></footer>')
  })
})
