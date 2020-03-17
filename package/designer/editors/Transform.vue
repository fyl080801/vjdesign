<template>
  <el-dialog :visible.sync="show" title="编辑转换"></el-dialog>
</template>

<script>
export default {
  name: "v-jdesign-transform",
  props: { value: Object },
  data() {
    return {
      show: false
    };
  },
  methods: {
    open() {
      this.show = true;
    }
  }
};
</script>

<style></style>
