<template>
  <span
    :class="[
      'design-tag',
      'title-tag',
      form.editing === field.uuid ? 'editing' : ''
    ]"
  >
    <SvgIcon :name="icon"></SvgIcon>
    <span>{{ text }}</span>
  </span>
</template>

<script>
import SvgIcon from 'vue-svgicon'
import { mapGetters } from 'vuex'

export default {
  name: 'v-jd-title-tag',
  props: {
    field: Object
  },
  components: { SvgIcon },
  computed: {
    ...mapGetters(['profile', 'form']),
    icon() {
      return (
        (this.profile.components[this.field.component] || {}).icon || 'square'
      )
    },
    text() {
      return this.field.remark
        ? this.field.component + '.' + this.field.remark
        : this.field.component
    }
  }
}
</script>

<style lang="scss" scoped>
.title-tag {
  left: 0;
}
</style>
