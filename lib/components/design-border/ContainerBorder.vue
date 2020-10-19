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
  name: 'v-jd-container-border'
}
</script>

<style lang="scss">
.v-jdesign {
  .design {
    .inner {
      .v-jd-container-wrapper {
        position: relative;
        padding: 0.75rem 1.25rem;
        padding-bottom: 0;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$border: 1px dashed #e4e7ed;

.border-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  > * {
    border: none;
    position: absolute;
  }

  .left {
    border-left: $border;
    top: 0;
    bottom: 0;
    left: 0;
  }

  .top {
    border-top: $border;
    top: 0;
    left: 0;
    right: 0;
  }

  .right {
    border-right: $border;
    top: 0;
    bottom: 0;
    right: 0;
  }

  .bottom {
    border-bottom: $border;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
