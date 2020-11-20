<template>
  <v-jdesign v-model="demo.value" :profile="demo.profile"></v-jdesign>
</template>

<script>
import demo from '../mixins/demo'

export default {
  mixins: [demo],
  mounted() {
    this.load('data/antd/profile.json', 'data/antd/value.json')
  }
}
</script>

<style lang="scss">
.ant-select-dropdown {
  z-index: 2050;
}
</style>
