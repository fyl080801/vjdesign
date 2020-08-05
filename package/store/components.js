export default {
  namespaced: true,
  state: {},
  mutations: {
    UPDATE: (state, payload) => {
      Object.keys(payload).forEach(key => {
        state[payload[key].name || key] = payload[key]
      })
    }
  }
}
