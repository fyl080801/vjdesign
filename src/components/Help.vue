<template>
  <el-dialog
    title="Vue Json Design 使用指难"
    :visible="visible"
    @close="close"
    :close-on-click-modal="false"
    width="1024px"
  >
    <div v-html="content" class="markdown"></div>
  </el-dialog>
</template>

<script>
import help from '../docs/help.md'

export default {
  data() {
    return {
      visible: false,
      content: help
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    close() {
      this.visible = false
    }
  }
}
</script>
