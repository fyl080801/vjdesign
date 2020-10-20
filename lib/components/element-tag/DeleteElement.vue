<template>
  <a class="delete"><SvgIcon name="trash-alt"></SvgIcon><span>删除</span></a>
</template>

<script>
import SvgIcon from 'vue-svgicon'

export default {
  name: 'v-jd-delete-element',
  components: { SvgIcon }
}
</script>

<style lang="scss" scoped>
.delete {
  position: absolute;
  top: 0;
  right: 0;
  color: #409eff;

  border: 1px dashed #409eff;
  background-color: rgba(0, 0, 0, 0.03);

  padding: 0.02rem 0.5rem;

  .svg-icon {
    margin-right: 0.25rem;
  }
}
</style>
