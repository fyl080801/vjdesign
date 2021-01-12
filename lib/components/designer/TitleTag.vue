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
import SvgIcon from '../../icons'
import { mapGetters } from 'vuex'

export default {
  name: 'v-jd-title-tag',
  props: {
    field: Object,
    design: Object
  },
  components: { SvgIcon },
  computed: {
    ...mapGetters(['profile', 'form']),
    componentLabel() {
      return (
        (
          this.profile.components[this.design.name || this.field.component] ||
          {}
        ).label || ''
      )
    },
    icon() {
      return (
        (
          this.profile.components[this.design.name || this.field.component] ||
          {}
        ).icon || 'square'
      )
    },
    text() {
      let result =
        this.componentLabel + (this.field.remark ? '.' + this.field.remark : '')

      if (this.field.fieldOptions.ref) {
        result += ` #${this.field.fieldOptions.ref}`
      }

      if (this.field.fieldOptions && this.field.fieldOptions.slotName) {
        result += ` %${this.field.fieldOptions.slotName}`
      }

      if (this.field.fieldOptions && this.field.fieldOptions.scopedSlot) {
        result += ` $${this.field.fieldOptions.scopedSlot}`
      }

      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.title-tag {
  left: 0;
}
</style>
