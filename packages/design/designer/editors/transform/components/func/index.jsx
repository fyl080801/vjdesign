import Vue from "vue";
import FuncArg from "./FuncArg";
import { isEmpty } from "lodash-es";
import { uuid } from "../../../../../utils/helpers";

export default Vue.extend({
  props: {
    value: Object
  },
  components: { FuncArg },
  data() {
    return {
      newArg: {}, // 新增的arg
      current: ""
    };
  },
  methods: {
    onAddArg(data) {
      if (isEmpty(data.name)) {
        this.$message("名称不能为空");
        return;
      }

      if (
        this.value.$arguments &&
        this.value.$arguments[data.name] !== undefined
      ) {
        this.$message("键值重复");
        return;
      }
      this.value.$arguments = this.value.$arguments || {};
      this.value.$arguments[data.name] = data.value;
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
        <el-form-item label="参数" prop="$arguments">
          {Object.keys(this.value.$arguments || {}).map(key => (
            <func-arg
              key={uuid()}
              value={{ name: key, value: this.value.$arguments[key] }}
              onInput={value => {
                this.value.$arguments[key] = value.value;
              }}
              onDrop={() => {
                this.onDropArg(key);
              }}
            ></func-arg>
          ))}
          <func-arg
            value={this.newArg}
            isAdd={true}
            onAdd={this.onAddArg}
          ></func-arg>
        </el-form-item>
        <el-form-item
          label="表达式"
          prop="$result"
          rules={[{ required: true, message: "必填项" }]}
        >
          <el-input v-model={this.value.$result}></el-input>
        </el-form-item>
        <el-form-item label="默认值" prop="$default">
          <el-input v-model={this.value.$default}></el-input>
        </el-form-item>
      </div>
    );
  }
});
