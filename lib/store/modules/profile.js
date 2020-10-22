import html from '../../internal/profile/components'
import internalProperties from '../../internal/profile/properties'

const commonProperties = [
  'remark',
  'condition',
  'fieldOptions.slot',
  'fieldOptions.class',
  'fieldOptions.style'
]

const reduceProperty = (prev, cur) => {
  prev[cur.name] = cur
  return prev
}

const reduceComponent = properties => {
  return (prev, cur) => {
    prev[cur.name] = {
      ...cur,
      properties: [...commonProperties, ...cur.properties].map(prop => {
        const property = typeof prop === 'string' ? { name: prop } : prop
        const meta = properties[property.name]
        return {
          group: '通用',
          editor: 'default',
          ...meta,
          ...property
        }
      })
    }
    return prev
  }
}

const state = {
  properties: {},
  components: {}, // 设计器支持的组件
  datasource: [],
  functional: []
  // schema: {}
  //
  // icons: {}
}

const mutations = {
  INIT: (state, payload) => {
    const { components, properties } = payload

    state.properties = properties.reduce(
      reduceProperty,
      internalProperties.reduce(reduceProperty, {})
    )
    state.components = components.reduce(
      reduceComponent(state.properties),
      html.reduce(reduceComponent(state.properties), {})
    )
  }
}

const actions = {
  init({ commit }, payload) {
    commit('INIT', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
