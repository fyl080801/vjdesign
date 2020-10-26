import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import vjdesign from '../lib'
import vjform from 'vjform/lib'
import expression from 'jpresent-transform-expression'

import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
import './styles/markdown.scss'

import Select from './components/Select.vue'

Vue.config.productionTip = false

vjform.use(expression)

Vue.use(Element)
Vue.use(vjdesign)
Vue.use(vjform)
Vue.component(Select.name, Select)

new Vue({
  render: h => h(App)
}).$mount('#app')
