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
              icon: item.icon,
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

      // const result = action.value.map(item => {
      //   if (item.component === undefined) {
      //     const newItem = {
      //       uuid: guid2(),
      //       component: item.tag
      //     }
      //     ;(item.defaults || []).forEach(item => {
      //       set(newItem, item.property, item.value)
      //     })
      //     return newItem
      //   }
      //   return item
      // })
      // node.children = result.map(item => {
      //   return state.fieldMap[item.uuid] || item
      // })
    })

    state.value.fields = [].concat(state.value.fields)
  }
}

const actions = {
  init({ commit }, payload) {
    commit('SET_VALUE', payload)
  },
  updateRoot({ commit }, payload) {
    commit(
      'SET_ROOT',
      payload.map(item => {
        const component = {
          icon: item.icon,
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
