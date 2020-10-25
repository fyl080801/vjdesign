<template>
  <div class="btn-group wrapper">
    <button :class="['btn', value ? 'btn-primary' : 'btn-outline-secondary']">
      否
    </button>
    <div class="face" @click="onToggle"></div>
    <button :class="['btn', value ? 'btn-outline-primary' : 'btn-secondary']">
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

.wrapper {
  button {
    color: transparent;
  }
}
</style>
