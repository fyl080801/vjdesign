<template>
  <div class="accordion">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'v-jd-collapse',
  props: {
    value: { type: Array, default: () => [] }
  },
  methods: {
    onItemToggle(name) {
      const index = this.value.indexOf(name)
      if (index < 0) {
        this.value.push(name)
      } else {
        this.value.splice(index, 1)
      }
    }
  },
  created() {
    this.$on('toggle-item', this.onToggleItem)
  },
  beforeDestroy() {
    this.$off('toggle-item', this.onToggleItem)
  }
}
</script>

<style lang="scss">
.v-jdesign {
  .side {
    overflow: auto;

    .accordion {
      > .card {
        border-radius: 0;
        border-left: none;
        border-right: none;

        &:first-of-type {
          border-top: none;
        }
      }
    }
  }
}
</style>
