<template>
  <div
    :class="{
      'design-border-wrapper': true,
      editing: form.editing === field.uuid
    }"
  >
    <div class="left"></div>
    <div class="top"></div>
    <div class="right"></div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'v-jd-design-border',
  props: { field: Object },
  computed: { ...mapGetters(['form']) }
}
</script>

<style lang="scss">
$design-border: 1px dashed #dcdfe6;

.v-jdesign {
  .design {
    .inner {
      .design-border-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;

        > * {
          border: none;
          position: absolute;
        }

        .left {
          border-left: $design-border;
          top: 0;
          bottom: 0;
          left: 0;
        }

        .top {
          border-top: $design-border;
          top: 0;
          left: 0;
          right: 0;
        }

        .right {
          border-right: $design-border;
          top: 0;
          bottom: 0;
          right: 0;
        }

        .bottom {
          border-bottom: $design-border;
          bottom: 0;
          left: 0;
          right: 0;
        }

        &.editing {
          > * {
            border-color: #007bff;
          }
        }
      }
    }
  }
}
</style>
