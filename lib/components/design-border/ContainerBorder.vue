<template>
  <div class="border-wrapper">
    <div class="left"></div>
    <div class="top"></div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: 'v-jd-container-border'
}
</script>

<style lang="scss">
$container-border: 1px dashed #e4e7ed;

.v-jdesign {
  .design {
    .inner {
      .v-jd-container-wrapper {
        position: relative;
        padding: 1.5rem;
        padding-bottom: 0;

        > .border-wrapper {
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
        }

        &.editing {
          > .border-wrapper {
            > * {
              border-color: #409eff;
            }
          }

          > .root-text {
            color: #409eff;
          }
        }
      }
    }
  }
}
</style>
