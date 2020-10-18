import Main from './views/Main.vue'
import commonRegistry from './utils/register'
import vjform from 'vjform/lib'
import modern from 'jpresent-transform-modern'

import './styles/index.scss'

vjform.use(modern)

const install = function(Vue) {
  Vue.component('v-jdesign', Main)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const component = {
  ...Main,
  install,
  use: builder => {
    vjform.use(builder)
    commonRegistry.use(builder)
    return component
  }
}

export default component
