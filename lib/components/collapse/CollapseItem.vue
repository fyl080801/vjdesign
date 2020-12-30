<template>
  <div class="card">
    <a @click="onTitleClick" class="card-header">
      <slot name="header">
        <SvgIcon class="card-icon" :name="icon"></SvgIcon>
        <span>{{ title }}</span>
        <div class="card-tail">
          <SvgIcon name="angle-down" :class="{ expand }"></SvgIcon>
        </div>
      </slot>
    </a>
    <div :class="{ collapse: true, show: parent.value.includes(name) }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import SvgIcon from '../../icons'

export default {
  props: {
    title: String,
    icon: { type: String, default: 'list' },
    name: String
  },
  components: { SvgIcon },
  computed: {
    parent() {
      let cache = this.$parent
      while (!/v-jd-collapse/g.test(cache.$vnode.tag) && cache.$parent) {
        cache = cache.$parent
      }
      return cache
    },
    expand() {
      return this.parent ? this.parent.value.includes(this.name) : false
    }
  },
  methods: {
    onTitleClick() {
      this.parent.onItemToggle(this.name)
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
.v-jdesign {
  .card-icon {
    margin-right: 0.75em;
  }
}
</style>

<style lang="scss" scoped>
.card {
  .card-header {
    cursor: pointer;
    text-decoration: none;
    color: #303133;

    .card-tail {
      float: right;

      > .svg-icon {
        transform: rotate(90deg);

        &.expand {
          transform: rotate(0);
        }
      }
    }
  }
}
</style>
