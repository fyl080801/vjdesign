<template>
  <div>
    <el-input :placeholder="modelName" :readonly="true">
      <el-button
        slot="append"
        icon="el-icon-edit"
        @click="setOptions"
      ></el-button>
      <el-button
        v-if="optionValue.model"
        slot="append"
        icon="el-icon-close"
        @click="clearOptions"
      ></el-button>
    </el-input>
    <el-dialog
      :visible.sync="showDialog"
      title="编辑"
      :show-close="false"
      width="350px"
    >
      <el-form :model="optionValue" size="small">
        <el-form-item label="数据" prop="model">
          <el-input v-model="optionValue.model"></el-input>
        </el-form-item>
        <el-form-item label="规则" prop="schema">
          <el-input
            v-model="optionValue.schema"
            type="textarea"
            rows="4"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">
          确定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "v-jdesign-display",
  props: {
    value: Object
  },
  data() {
    return {
      optionValue: this.value
        ? { model: this.value.model, schema: JSON.stringify(this.value.schema) }
        : {},
      showDialog: false
    };
  },
  computed: {
    modelName() {
      if (!this.optionValue) {
        return "";
      }
      return this.optionValue.model || "";
    }
  },
  methods: {
    setOptions() {
      this.showDialog = true;
    },
    clearOptions() {
      this.optionValue = {};
      this.$emit("input", undefined);
    },
    submit() {
      this.$emit("input", {
        model: this.optionValue.model,
        schema: new Function(`return ${this.optionValue.schema};`)()
      });
      this.showDialog = false;
    },
    cancel() {
      this.optionValue = {};
      this.showDialog = false;
    }
  }
};
</script>

<style></style>
