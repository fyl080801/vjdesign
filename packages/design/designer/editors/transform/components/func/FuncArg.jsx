import Vue from "vue";
import "./FuncArg.scss";
import FuncInput from "./editors/Input";

export default Vue.extend({
  props: {
    value: Object,
    isAdd: { type: Boolean, default: false }
  },
  components: { FuncInput },
  methods: {
    onAdd() {
      this.$emit("add", this.value.name);
    },
    onDrop() {
      this.$emit("drop");
    }
  },
  render() {
    return (
      <div class={["v-jdesign-func", this.isAdd ? "add" : ""]}>
        <div class="action">
          {this.isAdd ? (
            <el-button icon="el-icon-plus" onClick={this.onAdd}></el-button>
          ) : (
            <el-button icon="el-icon-delete" onClick={this.onDrop}></el-button>
          )}
        </div>

        <el-row gutter={5} class="item">
          <el-col span={!this.isAdd ? 8 : 24}>
            {this.isAdd ? (
              <el-input
                v-model={this.value.name}
                placeholder="输入键名"
              ></el-input>
            ) : (
              <span>{this.value.name}</span>
            )}
          </el-col>
          {!this.isAdd ? (
            <el-col span={16}>
              <func-input
                sync={true}
                v-model={this.value.value}
                onInput={() => {
                  this.$emit("input", this.value);
                }}
                onSetTransform={transformValue => {
                  this.value.value = transformValue;
                  this.$emit("input", this.value);
                  this.$emit("setTransform", transformValue);
                }}
              ></func-input>
            </el-col>
          ) : null}
        </el-row>
      </div>
    );
  }
});
