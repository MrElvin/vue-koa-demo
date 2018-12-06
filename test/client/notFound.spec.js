import { shallowMount } from '@vue/test-utils'
import NotFound from '@/components/NotFound'

describe('NotFound.vue', () => {
  const wrapper = shallowMount(NotFound)
  test('render text 404', () => {
    expect(wrapper.html()).toContain('<h1><strong>404</strong> 啊哈页面不见了</h1>')
  })
})
