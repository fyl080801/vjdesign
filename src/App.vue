<template>
  <el-container direction="vertical" class="demo">
    <el-header class="header">
      <el-button>预览</el-button>
      <el-button>元数据</el-button>
      <el-button>导出</el-button>
    </el-header>
    <el-main class="design">
      <v-jdesign v-model="value"></v-jdesign>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      value: {
        fields: [{ component: 'p', text: 'test' }]
      }
    }
  }
}
</script>

<style>
.demo {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.demo > .header {
  border-bottom: 1px solid #dcdfe6;
  line-height: 60px;
  text-align: right;
}

.demo > .design {
  padding: 0;
}
</style>
