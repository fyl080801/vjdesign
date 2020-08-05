import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import createLogger from 'vuex/dist/logger'
import form from './form'
import components from './components'

const debug = process.env.NODE_ENV !== 'production'

const plugins = debug ? [createLogger()] : []

Vue.use(Vuex)

export default new Store({
  plugins,
  state: {
    metadata: {}
  },
  mutations: {},
  actions: {},
  modules: {
    form,
    components
  }
})
