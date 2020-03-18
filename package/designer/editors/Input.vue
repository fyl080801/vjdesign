<template>
  <div>
    <el-input
      v-if="!isTransform"
      v-model="fieldValue"
      placeholder="请输入"
      @change="changed"
    >
      <el-button
        slot="append"
        icon="el-icon-link"
        @click="setTransform"
      ></el-button>
    </el-input>
    <el-input v-if="isTransform" placeholder="<转换的值>" :readonly="true">
      <el-button
        slot="append"
        icon="el-icon-edit"
        @click="setTransform"
      ></el-button>
      <el-button
        slot="append"
        icon="el-icon-close"
        @click="clearTransform"
      ></el-button>
    </el-input>
  </div>
</template>

<script>
import transform from "./transform";

export default {
  name: "v-jdesign-input",
  mixins: [transform]
};
</script>
