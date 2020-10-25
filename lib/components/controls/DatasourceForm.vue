<template>
  <form>
    <div class="form-group">
      <label>名称</label>
      <input class="form-control" v-model="value.name" />
    </div>
    <div class="form-group">
      <label>类型</label>
      <select class="form-control" v-model="value.type"></select>
    </div>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'v-jd-datasource-form',
  props: {
    value: Object
  }
}
</script>
