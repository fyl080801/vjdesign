<template>
  <div v-if="!updating">
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
    <!-- <v-jdesign-transform
      ref="trans"
      :value="transformValue"
      @input="changeTransform"
    ></v-jdesign-transform> -->
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
    const isTransform = this.checkTransform();
    return {
      updating: false,
      fieldValue: isTransform ? null : this.value, // 普通值
      transformValue: isTransform ? this.value : null // 转换的值
    };
  },
  computed: {
    isTransform() {
      return this.checkTransform();
    }
  },
  methods: {
    changed(value) {
      this.fieldValue = value;
      this.$emit("input", value);
    },
    setTransform() {
      // this.$refs.trans.open();
    },
    changeTransform(value) {
      this.$emit("input", value);
    },
    clearTransform() {
      this.$emit("input", this.fieldValue);
    },
    checkTransform() {
      return (
        this.value !== null &&
        typeof this.value === "object" &&
        !isEmpty(this.value.$type)
      );
    }
  }
};
</script>
