<template>
  <div class="list-group list-group-flush">
    <div class="list-group-item" :key="index" v-for="(item, index) in value">
      <div>
        <v-jform
          :value="item"
          :fields="fields"
          :datasource="datasource"
          :listeners="listeners"
        ></v-jform>
        <button type="button" class="btn btn-sm btn-link" @click="editItem">
          编辑
        </button>
        <button type="button" class="btn btn-sm btn-link" @click="removeItem">
          删除
        </button>
      </div>
    </div>
    <a
      class="list-group-item list-group-item-action list-group-item-primary add-text"
      @click="addItem"
    >
      <SvgIcon name="plus"></SvgIcon>
      添加
    </a>
  </div>
</template>

<script>
import SvgIcon from 'vue-svgicon'
import { mapGetters } from 'vuex'
import { resolveProperties } from '../../utils/property'

export default {
  components: { SvgIcon },
  name: 'v-jd-array-property',
  props: { value: Array, prop: Object },
  data() {
    return {
      fields: [],
      datasource: {},
      listeners: []
    }
  },
  computed: {
    ...mapGetters(['popup', 'profile'])
  },
  methods: {
    resolveForm(title) {
      return [
        {
          component: 'v-jd-modal-content',
          fieldOptions: { props: { title } },
          children: [
            {
              component: 'v-jd-object-form',
              model: ['data'],
              fieldOptions: {
                props: {
                  properties: resolveProperties(
                    this.profile.properties,
                    this.prop.properties || [],
                    {
                      editor: 'default'
                    }
                  )
                }
              }
            },
            {
              component: 'button',
              text: '确定',
              fieldOptions: {
                slot: 'footer',
                class: 'btn btn-primary',
                on: {
                  click: '@:SUBMIT_OBJECT()'
                }
              }
            },
            {
              component: 'button',
              text: '取消',
              fieldOptions: {
                slot: 'footer',
                class: 'btn btn-secondary',
                on: { click: () => this.$store.dispatch('popup/close') }
              }
            }
          ]
        }
      ]
    },
    addItem() {
      const model = { data: {} }

      this.$store.dispatch('popup/show', {
        model,
        form: {
          initialling: ({ functional }) => {
            functional('SUBMIT_OBJECT', () => {
              this.$emit('input', (this.value || []).concat(model.data))
              this.$store.dispatch('popup/close')
            })
          },
          fields: this.resolveForm('添加项')
        }
      })
    },
    editItem() {},
    removeItem() {
      this.$store.dispatch('popup/confirm', {
        title: '删除',
        content: '是否删除？'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-group-item {
  &.add-text {
    text-align: center;
  }
}
</style>
