import { DesignBorder, ContainerBorder } from '../../components/design-border'
import { DeleteElement, TitleTag } from '../../components/element-tag'
import { ModalContent } from '../../components/modal'
import vuedraggable from 'vuedraggable'
import SvgIcon from 'vue-svgicon'

const state = {
  registry: null,
  components: {} // 设计器用到的组件
}

const mutations = {
  SET_COMPONENTS: (state, payload) => {
    state.components = Object.keys(payload).reduce(
      (prev, cur) => ({ ...prev, [cur]: payload[cur] }),
      {
        [DesignBorder.name]: DesignBorder,
        [ContainerBorder.name]: ContainerBorder,
        [DeleteElement.name]: DeleteElement,
        [TitleTag.name]: TitleTag,
        [ModalContent.name]: ModalContent,
        SvgIcon,
        vuedraggable
      }
    )
  },
  SET_REGISTRY: (state, payload) => {
    state.registry = payload
  }
}

const actions = {
  init({ commit }, payload) {
    const { registry, components } = payload

    commit('SET_COMPONENTS', components)
    commit('SET_REGISTRY', registry)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
