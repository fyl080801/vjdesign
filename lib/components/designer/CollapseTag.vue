<template>
  <span
    :class="[
      'design-tag',
      'collapse-tag',
      form.editing === field.uuid ? 'editing' : ''
    ]"
    @click="onToggle"
  >
    <SvgIcon
      class="collapse-tag-icon"
      :name="(field.options || {}).collapse ? 'plus-square' : 'minus-square'"
    ></SvgIcon>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import SvgIcon from '../../icons'

export default {
  name: 'v-jd-collapse-tag',
  components: { SvgIcon },
  props: { field: Object },
  computed: { ...mapGetters(['form']) },
  methods: {
    onToggle(evt) {
      this.$store.dispatch('form/toggleCollapse', this.field.uuid)
      evt.stopPropagation()
    }
  }
}
</script>

<style lang="scss" scoped>
.collapse-tag {
  border-right: none !important;

  > .collapse-tag-icon {
    margin-right: 0 !important;
  }
}
</style>
