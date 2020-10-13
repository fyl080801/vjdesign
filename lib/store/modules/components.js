const state = {}

const mutations = {
  SET_COMPONENTS: (state, payload) => {
    Object.keys(payload).forEach(key => {
      state[payload[key].name || key] = payload[key]
    })
  }
}

const actions = {
  init({ commit }, payload) {
    commit('SET_COMPONENTS', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
