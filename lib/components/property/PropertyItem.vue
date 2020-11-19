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
export default {
  name: 'v-jd-property-item',
  props: {
    label: String,
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
    }
  }
}
</script>

<style lang="scss" scoped>
.property-tail {
  float: right;
}
</style>
