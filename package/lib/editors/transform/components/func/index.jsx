import Vue from "vue";
import { isEmpty } from "lodash-es";
import { FormItem, Input } from "element-ui";

export default Vue.extend({
  props: {
    value: Object
  },
  data() {
    return {
      newArg: {}, // 新增的arg
      current: "",
      updating: false
    };
  },
  computed: {
    args() {
      return Object.keys(this.value.$arguments || {}).map(key => ({
        name: key,
        value: (this.value.$arguments || {})[key]
      }));
    }
  },
  methods: {
    onAddArg(name) {
      if (isEmpty(name)) {
        // this.$message("名称不能为空");
        return;
      }

      if (this.value.$arguments && this.value.$arguments[name] !== undefined) {
        // this.$message("键值重复");
        return;
      }
      this.value.$arguments = this.value.$arguments || {};
      this.value.$arguments[name] = "";
      this.newArg = {};
    },
    onDropArg(key) {
      this.value.$arguments = this.value.$arguments || {};
      delete this.value.$arguments[key];
      this.current = "";
    }
  },
  created() {
    this.value.$arguments = this.value.$arguments || {};
  },
  render() {
    return (
      <div>
        <FormItem
          label="表达式"
          prop="$result"
          rules={[{ required: true, message: "必填项" }]}
        >
          <Input v-model={this.value.$result} placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="默认值" prop="$default">
          <Input v-model={this.value.$default} placeholder="请输入"></Input>
        </FormItem>
      </div>
    );
  }
});
