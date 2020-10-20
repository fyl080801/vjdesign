const state = {
  show: false,
  title: '',
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
    const { fields = [], datasource = {}, listeners = [] } = payload
    state.fields = fields
    state.datasource = datasource
    state.listeners = listeners
  },
  SET_MODEL(state, payload) {
    state.model = payload
  }
}

const actions = {
  show({ commit }, payload) {
    const { title, form = {}, model = {} } = payload
    commit('SET_TITLE', title)
    commit('SET_FORM', form)
    commit('SET_MODEL', model)
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
