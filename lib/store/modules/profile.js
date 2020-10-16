const state = {
  components: [],
  datasource: [],
  functional: [],
  properties: [],
  schema: {}
}

const mutations = {
  INIT: (state, payload) => {
    Object.assign(state, payload)
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
