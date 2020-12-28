<template>
  <div class="v-jd-design-face"></div>
</template>

<script>
export default {
  name: 'v-jd-design-face'
}
</script>

<style lang="scss">
.v-jdesign {
  .design {
    .inner {
      .v-jd-design-face {
        position: absolute;
        left: 0;
        right: 0;
        top: calc(1.45rem + 1px);
        bottom: 0;
        z-index: 1;
      }
    }
  }
}
</style>
