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
  },
  confirm({ commit }, payload) {
    const { title, content } = payload

    return new Promise((resolve, reject) => {
      const modal = {
        size: 'sm',
        form: {
          fields: [
            {
              component: 'v-jd-modal-content',
              fieldOptions: { props: { title } },
              children: [
                { component: 'p', text: content },
                {
                  component: 'button',
                  text: '确定',
                  fieldOptions: {
                    slot: 'footer',
                    class: 'btn btn-primary',
                    on: {
                      click: () => {
                        resolve()
                        commit('REMOVE_MODEL')
                      }
                    }
                  }
                },
                {
                  component: 'button',
                  text: '取消',
                  fieldOptions: {
                    slot: 'footer',
                    class: 'btn btn-secondary',
                    on: {
                      click: () => {
                        commit('REMOVE_MODEL')
                        reject()
                      }
                    }
                  }
                }
              ]
            }
          ]
        }
      }
      commit('ADD_MODEL', modal)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
