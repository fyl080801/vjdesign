import Vue from "vue";
import FuncArg from "./FuncArg";
import { isEmpty } from "lodash-es";
import { uuid } from "../../../../../utils/helpers";
// import emiter from "../../mixins/emiter";

export default Vue.extend({
  props: {
    value: Object
  },
  components: { FuncArg },
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
        this.$message("名称不能为空");
        return;
      }

      if (this.value.$arguments && this.value.$arguments[name] !== undefined) {
        this.$message("键值重复");
        return;
      }
      this.value.$arguments = this.value.$arguments || {};
      this.value.$arguments[name] = "";
      this.newArg = {};

      // this.updating = true;
      // this.$nextTick(() => {
      //   this.updating = false;
      // });
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
        {!this.updating ? (
          <el-form-item label="参数" prop="$arguments">
            {this.args.map(item => (
              <func-arg
                key={uuid()}
                value={item}
                onInput={value => {
                  this.value.$arguments[item.name] = value.value;
                }}
                onDrop={() => {
                  this.onDropArg(item.name);
                }}
                onSetTransform={transformValue => {
                  this.current = item.name;
                  this.$emit("setTransform", {
                    key: item.name,
                    value: transformValue
                  });
                }}
              ></func-arg>
            ))}
            <func-arg
              value={this.newArg}
              isAdd={true}
              onAdd={this.onAddArg}
              onSetTransform={transformValue => {
                this.current = "";
                this.$emit("setTransform", {
                  key: "",
                  value: transformValue
                });
              }}
            ></func-arg>
          </el-form-item>
        ) : null}
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
