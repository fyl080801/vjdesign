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

export default {
  components: { SvgIcon },
  name: 'v-jd-array-form',
  props: { value: Array, prop: Object },
  data() {
    return {
      fields: [],
      datasource: {},
      listeners: []
    }
  },
  methods: {
    addItem() {
      alert('还没做...')
    },
    removeItem() {}
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
