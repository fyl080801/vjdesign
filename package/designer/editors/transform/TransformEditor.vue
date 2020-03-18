<template>
  <el-form label-position="top" size="mini">
    <el-form-item label="转换类型">
      <el-radio-group v-model="transformType" @change="typeChanged">
        <el-radio-button
          v-for="(key, index) in Object.keys(transformTypes)"
          :key="index"
          :label="transformTypes[key]"
          >{{ key }}</el-radio-button
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item label="来源" v-if="transformType === transformTypes.绑定">
      <el-row>
        <el-col :span="20">
          <el-cascader
            v-model="source"
            :options="sourceData"
            @change="sourceChanged"
            style="width:100%"
          >
          </el-cascader>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </el-form-item>
    <v-jdesign-func
      v-if="transformType === transformTypes.计算属性"
    ></v-jdesign-func>
  </el-form>
</template>

<script>
import { TransformTypes } from "../../../utils/enums";
import Func from "./Func.vue";

export default {
  name: "v-jdesign-transform",
  props: { value: Object },
  components: { [Func.name]: Func },
  data() {
    return {
      transformValue: this.value,
      transformTypes: TransformTypes,
      transformType: TransformTypes.绑定,
      source: [],
      arguments: {}
    };
  },
  computed: {
    sourceData() {
      return [];
    }
  },
  methods: {
    typeChanged(value) {
      console.log(value);
    },
    sourceChanged(value) {
      this.transformValue = {
        $type: TransformTypes.bind,
        $source: value
      };
    }
  }
};
</script>

<style></style>
