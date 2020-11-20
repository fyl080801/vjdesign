<template>
  <el-container direction="vertical" class="demo">
    <el-header class="header">
      <div style="float: left">
        <el-menu
          mode="horizontal"
          :default-active="active"
          @select="handleSelect"
        >
          <el-menu-item index="default">Element 示例</el-menu-item>
          <el-menu-item index="antd">Ant Design</el-menu-item>
        </el-menu>
      </div>

      <el-button
        size="small"
        icon="el-icon-question"
        type="primary"
        @click="showHelp"
      >
        帮助
      </el-button>
      <el-button size="small" icon="el-icon-view" @click="showPreview">
        预览
      </el-button>
      <el-button size="small" icon="el-icon-upload2">导出</el-button>
    </el-header>
    <el-main class="design">
      <router-view></router-view>
    </el-main>
    <Preview ref="preview"></Preview>
    <Help ref="help"></Help>
  </el-container>
</template>

<script>
import Preview from './components/Preview'
import Help from './components/Help'
import { mapGetters } from 'vuex'

export default {
  components: { Preview, Help },
  computed: {
    ...mapGetters(['demo']),
    active() {
      return this.$route.name
    }
  },
  methods: {
    handleSelect(key) {
      this.$router.replace({ name: key })
    },
    showPreview() {
      this.$refs.preview.show(this.demo.value)
    },
    showHelp() {
      this.$refs.help.show()
    }
  }
}
</script>

<style lang="scss">
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

  > .header {
    border-bottom: 1px solid #dcdfe6;
    line-height: 60px;
    text-align: right;
  }

  > .design {
    padding: 0;
  }

  .el-menu--horizontal {
    > .el-menu-item {
      height: 59px;
      line-height: 59px;
    }
  }
}
</style>
