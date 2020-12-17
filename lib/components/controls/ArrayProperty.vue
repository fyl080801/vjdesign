<template>
  <div class="list-group list-group-flush">
    <div
      class="list-group-item property-wrapper"
      :key="index"
      v-for="(item, index) in value"
    >
      <div class="property-item">
        <v-jform
          class="property-content"
          :key="index"
          :components="edit.components"
          :value="item"
          :fields="form.fields"
          :datasource="form.datasource"
          :listeners="form.listeners"
        ></v-jform>
        <span>
          <a href="javascript:;" @click="editItem(index)">
            编辑
          </a>
          <a href="javascript:;" @click="removeItem(index)">
            删除
          </a>
        </span>
      </div>
    </div>
    <a class="list-group-item list-group-item-action add-text" @click="addItem">
      <SvgIcon name="plus"></SvgIcon>
      添加
    </a>
  </div>
</template>

<script>
import SvgIcon from 'vue-svgicon'
import vjform from 'vjform'
import { mapGetters } from 'vuex'
import { resolveProperties } from '../../utils/property'
import { cloneDeep } from 'lodash-es'

export default {
  components: { [vjform.name]: vjform, SvgIcon },
  name: 'v-jd-array-property',
  props: { value: Array, prop: Object, form: Object },
  data() {
    return {
      fields: [],
      datasource: {},
      listeners: []
    }
  },
  computed: {
    ...mapGetters(['popup', 'profile', 'edit'])
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
    editItem(index) {
      const model = { data: cloneDeep(this.value[index]) }

      this.$store.dispatch('popup/show', {
        model,
        form: {
          initialling: ({ functional }) => {
            functional('SUBMIT_OBJECT', () => {
              const list = [...(this.value || [])]
              list[index] = model.data
              this.$emit('input', list)
              this.$store.dispatch('popup/close')
            })
          },
          fields: this.resolveForm('添加项')
        }
      })
    },
    removeItem(index) {
      this.$store
        .dispatch('popup/confirm', {
          title: '删除',
          content: '是否删除？'
        })
        .then(() => {
          const list = [...this.value]
          list.splice(index, 1)
          this.$emit('input', list)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-group-item {
  &.property-wrapper {
    padding-left: 0;
    padding-right: 0;

    .property-item {
      display: flex;
      align-items: center;

      > .property-content {
        flex: 1;
      }
    }
  }

  &.add-text {
    text-align: center;
  }
}
</style>
