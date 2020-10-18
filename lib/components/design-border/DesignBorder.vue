<template>
  <div class="border-wrapper">
    <div class="left"></div>
    <div class="top"></div>
    <div class="right"></div>
    <div class="bottom"></div>
    <p class="root-text">ssss</p>
  </div>
</template>

<script>
export default {
  name: 'v-jd-design-container'
}
</script>

<style lang="scss" scoped>
$border: 1px dashed #e4e7ed;

.border-wrapper {
  position: relative;

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
