<template>
  <div
    :class="[
      'container-border-wrapper',
      form.editing === field.uuid ? 'editing' : ''
    ]"
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
  name: 'v-jd-container-border',
  props: { field: Object },
  computed: {
    ...mapGetters(['form'])
  }
}
</script>

<style lang="scss">
$container-border: 1px dashed #e4e7ed;

.v-jdesign {
  .design {
    .inner {
      .container-border-wrapper {
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
          border-left: $container-border;
          top: 0;
          bottom: 0;
          left: 0;
        }

        .top {
          border-top: $container-border;
          top: 0;
          left: 0;
          right: 0;
        }

        .right {
          border-right: $container-border;
          top: 0;
          bottom: 0;
          right: 0;
        }

        .bottom {
          border-bottom: $container-border;
          bottom: 0;
          right: 0;
          left: 0;
        }

        &.editing {
          > * {
            border-color: #409eff;
          }
        }
      }
    }
  }
}
</style>
