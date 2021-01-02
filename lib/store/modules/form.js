import Vue from 'vue'
import { isArray, set } from 'lodash-es'
import { eachTreeNodes } from '../../utils/tree'

const createComponent = cmp => {
  const { name, properties = [] } = cmp

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
    fields: [],
    model: {}
  },
  editing: null,
  listener: null,
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
    Vue.set(
      state.map[payload.uuid],
      'options',
      state.map[payload.uuid].options || {}
    )
    Vue.set(state.map[payload.uuid].options, 'collapse', payload.value)
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
        if (
          !node.children ||
          !isArray(node.children) ||
          node.children.length <= 0
        ) {
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
  // listener
  ADD_LISTENER(state) {
    state.value.listeners.push({ actions: [] })
  },
  UPDATE_WATCH(state, payload) {
    const { index, value } = payload

    if (state.value.listeners[index].watch) {
      state.value.listeners[index].watch = value
    } else {
      Vue.set(state.value.listeners[index], 'watch', value)
    }
  },
  REMOVE_LISTENER(state, payload) {
    state.value.listeners.splice(payload, 1)
    if (state.listener === payload) {
      state.listener = null
    }
  },
  SELECT_LISTENER(state, payload) {
    state.listener = payload
  },
  //
  ADD_ACTION(state) {
    if (state.listener === null || !state.value.listeners[state.listener]) {
      return
    }

    state.value.listeners[state.listener].actions.push({})
  },
  REMOVE_ACTION(state, payload) {
    if (state.listener === null || !state.value.listeners[state.listener]) {
      return
    }

    if (!state.value.listeners[state.listener].actions) {
      return
    }
    state.value.listeners[state.listener].actions.splice(payload, 1)
  },
  //
  SET_DATASOURCE(state, payload) {
    const { name, value } = payload

    if (!state.value.datasource[name]) {
      Vue.set(state.value.datasource, name, value)
    } else {
      state.value.datasource[name] = value
    }

    if (value === undefined) {
      delete state.value.datasource[name]
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
  //
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

    if ((state.map[payload].options || {}).collapse) {
      commit('SET_COLLAPSE', { uuid: payload, value: undefined })
    } else {
      commit('SET_COLLAPSE', { uuid: payload, value: true })
    }
  },
  // listeners
  addListener({ commit, state }) {
    commit('ADD_LISTENER')
    commit('SELECT_LISTENER', state.value.listeners.length - 1)
  },
  updateListener({ commit }, payload) {
    commit('UPDATE_WATCH', payload)
  },
  removeListener({ commit }, payload) {
    commit('REMOVE_LISTENER', payload)
  },
  selectListener({ commit }, payload) {
    commit('SELECT_LISTENER', payload)
  },
  // action
  addAction({ commit }) {
    commit('ADD_ACTION')
  },
  removeAction({ commit }, payload) {
    commit('REMOVE_ACTION', payload)
  },
  //
  setDatasource({ commit }, payload) {
    if (!payload.name || !payload.type) {
      return
    }

    commit('SET_DATASOURCE', {
      name: payload.name,
      value: { ...payload, name: undefined }
    })
  },
  removeDatasource({ commit }, payload) {
    commit('SET_DATASOURCE', {
      name: payload,
      value: undefined
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
