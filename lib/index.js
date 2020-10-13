import Main from './component/Main.vue'

const install = function(Vue) {
  Vue.component('v-jdesign', Main)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  ...Main,
  install
}
