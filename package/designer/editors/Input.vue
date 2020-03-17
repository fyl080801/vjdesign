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
    <v-jdesign-transform
      ref="trans"
      :value="transformValue"
      @input="changeTransform"
    ></v-jdesign-transform>
  </div>
</template>

<script>
import { isEmpty } from "lodash-es";
import Transform from "./Transform.vue";

export default {
  name: "v-jdesign-input",
  components: { [Transform.name]: Transform },
  props: {
    value: [Object, String]
  },
  data() {
    return { fieldValue: null, transformValue: null };
  },
  computed: {
    isTransform() {
      return (
        this.value !== null &&
        typeof this.value === "object" &&
        !isEmpty(this.value.$type)
      );
    }
  },
  methods: {
    changed(value) {
      this.fieldValue = value;
      this.$emit("input", value);
    },
    setTransform() {
      this.$refs.trans.open();
    },
    changeTransform(value) {
      this.$emit("input", value);
    },
    clearTransform() {
      this.$emit("input", this.fieldValue);
    }
  },
  mounted() {
    if (this.isTransform) {
      this.fieldValue = this.value;
    } else {
      this.transformValue = this.value;
    }
  }
};
</script>
