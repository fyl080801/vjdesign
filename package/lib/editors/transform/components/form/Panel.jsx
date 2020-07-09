import Vue from "vue";
import { TransformTypes } from "../../../../../utils/enums";
import Bind from "../bind";
import Func from "../func";

export default Vue.extend({
  props: {
    value: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      cache: {
        bind: {},
        func: {},
        on: {}
      },
      propKeys: {
        bind: ["$source", "$default"],
        func: ["$arguments", "$result", "$default"],
        on: ["$arguments", "$result", "$default"]
      }
    };
  },
  watch: {
    "value.$type": {
      handler(newVal, oldVal) {
        if (oldVal && this.propKeys[oldVal]) {
          this.propKeys[oldVal].forEach(key => {
            this.cache[oldVal][key] = this.value[key];
            delete this.value[key];
          });
        }

        if (newVal && this.propKeys[newVal]) {
          this.propKeys[newVal].forEach(key => {
            if (this.cache[newVal][key] !== undefined) {
              this.value[key] = this.cache[newVal][key];
            }
          });
        }
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
      <el-form
        ref="form"
        size="small"
        label-position="top"
        class="v-jdesign-transform-panel"
        props={{ model: this.value }}
      >
        {!this.value.isRoot ? (
          <el-form-item
            label="名称"
            prop="name"
            rules={[{ required: true, message: "必选项" }]}
          >
            <el-input v-model={this.value.name} placeholder="请输入"></el-input>
          </el-form-item>
        ) : null}
        <el-form-item
          label="类型"
          prop="$type"
          rules={[{ required: true, message: "必选项" }]}
        >
          <el-select v-model={this.value.$type}>
            {!this.value.isRoot ? (
              <el-option value="raw" label="固定值" />
            ) : null}
            {Object.keys(TransformTypes).map(key => (
              <el-option value={key} label={TransformTypes[key]} />
            ))}
          </el-select>
        </el-form-item>
        {!this.value.isRoot && this.value.$type === "raw" ? (
          <el-form-item label="值" prop="raw">
            <el-input v-model={this.value.raw} placeholder="请输入"></el-input>
          </el-form-item>
        ) : null}
        {this.value.$type === "bind" ? <Bind value={this.value}></Bind> : null}
        {this.value.$type === "func" || this.value.$type === "on" ? (
          <Func
            value={this.value}
            onSetTransform={payload => {
              this.$emit("setTransform", payload);
            }}
          ></Func>
        ) : null}
      </el-form>
    );
  }
});
