<template>
  <div class="card">
    <div class="card-header">
      <a href="javascript:;" @click="onTitleClick">
        <slot name="header">
          <SvgIcon class="card-icon" :name="icon"></SvgIcon>
          <span>{{ title }}</span>
        </slot>
      </a>
    </div>
    <div :class="{ collapse: true, show: parent.value.includes(name) }">
      <div class="card-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from 'vue-svgicon'
export default {
  props: {
    title: String,
    icon: { type: String, default: 'code' },
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
