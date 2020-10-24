import Vue from 'vue'
import { set } from 'lodash-es'
import { eachTreeNodes } from '../../utils/tree'

const createComponent = component => {
  const { name, properties = [] } = component
  const item = {
    component: name,
    uuid: Symbol('uuid')
  }
  properties
    .filter(prop => prop.default !== undefined)
    .forEach(prop => {
      set(item, prop.name, prop.default)
    })
  return item
}

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
      if (!node.uuid) {
        node.uuid = Symbol('uuid')
      }
    })
  },
  SET_ROOT(state, payload) {
    state.value.fields = payload.map(createComponent)
  },
  SET_EDITING(state, payload) {
    state.editing = payload
  },
  SET_COLLAPSE(state, payload) {
    Vue.set(state.map[payload.uuid], '_collapse', payload.value)
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

      const children = value
        .filter(item => item)
        .map(item =>
          item.component === undefined ? createComponent(item) : item
        )
        .map(item => {
          return state.map[item.uuid] || item
        })

      if (node.children === undefined) {
        Vue.set(node, 'children', children)
      } else {
        node.children = children
      }
    })
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
  },
  UPDATE_FIELD(state, payload) {
    const { uuid, value } = payload

    if (state.map[uuid]) {
      Object.assign(state.map[uuid], value)
    }
  }
}

const actions = {
  init({ commit }, payload) {
    commit('SET_VALUE', payload)
    commit('UPDATE_MAP')
    commit('SET_EDITING', null)
  },
  updateRoot({ commit }, payload) {
    commit('SET_ROOT', payload)
    commit('UPDATE_MAP')
  },
  updateFields({ commit }, payload) {
    commit('SET_CHILDREN', payload)
    commit('UPDATE_MAP')
  },
  removeField({ commit }, payload) {
    commit('REMOVE_CHILD', payload)
  },

  setField({ commit }, payload) {
    commit('UPDATE_FIELD', payload)
  },

  select({ commit }, payload) {
    commit('SET_EDITING', payload.uuid)
  },
  unselect({ commit }) {
    commit('SET_EDITING', null)
  },
  toggleCollapse({ commit, state }, payload) {
    if (!state.map[payload]) {
      return
    }

    if (state.map[payload]._collapse) {
      commit('SET_COLLAPSE', { uuid: payload, value: undefined })
    } else {
      commit('SET_COLLAPSE', { uuid: payload, value: true })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
