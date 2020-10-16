const state = {
  components: {},
  editing: null,
  map: {},
  model: {},
  registry: null
}

const mutations = {
  SET_REGISTRY: (state, payload) => {
    state.registry = payload
  }
}

const actions = {
  init({ commit }, payload) {
    const { registry } = payload

    commit('SET_REGISTRY', registry)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
