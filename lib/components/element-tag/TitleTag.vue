<template>
  <span class="tag">
    <SvgIcon :name="titleIcon"></SvgIcon>
    <span>{{ text }}</span>
  </span>
</template>

<script>
import { isEmpty } from 'lodash-es'
import SvgIcon from 'vue-svgicon'

export default {
  name: 'v-jd-title-tag',
  props: { icon: String, text: String },
  components: { SvgIcon },
  computed: {
    titleIcon() {
      return isEmpty(this.icon) ? 'square' : this.icon
    }
  }
}
</script>
