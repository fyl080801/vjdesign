const state = {
  show: false,
  title: '',
  size: null,
  model: {},
  fields: [],
  datasource: {},
  listeners: [],
  modals: []
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
  },
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
  },
  confirm() {
    //
  },
  alert() {
    //
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
