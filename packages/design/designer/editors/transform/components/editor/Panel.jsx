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
        if (oldVal) {
          this.propKeys[oldVal].forEach(key => {
            this.cache[oldVal][key] = this.value[key];
            delete this.value[key];
          });
        }

        this.propKeys[newVal].forEach(key => {
          if (this.cache[newVal][key] !== undefined) {
            this.value[key] = this.cache[newVal][key];
          }
        });
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
        label-position="top"
        class="v-jdesign-transform-panel"
        props={{ model: this.value }}
      >
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
