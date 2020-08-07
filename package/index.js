import layout from './components/Layout'
import lib from './lib'
import './icons/components'
import './lib/vjform'

import 'normalize-scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.scss'

const install = function(Vue) {
  Vue.component('vJdesign', layout)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  ...layout,
  install,
  feature: lib
}
