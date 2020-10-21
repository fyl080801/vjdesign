import html from '../../internal/profile/components'
import internalProperties from '../../internal/profile/properties'

const state = {
  components: [], // 设计器支持的组件
  datasource: [],
  functional: [],
  properties: [],
  schema: {},
  icons: {}
}

const mutations = {
  INIT: (state, payload) => {
    const { components, properties } = payload

    state.components = [...html, ...components]
    state.properties = [...internalProperties, ...properties]
    state.icons = state.components.reduce((prev, cur) => {
      prev[cur.name] = cur.icon
      return prev
    }, {})
  }
}

const actions = {
  init({ commit }, payload) {
    commit('INIT', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
