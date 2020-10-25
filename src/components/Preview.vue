<template>
  <el-dialog
    title="预览"
    :visible="visible"
    @close="close"
    :close-on-click-modal="false"
    width="1024px"
  >
    <v-jform
      v-model="model"
      :fields="json.fields"
      :listeners="json.listeners"
      :datasource="json.datasource"
    ></v-jform>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      model: {},
      json: {}
    }
  },
  methods: {
    show(json) {
      this.json = json
      this.visible = true
    },
    close() {
      this.json = {}
      this.visible = false
    }
  }
}
</script>
