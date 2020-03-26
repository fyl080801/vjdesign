<template>
  <div>
    <el-form-item label="参数">
      <el-row :gutter="5">
        <el-col :span="6">
          <el-input></el-input>
        </el-col>
        <el-col :span="6">
          <el-input>
            <el-button slot="append" @click="setTransform">绑定</el-button>
          </el-input>
        </el-col>
      </el-row>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "v-jdesign-func",
  methods: {
    setTransform() {}
  }
};
</script>

<style></style>
