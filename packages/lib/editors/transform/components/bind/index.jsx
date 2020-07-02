import Vue from "vue";

export default Vue.extend({
  props: {
    value: Object
  },
  render() {
    return (
      <div>
        <el-form-item
          label="来源"
          prop="$source"
          rules={[{ required: true, message: "必填项" }]}
        >
          <el-input
            v-model={this.value.$source}
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="默认值" prop="$default">
          <el-input
            v-model={this.value.$default}
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </div>
    );
  }
});
