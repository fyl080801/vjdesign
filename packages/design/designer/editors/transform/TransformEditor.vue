<template>
  <el-form ref="form" label-position="top" :model="value">
    <el-form-item
      label="类型"
      prop="$type"
      :rules="[{ required: true, message: '必选项' }]"
    >
      <el-select v-model="value.$type">
        <el-option value="bind" label="绑定"></el-option>
        <el-option value="func" label="计算"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import { TransformTypes } from "../../../utils/enums";
// import Func from "./Func.vue";

export default {
  name: "v-jdesign-transform",
  props: {
    value: {
      type: Object,
      default() {
        return {};
      }
    }
  },
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
    onClose() {
      this.$emit("cancel");
    },
    typeChanged(value) {
      console.log(value);
    },
    sourceChanged(value) {
      this.transformValue = {
        $type: TransformTypes.bind,
        $source: value
      };
    },
    validate() {
      return this.$refs.form.validate();
    }
  }
};
</script>

<style></style>
