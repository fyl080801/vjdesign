<template>
  <div class="border-wrapper">
    <div class="left"></div>
    <div class="top"></div>
    <div class="right"></div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  name: 'v-jd-design-border'
}
</script>

<style lang="scss">
$design-border: 1px dashed #dcdfe6;

.v-jdesign {
  .design {
    .inner {
      .v-jd-design-wrapper {
        padding-top: calc(1.45rem + 1px);
        position: relative;

        > .v-jd-design-face {
          position: absolute;
          left: 0;
          right: 0;
          top: calc(1.45rem + 1px);
          bottom: 0;
          z-index: 1;
        }

        .tag {
          position: absolute;
          top: 0;
          left: 0;
          border: $design-border;
          background-color: rgba(0, 0, 0, 0.03);
          padding: 0 0.5rem;
          line-height: 1.45rem;
          color: #303133;

          .svg-icon {
            margin-right: 0.25rem;
          }
        }

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
        }

        &.editing {
          > .tag {
            border-color: #007bff;
            color: #007bff;
          }

          > .border-wrapper {
            > * {
              border-color: #007bff;
            }
          }
        }
      }
    }
  }
}
</style>
