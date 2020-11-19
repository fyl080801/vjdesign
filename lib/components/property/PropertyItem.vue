<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <div class="property-tail">
      <a href="javascript:;" v-if="hasValue" @click="onClear">清空</a>
    </div>
    <slot></slot>
    <small class="form-text text-muted">
      <slot name="description"></slot>
    </small>
  </div>
</template>

<script>
// import { toPath } from 'lodash-es'

export default {
  name: 'v-jd-property-item',
  props: {
    label: String,
    // editing: Object,
    prop: String,
    value: null
  },
  computed: {
    hasValue() {
      return this.value !== undefined
    }
  },
  methods: {
    onClear() {
      this.$emit('clear', this.prop)
      // const paths = toPath(this.prop)
      // debugger
      // let cache = null
      // for (let i = 0; i < paths.length; i++) {
      //   cache = this.editing[paths[i]]
      //   if (i + 1 === paths.length - 1) {
      //     delete cache[paths[i + 1]]
      //     break
      //   }
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.property-tail {
  float: right;
}
</style>
