import Vue from 'vue'
import App from './App'
import { createRouter } from './router'
import { Form, FormItem, Button, Input, RadioGroup, RadioButton, Tag, Pagination, Message } from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Tag)
Vue.use(Pagination)
Vue.prototype.$message = Message

export function createApp () {
  const router = createRouter()
  const app = new Vue({
    router,
    render: h => h(App)
  })
  return { app, router }
}
