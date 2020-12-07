const state = {
  modals: []
}

const mutations = {
  ADD_MODEL(state, payload) {
    state.modals.push(payload)
  },
  REMOVE_MODEL(state) {
    state.modals.splice(state.modals.length - 1, 1)
  }
}

const actions = {
  show({ commit }, payload) {
    commit('ADD_MODEL', payload)
  },
  close({ commit }) {
    commit('REMOVE_MODEL')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
