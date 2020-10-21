import { eachTreeNodes } from '../../utils/tree'

const state = {
  value: {
    datasource: {},
    listeners: [],
    fields: []
  },
  editing: null,
  map: {},
  model: {}
}

const mutations = {
  SET_VALUE: (state, payload = {}) => {
    Object.assign(state.value, payload)
    eachTreeNodes(state.value.fields, node => {
      node.uuid = node.uuid || Symbol('uuid')
    })
  },
  SET_ROOT(state, payload) {
    state.value.fields = payload
  },
  SET_EDITING(state, payload) {
    state.editing = payload
  },
  UPDATE_MAP(state) {
    state.map = {}
    eachTreeNodes(state.value.fields, node => {
      state.map[node.uuid] = node
    })
  },
  SET_CHILDREN(state, payload) {
    const { uuid, value } = payload

    eachTreeNodes(state.value.fields, node => {
      if (uuid !== node.uuid) {
        return true
      }

      const result = value
        .filter(item => item)
        .map(item => {
          if (item.component === undefined) {
            const newItem = {
              component: item.name,
              uuid: Symbol('uuid')
            }

            return newItem
          }
          return item
        })

      node.children = result.map(item => {
        return state.map[item.uuid] || item
      })
    })

    state.value.fields = [].concat(state.value.fields)
  },
  REMOVE_CHILD(state, payload) {
    let isdelete = null

    // 先看根级元素
    const deleteIndex = state.value.fields.findIndex(
      item => item.uuid === payload
    )

    if (deleteIndex >= 0) {
      isdelete = state.value.fields[deleteIndex].uuid
      state.value.fields.splice(deleteIndex, 1)
    } else {
      eachTreeNodes(state.value.fields, node => {
        if (!node.children || node.children <= 0) {
          return true
        }

        const deleteIndex = node.children.findIndex(
          item => item.uuid === payload
        )
        if (deleteIndex < 0) {
          return true
        }

        isdelete = node.children[deleteIndex].uuid
        node.children.splice(deleteIndex, 1)
        return false
      })
    }

    if (isdelete) {
      if (state.editing === isdelete) {
        state.editing = null
      }
      state.value.fields = [].concat(state.value.fields)
    }
  }
}

const actions = {
  init({ commit }, payload) {
    commit('SET_VALUE', payload)
    commit('UPDATE_MAP')
  },
  updateRoot({ commit }, payload) {
    commit(
      'SET_ROOT',
      payload.map(item => {
        const component = {
          component: item.name,
          uuid: Symbol('uuid')
        }
        // const uuid = Symbol('uuid')
        // Object.defineProperty(component, 'uuid', { get: () => uuid })
        return component
      })
    )
    commit('UPDATE_MAP')
  },
  updateChildren({ commit }, payload) {
    commit('SET_CHILDREN', payload)
    commit('UPDATE_MAP')
  },
  removeChild({ commit }, payload) {
    commit('REMOVE_CHILD', payload)
  },

  select({ commit }, payload) {
    commit('SET_EDITING', payload.uuid)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
