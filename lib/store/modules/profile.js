import html from '../../internal/profile/components'
import internalProperties from '../../internal/profile/properties'

const state = {
  components: [],
  datasource: [],
  functional: [],
  properties: [],
  schema: {}
}

const mutations = {
  INIT: (state, payload) => {
    const { components, properties } = payload

    state.components = [...html, ...components]
    state.properties = [...internalProperties, ...properties]
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
