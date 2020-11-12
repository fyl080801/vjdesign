import Main from './views/Main.vue'
import commonRegistry from './utils/register'
import vjform from 'vjform'
import modern from 'jpresent-transform-modern'
import expression from 'jpresent-transform-expression'
import design from 'jpresent-transform-design'

import './styles/index.scss'

vjform.use(modern)
vjform.use(expression)
vjform.use(design)

const install = function(Vue) {
  Vue.component('v-jdesign', Main)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const component = {
  ...Main,
  install,
  form: {
    use: builder => {
      vjform.use(builder)
      return component
    }
  },
  use: builder => {
    commonRegistry.use(builder)
    return component
  }
}

export default component
