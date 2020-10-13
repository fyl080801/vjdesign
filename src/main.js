import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import vjdesign from '../lib'

import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(Element)
Vue.use(vjdesign)

new Vue({
  render: h => h(App)
}).$mount('#app')
