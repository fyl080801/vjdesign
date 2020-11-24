<template>
  <div :class="{ 'form-group': true, transform: isTransform }">
    <label>{{ label }}</label>
    <div class="propterty-type">
      <a href="javascript:;" @click="onChangeType">
        <span
          class="badge badge-pill"
          :class="!isTransform ? 'badge-primary' : ''"
          >值</span
        >
      </a>
      <a href="javascript:;" @click="onChangeType">
        <span
          class="badge badge-pill"
          :class="isTransform ? 'badge-primary' : ''"
          >转换</span
        >
      </a>
    </div>
    <div class="property-tail">
      <a href="javascript:;" v-if="hasValue" @click="onClear">清空</a>
    </div>
    <slot v-if="!isTransform"></slot>

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
    },
    isTransform() {
      return (
        typeof this.value === 'object' &&
        this.value !== null &&
        this.value.$type === 'design'
      )
    }
  },
  methods: {
    onClear() {
      this.$emit('clear', this.prop)
    },
    onChangeType() {
      this.$emit('changeType', !this.isTransform)
    }
  }
}
</script>

<style lang="scss" scoped>
.property-tail {
  float: right;
}

.transform {
}

.form-group {
  .propterty-type {
    display: inline-block;
    margin-left: 1rem;
  }
}
</style>
