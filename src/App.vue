<template>
  <el-container direction="vertical" class="demo">
    <el-header class="header">
      <div style="float: left">
        <el-button
          size="small"
          icon="el-icon-question"
          type="primary"
          @click="showHelp"
        >
          帮助
        </el-button>
      </div>
      <el-button size="small" icon="el-icon-view" @click="showPreview">
        预览
      </el-button>
      <el-button size="small" icon="el-icon-upload2">导出</el-button>
    </el-header>
    <el-main class="design">
      <v-jdesign v-model="value" :profile="profile"></v-jdesign>
    </el-main>
    <Preview ref="preview"></Preview>
    <Help ref="help"></Help>
  </el-container>
</template>

<script>
import Preview from './components/Preview'
import Help from './components/Help'

export default {
  components: { Preview, Help },
  data() {
    return {
      value: {},
      profile: {}
    }
  },
  methods: {
    showPreview() {
      this.$refs.preview.show(this.value)
    },
    showHelp() {
      this.$refs.help.show()
    }
  },
  mounted() {
    fetch('data/demo-profile.json', { method: 'GET' }).then(response => {
      response.json().then(data => {
        this.profile = data
      })
    })

    fetch('data/default.json', { method: 'GET' }).then(response => {
      response.json().then(data => {
        this.value = data
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
