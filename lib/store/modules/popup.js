const state = {
  show: false,
  title: '',
  size: null,
  model: {},
  fields: [],
  datasource: {},
  listeners: []
}

const mutations = {
  SET_SHOW(state, payload) {
    state.show = payload
  },
  SET_TITLE(state, payload) {
    state.title = payload
  },
  SET_FORM(state, payload) {
    const {
      fields = [],
      datasource = {},
      listeners = [],
      initialling = () => {}
    } = payload
    state.fields = fields
    state.datasource = datasource
    state.listeners = listeners
    state.initialling = initialling
  },
  SET_MODEL(state, payload) {
    state.model = payload.model
    state.size = payload.size
  }
}

const actions = {
  show({ commit }, payload) {
    const { title, form = {}, model = {}, size } = payload
    commit('SET_TITLE', title)
    commit('SET_FORM', form)
    commit('SET_MODEL', { model, size })
    commit('SET_SHOW', true)
  },
  close({ commit }) {
    commit('SET_SHOW', false)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
