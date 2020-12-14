<template>
  <div class="list-group list-group-flush">
    <div class="list-group-item" :key="index" v-for="(item, index) in value">
      <div>
        <v-jform
          value="item"
          :fields="fields"
          :datasource="datasource"
          :listeners="listeners"
        ></v-jform>
        <a @click="removeItem">删除</a>
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
    ...mapGetters(['popup'])
  },
  methods: {
    addItem() {
      console.log(this.prop)
      this.$store.dispatch('popup/show', {
        form: {
          fields: [
            {
              component: 'v-jd-modal-content',
              fieldOptions: { props: { title: '编辑属性' } },
              children: [
                {
                  component: 'button',
                  text: '确定',
                  fieldOptions: {
                    slot: 'footer',
                    class: 'btn btn-primary',
                    on: {
                      click: () => {
                        this.$store.dispatch('popup/close')
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
                    on: { click: () => this.$store.dispatch('popup/close') }
                  }
                }
              ]
            }
          ]
        }
      })
    },
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
