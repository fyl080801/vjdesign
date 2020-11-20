const state = {
  value: {},
  profile: {}
}

const mutations = {
  SET_DATA(state, payload) {
    state.value = payload.value
    state.profile = payload.profile
  }
}

const actions = {
  setData({ commit }, payload) {
    commit('SET_DATA', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
