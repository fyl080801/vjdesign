<template>
  <div
    :class="['v-jd-switch btn-group v-jd-switch-wrapper', value ? 'on' : 'off']"
  >
    <button
      :class="['btn btn-sm', value ? 'btn-primary' : 'btn-outline-secondary']"
    >
      否
    </button>
    <div class="face" @click="onToggle"></div>
    <button
      :class="['btn btn-sm', value ? 'btn-outline-primary' : 'btn-secondary']"
    >
      是
    </button>
  </div>
</template>

<script>
export default {
  name: 'v-jd-switch',
  props: {
    value: Boolean
  },
  methods: {
    onToggle() {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.face {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.v-jd-switch {
  &.v-jd-switch-wrapper {
    button {
      color: transparent;
    }
  }
}
</style>
