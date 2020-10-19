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
  UPDATE_MAP(state) {
    state.map = {}
    eachTreeNodes(state.value.fields, node => {
      state.map[node.uuid] = node
    })
  },
  // eslint-disable-next-line no-unused-vars
  SET_CHILDREN(state, payload) {
    const { uuid, value } = payload

    eachTreeNodes(state.value.fields, node => {
      // console.log(node, JSON.stringify(node))
      // const action = payload.find(p => p.uuid === node.uuid)
      // if (!action) {
      //   return true
      // }

      if (uuid !== node.uuid) {
        return true
      }

      const result = value
        .filter(item => item)
        .map(item => {
          if (item.component === undefined) {
            const newItem = { uuid: Symbol('uuid'), component: item.name }

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

    // // 同步map
    // state.fieldMap = {}
    // eachTreeNodes(state.value.fields, node => {
    //   state.fieldMap[node.uuid] = node
    // })
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
        const component = { component: item.name, uuid: Symbol('uuid') }
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
