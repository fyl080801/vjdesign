<template>
  <el-container direction="vertical" class="demo">
    <el-header class="header">
      <el-button size="small" @click="showPreview">预览</el-button>
      <el-button size="small">导出</el-button>
    </el-header>
    <el-main class="design">
      <v-jdesign v-model="value" :profile="profile"></v-jdesign>
    </el-main>
    <Preview ref="preview"></Preview>
  </el-container>
</template>

<script>
import Preview from './components/Preview'

export default {
  components: { Preview },
  data() {
    return {
      value: {
        // fields: [{ component: 'p', text: 'test' }]
      },
      profile: {
        // i18n: {}, // 考虑国际化
      }
    }
  },
  methods: {
    showPreview() {
      this.$refs.preview.show(this.value)
    }
  },
  mounted() {
    fetch('data/demo.json', { method: 'GET' }).then(response => {
      response.json().then(data => {
        this.profile = data
      })
    })
  }
}
</script>

<style>
html,
body {
  font-size: 14px;
}

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
