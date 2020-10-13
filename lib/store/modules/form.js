const state = {
  datasource: {},
  listeners: [],
  fields: []
}

const mutations = {
  SET_VALUE: (state, payload = {}) => {
    Object.assign(state, payload)
  }
}

const actions = {
  init({ commit }, payload) {
    commit('SET_VALUE', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
