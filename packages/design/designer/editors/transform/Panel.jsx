import Vue from "vue";
import { TransformTypes } from "../../../utils/enums";
import Bind from "./types/Bind";
import Func from "./types/Func";

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
      }
    };
  },
  watch: {
    "value.$type": {
      handler(newVal, oldVal) {
        if (oldVal) {
          //
        }
        console.log(newVal, oldVal);
      }
    }
  },
  render() {
    return (
      <div>
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
          <Func value={this.value}></Func>
        ) : null}
      </div>
    );
  }
});
