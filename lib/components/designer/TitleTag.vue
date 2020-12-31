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
    field: Object
  },
  components: { SvgIcon },
  computed: {
    ...mapGetters(['profile', 'form']),
    design() {
      return this.field._design || {}
    },
    componentLabel() {
      return (
        (this.profile.components[this.design.name] || {}).label ||
        this.design.name
      )
    },
    icon() {
      return (this.profile.components[this.design.name] || {}).icon || 'square'
    },
    text() {
      let result =
        this.componentLabel + (this.field.remark ? '.' + this.field.remark : '')

      if (this.field.fieldOptions && this.field.fieldOptions.slotName) {
        result += ` #${this.field.fieldOptions.slotName}`
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
