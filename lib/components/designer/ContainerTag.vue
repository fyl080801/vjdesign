<template>
  <p :class="['container-tag', form.editing === field.uuid ? 'editing' : '']">
    {{ field.remark ? `${componentTag}.${field.remark}` : componentTag }}
  </p>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'v-jd-container-tag',
  props: { field: Object },
  computed: {
    ...mapGetters(['form', 'profile']),
    componentTag() {
      return (this.profile.components[this.field.component] || {}).label || ''
    }
  }
}
</script>

<style lang="scss">
.v-jdesign {
  .design {
    .inner {
      .container-tag {
        text-align: center;
        color: #c0c4cc;
        padding: 0.75rem 1.25rem;
        margin: 0;
        clear: both;

        &.editing {
          color: #007bff;
        }
      }
    }
  }
}
</style>
