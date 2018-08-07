// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './mock'
import { Form, FormItem, Button, Input, RadioGroup, RadioButton, Tag, Pagination, Message } from 'element-ui'

// Vue.config.productionTip = false

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Tag)
Vue.use(Pagination)
Vue.prototype.$message = Message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
