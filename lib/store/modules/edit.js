const state = {
  registry: null,
  components: {},
  editing: null,
  map: {},
  model: {}
}

const mutations = {
  SET_COMPONENTS: (state, payload) => {
    state.components = Object.keys(payload).reduce(
      (prev, cur) => ({ ...prev, [cur]: payload[cur] }),
      {}
    )
  },
  SET_REGISTRY: (state, payload) => {
    state.registry = payload
  }
}

const actions = {
  init({ commit }, payload) {
    const { registry, components } = payload

    commit('SET_COMPONENTS', components)
    commit('SET_REGISTRY', registry)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
