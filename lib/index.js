import Main from './component/Main.vue'
import commonRegistry from './utils/register'
import extend from './utils/vjform'
import vjform from 'vjform'

vjform.use(extend)

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
