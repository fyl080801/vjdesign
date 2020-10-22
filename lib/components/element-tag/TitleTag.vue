<template>
  <span class="tag">
    <SvgIcon :name="titleIcon"></SvgIcon>
    <span>{{ text }}</span>
  </span>
</template>

<script>
import SvgIcon from 'vue-svgicon'
import { mapGetters } from 'vuex'

export default {
  name: 'v-jd-title-tag',
  props: { name: String, text: String },
  components: { SvgIcon },
  computed: {
    ...mapGetters(['profile']),
    titleIcon() {
      return (this.profile.components[this.name] || {}).icon || 'square'
    }
  }
}
</script>
