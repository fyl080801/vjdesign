import Vue from "vue";
import { TransformTypes } from "../../../utils/enums";

export default Vue.extend({
  props: {
    value: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    clearValidate() {
      this.$refs.form.clearValidate();
    }
  },
  render() {
    return (
      <el-form ref="form" label-position="top" props={{ model: this.value }}>
        <el-form-item
          label="类型"
          prop="$type"
          rules={[{ required: true, message: "必选项" }]}
        >
          <el-select v-model={this.value.$type}>
            {Object.keys(TransformTypes).map(key => (
              <el-option value={key} label={TransformTypes[key]} />
            ))}
          </el-select>
        </el-form-item>
      </el-form>
    );
  }
});
