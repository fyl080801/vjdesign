import Vue from "vue";
import Panel from "./Panel";

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
        <Panel value={this.value}></Panel>
      </el-form>
    );
  }
});
