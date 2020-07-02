import Vue from "vue";
import { cloneDeep } from "lodash-es";

export default Vue.extend({
  props: {
    visible: Boolean,
    value: Object
  },
  data() {
    return {
      model: {}
    };
  },
  watch: {
    visible(value) {
      if (value === true) {
        this.model = cloneDeep(this.value);
      }
    }
  },
  methods: {
    onCancel() {
      this.$emit("cancel");
    },
    onSubmit() {
      this.$emit("submit", this.model);
    }
  },
  render() {
    return (
      <el-dialog visible={this.visible} title="数据源" onClose={this.onCancel}>
        <el-form props={{ model: this.model }}>
          <el-form-item prop="name" label="名称">
            <el-input v-model={this.model.name} placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item prop="type" label="类型">
            <el-select
              v-model={this.model.type}
              placeholder="请选择"
            ></el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button onClick={this.onCancel}>取消</el-button>
          <el-button type="primary" onClick={this.onSubmit}>
            确定
          </el-button>
        </span>
      </el-dialog>
    );
  }
});
