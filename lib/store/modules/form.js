const state = {
  datasource: {},
  listeners: [],
  fields: []
}

const mutations = {
  SET_VALUE: (state, payload = {}) => {
    Object.assign(state, payload)
  },
  SET_FIELDS(state, payload) {
    state.fields = payload
  }
}

const actions = {
  init({ commit }, payload) {
    commit('SET_VALUE', payload)
  },
  updateRoot({ commit }, payload) {
    commit(
      'SET_FIELDS',
      payload.map(item => ({ component: item.name }))
    )
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
