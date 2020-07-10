import Vue from "vue";
import { TransformTypes } from "../../../../../utils/enums";
import Bind from "../bind";
import Func from "../func";
import { Input, Form, FormItem, Select, Option } from "element-ui";

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
      <Form
        ref="form"
        size="small"
        label-position="top"
        class="v-jdesign-transform-panel"
        props={{ model: this.value }}
      >
        {!this.value.isRoot ? (
          <FormItem
            label="名称"
            prop="name"
            rules={[{ required: true, message: "必选项" }]}
          >
            <Input v-model={this.value.name} placeholder="请输入"></Input>
          </FormItem>
        ) : null}
        <FormItem
          label="类型"
          prop="$type"
          rules={[{ required: true, message: "必选项" }]}
        >
          <Select v-model={this.value.$type}>
            {!this.value.isRoot ? <Option value="raw" label="固定值" /> : null}
            {Object.keys(TransformTypes).map(key => (
              <Option value={key} label={TransformTypes[key]} />
            ))}
          </Select>
        </FormItem>
        {!this.value.isRoot && this.value.$type === "raw" ? (
          <FormItem label="值" prop="raw">
            <Input v-model={this.value.raw} placeholder="请输入"></Input>
          </FormItem>
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
      </Form>
    );
  }
});
